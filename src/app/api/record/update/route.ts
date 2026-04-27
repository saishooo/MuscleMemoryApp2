// src/app/api/record/update/route.ts
// トレーニング内容編集のAPI

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { error } from "console";

export async function PATCH(req: Request) {
    const prisma = getPrisma();

    try {
        const body = await req.json();

        const { userId, trainingId, weight, reps } = body;

        if (userId === "") {
            return NextResponse.json(
                { error: "ログインまたは新規登録してください" },
                { status: 400 }
            );
        }
        if (trainingId === "" || weight === "" || reps === "") {
            return NextResponse.json(
                { error: "未入力の項目があります" },
                { status: 400 },
            );
        }

        const weightNum = Number(body.weight);
        const repsNum = Number(body.reps);

        if (Number.isNaN(weightNum) || Number.isNaN(repsNum)) {
            return NextResponse.json(
                { error: "数値が正しくありません" },
                { status: 400 },
            );
        }

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
                { status: 400 },
            );
        }

        await prisma.training.update({
            where: {
                id: training.id, 
            },
            data: {
                weight: weightNum,
                reps: repsNum,
            },
        });

        const response = NextResponse.json(
            { message: "編集成功"},
            { status: 201 }
        );

        return response;
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: "サーバーエラー"}, {status: 500});
    }
}