// src/app/api/auth/signup/route.ts
// ユーザー新規登録のAPI(Application Programing Interface)

//⚫︎APIはNodeljs環境で動かすための宣言　これがないとbcryptが動かない
export const runtime = "nodejs"

import { NextResponse } from "next/server";     //⚫︎NextResponseとは、サーバーからクライアントに返すレスポンス
import { getPrisma } from "@/lib/prisma";       //⚫︎DBを操作するためのメソッドを使用するためにインポート
import bcrypt from "bcrypt";                    //⚫︎パスワードをハッシュ化するためにインポート

//⚫︎export 外ファイルから呼び出せるようにする
//⚫︎async 非同期関数（この関数の処理には時間がかかることを宣言）
//        Promiseを返す、関数内でawaitを使用でききるようになる
//⚫︎Promise あとで結果を返す
//⚫︎await 処理が終わるまで待つことを意味
//⚫︎try エラーが発生するかもしれない処理を囲う
//⚫︎catch tryエラー時の処理を書く
//⚫︎POST関数の引数であるreqはフロントから送られてきた情報全てが入っている
export async function POST(req: Request) {
    //⚫︎DBを操作するためにgetPrisma関数を呼び出し、インスタンスをprismaに格納
    //⚫︎これ以降ではDBの操作はprismaに対して行う。正しくデータを扱うためにインスタンスを作成する。
    const prisma = getPrisma()
    try{
        //⚫︎req.json()とはリクエストをJSONとしてパースする関数
        //⚫︎JSON データをやり取りするためのフォーマット(文字列)
        //⚫︎パース 文字列をプログラムに変換すること
        const body = await req.json()
        const { username, nickname, email, password, confirm_password } = body

        //入力情報に抜け漏れがないか確認
        if ( !username || !email || !password ) {
            //⚫︎NextResponse.jsonはAPIの戻り値(フロントにデータを送る)
            return NextResponse.json(
                { error: "全ての項目を入力してください" },
                { status: 400 }
            )
        }

        //パスワードと確認パスワードが一致しない
        if ( password !== confirm_password ) {
            return NextResponse.json(
                { error: "パスワードが一致しません" },
                { status: 400 }
            )
        }

        //すでに登録されているusernameと重複がないかチェック
        //⚫︎prisma.user Userテーブルを操作する
        //⚫︎findUnique 一意な条件で1件だけ取得する
        const existingUser = await prisma.user.findUnique({
            where: { username },
        })

        //もし既に使用されているユーザーネームだった場合には排除
        if ( existingUser ) {
            return NextResponse.json(
                { error: "このユーザー名は既に使用されています" },
                { status: 400 }
            )
        }

        //パスワードハッシュ化
        const hashedPassword = await bcrypt.hash( password, 10 )

        //ユーザー作成
        const user = await prisma.user.create( {
            data: {
                username,
                nickname,
                email,
                password: hashedPassword,
            },
        })

        const response = NextResponse.json(
            {
                message: "ユーザー登録成功",
                user: {
                    id: user.id,
                    username: user.username,
                    nickname: user.nickname,
                },
            },
            { status: 201}
        );

        //ユーザー情報をcookieに保存
        response.cookies.set("userId", String(user.id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        return response;
        // return NextResponse.json(
        //     { message: "ユーザー登録成功", user },
        //     { status: 201 }
        // )

    } catch ( error ) {
        //⚫︎開発者のみ閲覧可能なコンソールにエラー内容詳細を出力
        console.error( error )
        return NextResponse.json(
            { error: "サーバーエラー" },
            { status: 500 }
        )
    }
}