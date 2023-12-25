import { prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

import { z } from "zod";

const schema = z.object({
  idNumber: z.string().length(13, {
    message: "ID Number must be 13 digits",
  }),

  name: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  dateOfIssue: z.string().optional(),
  dateOfExpiry: z.string().optional(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error;

    return res.status(400).json({ status: "error", message: error.message });
  }

  const { idNumber } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { identificationNumber: idNumber },
  });

  if (!user) {
    return res
      .status(500)
      .json({ status: "error", message: "Unable to Find User" });
  }

  const newUser = await prisma.user.update({
    where: { identificationNumber: idNumber },
    data: {
      identificationNumber: idNumber,
      name: parsed.data.name,
      lastName: parsed.data.lastName,
      dateOfBirth: parsed.data.dateOfBirth,
      dateOfExpiry: parsed.data.dateOfExpiry,
      dateOfIssue: parsed.data.dateOfIssue,
    },
  });

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
    message: "User Date Updated",
    data: payload,
  });
};

export default handler;
