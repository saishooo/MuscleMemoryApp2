// src/app/api/record/input/route.ts
// トレーニング内容記録のAPI

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

//⚫︎route.tsでかける関数名は以下のみ
//⚫︎GET(データの取得),POST(新規作成),PUT(更新),DELETE(削除)
export async function POST( req: Request ){
    const prisma = getPrisma();

    try{
        const body = await req.json();
        const { userId, exerciseId, weight, reps, date } = body;

        if( !userId ){
            return NextResponse.json(
                {error: "ログインまたは新規登録してください"},
                {status: 400},
            );
        }

        if( !exerciseId || !weight || !reps || !date ){
            return NextResponse.json(
                {error: "未入力の項目があります"},
                {status: 400},
            );
        }

        const workoutSession = await prisma.workoutSession.create({
            data: {
                userId: Number(userId),
                date: new Date(date),
            }
        });

        const training = await prisma.training.create({
            data:{
                sessionId: Number(workoutSession.id),
                exerciseId: Number(exerciseId),
                weight: Number(weight),
                reps: Number(reps),
            },
        });

        const response = NextResponse.json(
            { message: "トレーニング登録成功" },
            { status: 201 },
        );

        return response;
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    }

}