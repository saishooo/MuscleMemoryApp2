// src/app/record/graphs/page.tsx
// グラフで筋トレ記録を表示する

import { getPrisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";
import GlaphOutput from "./glaphOutput";
import { getAllRecordsByUserId, getTodayRecordsByUserId } from "@/lib/record";

export default async function TestChart() {
  noStore(); //キャッシュ禁止
  const prisma = getPrisma();

  const exerciseCategory = await prisma.exerciseCategory.findMany();
  const exercises = await prisma.exercise.findMany();

  //ログイン情報の取得
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  //ログインしていない場合
  if (!userId) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center mt-[40px]">
          <h1 className="font-bold text-xl">記録をグラフで表示</h1>
          <h2>ログインまたは新規登録してください</h2>
        </div>
      </div>
    );
  }

  const trainings = await getAllRecordsByUserId(userId);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <h1 className="font-bold text-xl">記録をグラフで表示</h1>
        <div className="w-[450px] h-[400px] mt-[20px]">
          <GlaphOutput
            trainings={trainings}
            exerciseCategory={exerciseCategory}
            exercises={exercises}
            loginUserId={userId}
          />
        </div>
      </div>
    </div>
  );
}
