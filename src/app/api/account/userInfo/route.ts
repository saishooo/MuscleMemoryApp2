//src/app/api/account/route.ts
//アカウント情報を変更

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { error } from "console";

export async function PATCH(req: Request) {
  const prisma = getPrisma();

  try {
    const body = await req.json();

    const { userId, username, nickname, email } = body;

    if (userId === "" || username === "" || nickname === "" || email === "") {
      return NextResponse.json(
        { error: "未入力の項目があります" },
        { status: 400 }
      );
    }

    const regex = /^[A-Za-z0-9_.]+$/;
    if (!regex.test(username)){
      return NextResponse.json(
        { error: "ユーザーIDは英数字「.」「_」作成してください" },
        { status: 400 }
      );
    }

    const userIdStr = String(userId);
    const usernameStr = String(username);
    const nicknameStr = String(nickname);
    const emailStr = String(email);

    await prisma.user.update({
      where: { id: userIdStr },
      data: {
        username: usernameStr,
        nickname: nicknameStr,
        email: emailStr,
      },
    });

    const response = NextResponse.json(
      { message: "編集成功" },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
