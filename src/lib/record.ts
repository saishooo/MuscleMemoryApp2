// src/lib/record.ts
import { getPrisma } from "./prisma";

export async function getTodayRecordsByUserId(userId: number | null) {
  const prisma = getPrisma();

  if (!userId) {
    return [];
  }

  //trainingからsessionに行き、userIdが一致するものを取得する
  return await prisma.training.findMany({
    where: {
      session: {
        is: {
          userId: userId,
        },
      },
    },
    include: {
        exercise: true,
    },
  });
}
