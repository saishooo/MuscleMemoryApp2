// src/app/api/record/goal/route.ts
// 目標設定のAPI

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { error } from "console";

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
    console.log("userId =", body.userId);
    console.log("exerciseId =", body.exerciseId);
    console.log("targetWeight =", body.targetWeight, Number(body.targetWeight));
    console.log("targetReps =", body.targetReps, Number(body.targetReps));
    console.log("deadline =", body.deadline, new Date(body.deadline));

    const targetWeightNum = Number(body.targetWeight);
    const targetRepsNum = Number(body.targetReps);
    const deadlineDate = new Date(body.deadline);

    //数値が入力されているかの確認
    if (Number.isNaN(targetWeightNum) || Number.isNaN(targetRepsNum)) {
      return NextResponse.json(
        { error: "数値が正しくありません" },
        { status: 400 }
      );
    }

    //500kg以上の重量が入力されていないか確認
    if (targetWeight > 500) {
      return NextResponse.json(
        { error: "重量は500kgまでです" },
        { status: 400 }
      );
    }
    //小数点2桁以上の重量が入力されていないかの確認
    if (!/^\d+(\.\d{1,2})?$/.test(body.targetWeight)) {
      return NextResponse.json(
        { error: "重量は小数点2桁までです" },
        { status: 400 }
      );
    }

    //目標を登録
    const goal = await prisma.goal.create({
      data: {
        userId: userId,
        exerciseId: exerciseId,
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
