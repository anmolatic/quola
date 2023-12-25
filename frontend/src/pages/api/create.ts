/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { prisma } from "@/prisma";
import { createSchema } from "@/types";

import type { NextApiRequest, NextApiResponse } from "next";

const parseDate = (date: string | undefined) => {
  try {
    if (!date) {
      return null;
    }

    const dateObj = new Date(date);

    return dateObj.toISOString();
  } catch (error) {
    console.error("Error Parsing Date");

    return null;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(404).json({ status: "error", message: "Not Found" });
  }

  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "error", message: "Method Not Allowed" });
  }

  const ocrData = createSchema.parse(req.body);

  const parsed = createSchema.safeParse(ocrData);

  if (!parsed.success) {
    const error = parsed.error;

    return res.status(400).json({ status: "error", message: error.message });
  }

  const { idNumber } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { identificationNumber: idNumber },
  });

  if (user) {
    return res
      .status(201)
      .json({ status: "error", message: "User already exists" });
  }

  if (!parsed.data.idNumber) {
    return res.status(400).json({ status: "error", message: "No ID Number" });
  }

  const newUser = await prisma.user.create({
    data: {
      identificationNumber: idNumber,
      name: parsed.data.name === "NA" ? null : parsed.data.name,
      lastName: parsed.data.lastName === "NA" ? null : parsed.data.lastName,
      dateOfBirth:
        parsed.data.dateOfBirth === "NA"
          ? null
          : parseDate(parsed.data.dateOfBirth),
      dateOfExpiry:
        parsed.data.dateOfExpiry === "NA"
          ? null
          : parseDate(parsed.data.dateOfExpiry),
      dateOfIssue:
        parsed.data.dateOfIssue === "NA"
          ? null
          : parseDate(parsed.data.dateOfIssue),
    },
  });

  if (!newUser) {
    return res
      .status(500)
      .json({ status: "error", message: "Unable to Create User" });
  }

  const {
    id,
    dateOfBirth,
    dateOfExpiry,
    dateOfIssue,
    lastName,
    name,
    identificationNumber: thaiIdNumber,
  } = newUser;

  const payload = {
    id,
    name,
    thaiIdNumber,
    dateOfBirth,
    dateOfExpiry,
    dateOfIssue,
    lastName,
  };

  return res.status(201).json({
    status: "ok",
    message: "User Created",
    data: payload,
  });
};

export default handler;
