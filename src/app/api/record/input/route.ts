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
        const { userId, categoryId, exerciseId, weight, reps, date } = body;

        if( !userId ){
            return NextResponse.json(
                {error: "ログインまたは新規登録してください"},
                {status: 400},
            );
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
    }

}