// src/app/api/auth/login/route.ts
// ログイン機能のAPI

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST( req: Request ){
    const prisma = getPrisma();

    try{
        const body = await req.json()
        const { username, password } = body

        //入力情報に抜け漏れがないか確認
        if( !username || !password ) {
            return NextResponse.json(
                { error: "全ての項目を入力してください" },
                { status: 400 },
            );
        }

        //ユーザー検索
        const user = await prisma.user.findUnique({
            where: { username },
        });

        //ユーザーネームが存在しなかった場合
        if( !user ){
            return NextResponse.json(
                { error: "ユーザー名またはパスワードが違います" },
                { status: 401 },
            );
        }

        //パスワードの確認
        const isMatch = await bcrypt.compare(password, user.password);

        if( !isMatch ){
            return NextResponse.json(
                { error: "ユーザー名またはパスワードが違います" },
                { status: 401 },
            );
        }


        const response = NextResponse.json(
            {
                message: "ログイン成功",
                user: {
                    id: user.id,
                    username: user.username,
                    nickname: user.nickname,
                    email: user.email,
                },
            },
            { status: 200 }
        );

        //Cookieに保存する（ブラウザにログイン状態を保存）
        //⚫︎response.cookies.set("userId", String(user.id), { でuserIdを保存
        response.cookies.set("userId", String(user.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",          //⚫︎全てのページで使用できるようにしている
            sameSite: "lax",    //⚫︎外部サイトから勝手に送られないようにする
        });

        return response;

    } catch ( error ) {
        console.error( error )
        return NextResponse.json(
            { error: "サーバーエラー"},
            { status: 500 },
        )
    }
}