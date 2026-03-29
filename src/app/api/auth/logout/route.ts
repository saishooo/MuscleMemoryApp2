import { NextResponse } from "next/server";

export async function POST(req: Request) {
  //⚫︎トップページ(/)に移動
  //⚫︎NextResponse.redirect(...)　別のページに移動させるレスポンス
  //⚫︎req.url は　http://localhost:3000/api/auth/logout のこと
  //⚫︎http://localhost:3000/api/auth/logout を http://localhost:3000/ に遷移させる
  const response = NextResponse.redirect(new URL("/", req.url));

  //cookiesを削除
  //⚫︎userIdを空（""）にする
  response.cookies.set("userId", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0, //⚫︎即削除
    sameSite: "lax",
  });

  return response;
}
