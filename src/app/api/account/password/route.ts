//src/app/api/account/password/route.ts
//パスワードの変更

import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { error } from "console";

export async function PATCH(req: Request) {
  const prisma = getPrisma();

  try {
    const body = await req.json();

    const { userId, nowPass, newPass, newPassConf } = body;

    if (
      userId === "" ||
      nowPass === "" ||
      newPass === "" ||
      newPassConf === ""
    ) {
      console.log("未入力の項目があります");
      return NextResponse.json(
        { error: "未入力の項目があります" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log("ユーザーが見つかりませんでした");
      return NextResponse.json(
        { error: "ユーザーが見つかりませんでした" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(nowPass, user.password);

    if (!isMatch) {
      console.log("古いパスワードが違います");
      return NextResponse.json(
        { error: "古いパスワードが違います" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    const response = NextResponse.json(
      { message: "パスワードを更新しました" },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
