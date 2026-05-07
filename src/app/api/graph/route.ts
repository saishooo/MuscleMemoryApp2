// src/app/api/graph/route.ts
// グラフ描写に関するAPI

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const prisma = getPrisma();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const exerciseId = searchParams.get("exerciseId");

    if (!userId) {
      return NextResponse.json(
        { error: "ログインまたは新規登録してください" },
        { status: 400 }
      );
    }
    if (!exerciseId) {
      return NextResponse.json(
        { error: "未入力の項目があります" },
        { status: 400 }
      );
    }

    const trainings = await prisma.training.findMany({
      where: {
        session: {
          userId: userId,
        },
        exerciseId: exerciseId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        weight: true,
        reps: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: "成功",
      trainings,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
