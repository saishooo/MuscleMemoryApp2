// src/app/api/record/goal/route.ts
// 目標設定のAPI

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const prisma = getPrisma();

  try {
    const body = await req.json();

    const { userId, exerciseId, targetWeight, targetReps, deadline } = body;

    if (userId === "") {
      return NextResponse.json(
        { error: "ログインまたは新規登録してください" },
        { status: 400 }
      );
    }
    if (
      exerciseId === "" ||
      targetWeight === "" ||
      targetReps === "" ||
      deadline === ""
    ) {
      return NextResponse.json(
        { error: "未入力の項目があります" },
        { status: 400 }
      );
    }

    console.log("body =", body);
    console.log("userId =", body.userId, Number(body.userId));
    console.log("exerciseId =", body.exerciseId, Number(body.exerciseId));
    console.log("targetWeight =", body.targetWeight, Number(body.targetWeight));
    console.log("targetReps =", body.targetReps, Number(body.targetReps));
    console.log("deadline =", body.deadline, new Date(body.deadline));

    const userIdNum = Number(body.userId);
    const exerciseIdNum = Number(body.exerciseId);
    const targetWeightNum = Number(body.targetWeight);
    const targetRepsNum = Number(body.targetReps);
    const deadlineDate = new Date(body.deadline);

    if (
      Number.isNaN(userIdNum) ||
      Number.isNaN(exerciseIdNum) ||
      Number.isNaN(targetWeightNum) ||
      Number.isNaN(targetRepsNum)
    ) {
      return NextResponse.json(
        { error: "数値が正しくありませんas" },
        { status: 400 }
      );
    }

    //目標を登録
    const goal = await prisma.goal.create({
      data: {
        userId: userIdNum,
        exerciseId: exerciseIdNum,
        targetWeight: targetWeightNum,
        targetReps: targetRepsNum,
        deadline: deadlineDate,
      },
    });

    const response = NextResponse.json(
      { message: "目標登録成功" },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
