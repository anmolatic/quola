import { prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

import { z } from "zod";

const schema = z.object({
  identificationNumber: z.string().optional(),
  name: z.string().optional(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error;

    return res.status(400).json({ status: "error", message: error.message });
  }

  const { identificationNumber, name: queryName } = parsed.data;

  console.log({ identificationNumber, queryName });

  if (!queryName?.length && !identificationNumber?.length) {
    const allUsers = await prisma.user.findMany();

    console.log({ allUsers });

    if (!allUsers) {
      return res
        .status(201)
        .json({ status: "error", message: "User not found" });
    }

    const payload = allUsers.map((user) => {
      const {
        id,
        dateOfBirth,
        dateOfExpiry,
        dateOfIssue,
        lastName,
        name,
        identificationNumber: thaiIdNumber,
      } = user;

      return {
        id,
        name,
        thaiIdNumber,
        dateOfBirth,
        dateOfExpiry,
        dateOfIssue,
        lastName,
      };
    });

    return res.status(201).json({
      status: "ok",
      message: "User found",
      data: payload,
    });
  }

  console.log({ identificationNumber, queryName });

  if (identificationNumber?.length && !queryName?.length) {
    const user = await prisma.user.findUnique({
      where: { identificationNumber },
    });

    if (!user) {
      return res
        .status(201)
        .json({ status: "error", message: "User not found" });
    }

    const {
      id,
      dateOfBirth,
      dateOfExpiry,
      dateOfIssue,
      lastName,
      name,
      identificationNumber: thaiIdNumber,
    } = user;

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
      message: "User found",
      data: [payload],
    });
  }

  const user = await prisma.user.findUnique({
    where: { identificationNumber, name: queryName },
  });

  if (!user) {
    return res.status(201).json({ status: "error", message: "User not found" });
  }

  const {
    id,
    dateOfBirth,
    dateOfExpiry,
    dateOfIssue,
    lastName,
    name,
    identificationNumber: thaiIdNumber,
  } = user;

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
    message: "User found",
    data: [payload],
  });
};

export default handler;
