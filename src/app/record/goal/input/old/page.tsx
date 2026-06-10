// src/app/record/goal/input/page.tsx
//トレーニング内容を記録するページ
//トレーニング内容を記録するページのとりあえずのUI SQLを導入する予定なので

import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import GoalInputForm from "./goalInputForm";

export default async function GoalInputPage() {
  noStore();
  const prisma = getPrisma();
  const exerciseCategory = await prisma.exerciseCategory.findMany();
  const exercises = await prisma.exercise.findMany();

  //ログイン情報の取得
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;
  let isloginUserId = null;
  if (userId) {
    isloginUserId = userId;
  }

  return (
    <GoalInputForm
      exerciseCategory={exerciseCategory}
      exercises={exercises}
      userId={isloginUserId}
    />
  );
}
