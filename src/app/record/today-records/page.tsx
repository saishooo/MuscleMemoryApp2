// src/app/record/today-records/page.tsx
// 今日の記録を表示するページ

import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import TodayRecordsList from "./todayRecordsList";
import { getTodayRecordsByUserId } from "@/lib/record";

export default async function todayRecords() {
  noStore(); //⚫︎キャッシュ禁止
  const prisma = getPrisma();
  const exercise = await prisma.exercise.findMany();

  //ログイン情報の取得
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;
  let userIdnum: number | null = null;

  //ログインしていない場合
  if (!userId) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center mt-[40px]">
          <a className="font-bold text-xl">今日の記録を確認</a>

          <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500">
            <a>ログインまたは新規登録してから登録してください</a>
          </div>
        </div>
      </div>
    );
  } else {
    userIdnum = Number(userId);
  }

  //ユーザーの全てのトレーニング記録の取得
  const trainings = await getTodayRecordsByUserId(userIdnum);

  //ログインしている場合
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">今日の記録を確認</a>

        <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500">
          <TodayRecordsList trainings={trainings} exercises={exercise} />
        </div>
      </div>
    </div>
  );
}
