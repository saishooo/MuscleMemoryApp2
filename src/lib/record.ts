// src/lib/record.ts
import { getPrisma } from "./prisma";

export async function getTodayRecordsByUserId(userId: number | null) {
  const prisma = getPrisma();

  if (!userId) {
    return [];
  }

  return await prisma.training.findMany({
    where: {
      session: {
        is: {
          userId: userId,
        },
      },
    },
  });
}
