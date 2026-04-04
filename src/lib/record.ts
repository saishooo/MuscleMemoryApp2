// src/lib/record.ts
// 記録に関する関数

import { getPrisma } from "./prisma";

//今日の記録を吸い上げる関数
export async function getTodayRecordsByUserId(userId: number | null) {
  const prisma = getPrisma();

  if (!userId) {
    return [];
  }

  //今日の開始(00:00:00)
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  //今日の終了(23:59:59)
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 9999);

  //trainingからsessionに行き、userIdが一致するものを取得する
  return await prisma.training.findMany({
    where: {
      session: {
        is: {
          userId: userId,
        },
      },
      createdAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    include: {
      exercise: true,
    },
  });
}

//全ての記録を吸い上げる関数
export async function getAllRecordsByUserId(userId: number | null) {
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
