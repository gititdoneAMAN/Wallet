"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function getOnRampTransactions(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);

  if (!session.user.id || !session.user) {
    return "UNAUTHORIZED";
  } else {
    await prisma.onRampTransaction.create({
      data: {
        userId: Number(session.user.id),
        provider,
        amount: amount * 100,
        startTime: new Date(),
        status: "Processing",
        token: Math.random().toString(),
      },
    });

    return "SUCCESS";
  }
}
