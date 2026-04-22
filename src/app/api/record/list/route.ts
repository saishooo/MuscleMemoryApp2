// src/app/api/record/list/route.ts
// 編集機能API

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { error } from "console";

export async function DELETE(req: Request) {
  const prisma = getPrisma();

  try {
    const body = await req.json();

    const { userId, trainingId } = body;

    if (userId === "") {
      return NextResponse.json({ error: "不正なIDです" }, { status: 400 });
    }

    if (trainingId === "") {
      return NextResponse.json(
        { error: "不正なトレーニングIDです" },
        { status: 400 }
      );
    }

    //本人の記録か確認(バリデーション)
    const training = await prisma.training.findFirst({
      where: {
        id: trainingId,
        session: {
          userId: userId,
        },
      },
    });

    if (!training) {
      //見つからなければ、エラー
      return NextResponse.json(
        { error: "対象の記録が存在しません" },
        { status: 400 }
      );
    }

    const sessionId = training.sessionId; //workoutSessionIdを記録
    const exerciseId = training.exerciseId; //exerciseIdを取得

    //対象トレーニングの削除
    await prisma.training.delete({
      where: {
        id: trainingId,
      },
    });

    //trainingの中に削除したsessionIdがあるか確認
    //同じsessionに紐づくtrainingの残件数を確認
    const remainingCount = await prisma.training.count({
      where: {
        sessionId: sessionId,
      },
    });

    if (remainingCount === 0) {
      //削除した日のworkoutSessionが空の場合
      //その日のworkoutSessionを削除
      await prisma.workoutSession.delete({
        where: {
          id: sessionId,
        },
      });
    }

    //同種目の最高記録を再計算
    const maxWeightTraining = await prisma.training.findFirst({
      where: {
        exerciseId: exerciseId,
        session: {
          userId: userId,
        },
      },
      orderBy: [{ weight: "desc" }, { reps: "desc" }],
    });

    //同種目の記録が1件も残っていない場合はRecordからも削除
    if (!maxWeightTraining) {
      await prisma.record.deleteMany({
        where: {
          userId: userId,
          exerciseId: exerciseId,
        },
      });
    } else {
      await prisma.record.upsert({
        where: {
          userId_exerciseId: {
            userId: userId,
            exerciseId: exerciseId,
          },
        },
        update: {
          maxWeight: maxWeightTraining.weight,
          maxReps: maxWeightTraining.reps,
        },
        create: {
          userId: userId,
          exerciseId: exerciseId,
          maxWeight: maxWeightTraining.weight,
          maxReps: maxWeightTraining.reps,
        },
      });
    }

    const response = NextResponse.json(
      { message: "削除成功" },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
