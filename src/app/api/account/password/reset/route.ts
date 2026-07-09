// src/app/api/account/password/reset/route.ts
// パスワードを忘れた場合のパスワードの変更

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function PATCH(req: Request) {
  const prisma = getPrisma();

  try {
    const body = await req.json();

    const { newPassword, confirm_newPassword, resetToken } = body;

    if (newPassword === "" || confirm_newPassword === "" || resetToken === "") {
      return NextResponse.json(
        { error: "未入力の項目があります" },
        { status: 400 }
      );
    }

    const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_.!&$#]{7,}$/;
    if (!regexPass.test(newPassword)) {
      return NextResponse.json(
        { error: "パスワードに英数字を1文字以上ずつ使用してください" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: resetToken,
        resetTokenExpire: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "パスワードを更新できませんでした" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpire: null,
      },
    });

    const response = NextResponse.json(
      { message: "パスワードを更新しました" },
      { status: 200 }
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
