// src/app/record/input/page.tsx
// Server Component Prismaからデータを受け取る
//⚫︎Prismaはサーバー専用なので、ブラウザ側では使用することができない。なので、ファイルを分ける。

import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import RecordInputForm from "./recordInputForm";

export default async function recordTrainingPage() {
  noStore();
  const prisma = getPrisma();
  const exerciseCategory = await prisma.exerciseCategory.findMany();
  const exercises = await prisma.exercise.findMany();

  //ログイン情報を取得
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;
  let isloginUserId = null;
  if (userId) {
    isloginUserId = Number(userId);
  }

  return (
    <RecordInputForm
      exerciseCategory={exerciseCategory}
      exercises={exercises}
      userId={isloginUserId}
    />
  );
}
