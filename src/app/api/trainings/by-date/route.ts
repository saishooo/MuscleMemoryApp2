// src/app/api/graph/route.ts
// 指定日の日付のトレーニングを取得する

import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { error } from "console";
import { fromZonedTime } from "date-fns-tz";
import { format, addDays, parseISO } from "date-fns";

export async function GET(req: NextRequest) {
  const prisma = getPrisma();

  const userId = req.nextUrl.searchParams.get("userId");
  const date = req.nextUrl.searchParams.get("date");
  const timeZone = req.nextUrl.searchParams.get("timeZone");

  if (!userId || !date || !timeZone) {
    return NextResponse.json(
      { error: "userId, date, timeZone are required" },
      { status: 400 }
    );
  }

  const start = fromZonedTime(`${date} 00:00:00`, timeZone);

  const nextDateText = format(addDays(parseISO(date), 1), "yyyy-MM-dd");
  const end = fromZonedTime(`${nextDateText} 00:00:00`, timeZone);

  const trainings = await prisma.training.findMany({
    where: {
      session: {
        userId: userId,
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
