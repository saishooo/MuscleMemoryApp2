// src/app/api/record/update/route.ts
// トレーニング内容編集のAPI

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { error } from "console";

export async function PATCH(req: Request) {
  const prisma = getPrisma();

  try {
    const body = await req.json();

    const { type, userId } = body;

    if (userId === "") {
      return NextResponse.json(
        { error: "ログインまたは新規登録してください" },
        { status: 400 }
      );
    }
    //------------------今日の記録を編集------------------
    if (type === "todayTraining") {
      const { trainingId, weight, reps } = body;
      if (trainingId === "" || weight === "" || reps === "") {
        return NextResponse.json(
          { error: "未入力の項目があります" },
          { status: 400 }
        );
      }

      const weightNum = Number(body.weight);
      const repsNum = Number(body.reps);

      if (Number.isNaN(weightNum) || Number.isNaN(repsNum)) {
        return NextResponse.json(
          { error: "数値が正しくありません" },
          { status: 400 }
        );
      }

      //編集対象のトレーニングを取得
      const training = await prisma.training.findFirst({
        where: {
          id: trainingId,
          session: {
            userId: userId,
          },
        },
      });

      if (!training) {
        return NextResponse.json(
          { error: "対象のトレーニングがありません" },
          { status: 400 }
        );
      }

      //編集した内容を登録
      await prisma.training.update({
        where: {
          id: training.id,
        },
        data: {
          weight: weightNum,
          reps: repsNum,
        },
      });

      //トレーニングの最高記録を取得
      const maxWeightTraining = await prisma.training.findFirst({
        where: {
          exerciseId: training.exerciseId,
          session: {
            userId: userId,
          },
        },
        orderBy: [{ weight: "desc" }, { reps: "desc" }],
      });

      //最高記録が登録されていた場合の処理
      if (maxWeightTraining) {
        await prisma.record.upsert({
          where: {
            userId_exerciseId: {
              userId: userId,
              exerciseId: training.exerciseId,
            },
          },
          update: {
            maxWeight: maxWeightTraining.weight,
            maxReps: maxWeightTraining.reps,
          },
          create: {
            userId: userId,
            exerciseId: training.exerciseId,
            maxWeight: maxWeightTraining.weight,
            maxReps: maxWeightTraining.reps,
          },
        });
      }

      const response = NextResponse.json(
        { message: "編集成功" },
        { status: 201 }
      );

      return response;
    }

    //------------------目標を編集------------------
    if (type === "goal") {
      const { goalId, targetWeight, targetReps, deadline } = body;
      if (
        goalId === "" ||
        targetWeight === "" ||
        targetReps === "" ||
        deadline === ""
      ) {
        return NextResponse.json(
          { error: "未入力の項目があります" },
          { status: 400 }
        );
      }

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
      //編集対象のトレーニングを取得
      const goal = await prisma.goal.findFirst({
        where: {
          id: goalId,
          userId: userId,
        },
      });

      if (!goal) {
        return NextResponse.json(
          { error: "対象の目標がありません" },
          { status: 400 }
        );
      }

      //編集した内容を登録
      await prisma.goal.update({
        where: {
          id: goal.id,
        },
        data: {
          deadline: deadlineDate,
          targetWeight: targetWeightNum,
          targetReps: targetRepsNum,
        },
      });

      const response = NextResponse.json(
        { message: "編集成功" },
        { status: 201 }
      );

      return response;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
