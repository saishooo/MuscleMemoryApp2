// src/app/api/record/input/route.ts
// トレーニング内容記録のAPI

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

//⚫︎route.tsでかける関数名は以下のみ
//⚫︎GET(データの取得),POST(新規作成),PUT(更新),DELETE(削除)
export async function POST(req: Request) {
  const prisma = getPrisma();

  try {
    const body = await req.json();

    const { userId, exerciseId, weight, reps } = body;

    if (userId === "") {
      return NextResponse.json(
        { error: "ログインまたは新規登録してください" },
        { status: 400 }
      );
    }
    if (exerciseId === "" || weight === "" || reps === "") {
      return NextResponse.json(
        { error: "未入力の項目があります" },
        { status: 400 }
      );
    }

    const userIdNum = Number(body.userId);
    const exerciseIdNum = Number(body.exerciseId);
    const weightNum = Number(body.weight);
    const repsNum = Number(body.reps);

    if (
      Number.isNaN(userIdNum) ||
      Number.isNaN(exerciseIdNum) ||
      Number.isNaN(weightNum) ||
      Number.isNaN(repsNum)
    ) {
      return NextResponse.json(
        { error: "数値が正しくありません" },
        { status: 400 }
      );
    }

    const targetDate = new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(24, 0, 0, 0);

    let workoutSession = await prisma.workoutSession.findFirst({
      where: {
        userId: userIdNum,
        date: {
          gte: startOfDay, //⚫︎gte greater than or equal(以上)
          lt: endOfDay, //⚫︎lt  less than(未満)
        },
      },
    });

    if (!workoutSession) {
      workoutSession = await prisma.workoutSession.create({
        data: {
          userId: userIdNum,
          date: targetDate,
        },
      });
    }

    const training = await prisma.training.create({
      data: {
        sessionId: workoutSession.id,
        exerciseId: exerciseIdNum,
        weight: weightNum,
        reps: repsNum,
      },
    });

    const response = NextResponse.json(
      { message: "トレーニング登録成功" },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
