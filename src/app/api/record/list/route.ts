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

    if (typeof userId !== "string" || userId === "") {
      return NextResponse.json({ error: "不正なidです" }, { status: 400 });
    }

    //本人の記録か確認(バリエーション)
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

    //対象トレーニングの削除
    await prisma.training.delete({
      where: {
        id: sessionId,
      },
    });

    //trainingの中に削除したsessionIdがあるか確認
    //同じsessionに紐づくtrainingの残件数を確認
    const remainigCount = await prisma.training.count({
      where: {
        sessionId: sessionId,
      },
    });

    if (remainigCount === 0) {
      //削除した日のworkoutSessionがない場合
      //その日のworkoutSessionを削除
      await prisma.workoutSession.delete({
        where: {
          id: sessionId,
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
