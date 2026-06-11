// src/app/api/graph/route.ts
// 指定日の日付のトレーニングを取得する

import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const prisma = getPrisma();

  const userId = req.nextUrl.searchParams.get("userId");
  const date = req.nextUrl.searchParams.get("date");

  const selectedDate = new Date(date!);

  const start = new Date(selectedDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const trainings = await prisma.training.findMany({
    where: {
      session: {
        userId: userId!,
      },
      createdAt: {
        gte: start,
        lt: end,
      },
    },
    include: {
      exercise: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(trainings);
}
