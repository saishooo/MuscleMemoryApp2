//パスワードを忘れたユーザーのパスワード再設定

import { NextResponse } from "next/server";
import crypto from "crypto";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const prisma = getPrisma();

  try {
    const body = await req.json();

    const { username, email } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "再設定パスワードを送信しました" },
        { status: 201 }
      );
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = new Date(Date.now() + 1000 * 60 * 30); //30分後に期限切れ

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpire,
      },
    });

    const resetUrl = `https//localhost:3000/reset-password?token=${resetToken}`;

    console.log(resetUrl); //本番ではここでメール送信

    const response = NextResponse.json(
      { message: "再設定用メールを送信しました" },
      { status: 201 }
    );

    return response;
  } catch {
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
