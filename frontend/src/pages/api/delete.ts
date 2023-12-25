import { prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

import { z } from "zod";

const schema = z.object({
  idNumber: z.string(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error;

    return res.status(400).json({ status: "error", message: error.message });
  }

  const { idNumber } = parsed.data;

  const user = await prisma.user.delete({
    where: { identificationNumber: idNumber },
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
    message: "User deleted",
    data: payload,
  });
};

export default handler;
