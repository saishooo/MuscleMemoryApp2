// src/app/record/today-records/page.tsx
// 今日の記録を表示するページ

import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import TodayRecordsList from "./todayRecordsList";
import { getTodayRecordsByUserId } from "@/lib/record";

export default async function TodayRecords() {
  noStore(); //キャッシュ禁止

  //ログイン情報の取得
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  //ログインしていない場合
  if (!userId) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center mt-10">
          <h1 className="font-bold text-xl">今日の記録を確認</h1>
          <div className="w-95 h-100 mt-5 rounded border border-gray-500">
            <h2>ログインまたは新規登録してから登録してください</h2>
          </div>
        </div>
      </div>
    );
  }

  //ユーザーの全てのトレーニング記録の取得
  const trainings = await getTodayRecordsByUserId(userId);

  //ログインしている場合
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-10">
        <h1 className="font-bold text-xl">今日の記録を確認</h1>
        <div className="w-95 h-100 mt-5 rounded border border-gray-500">
          <div className="flex w-full mt-5 h-7">
            <p className="font-bold w-45 ml-5">トレーニング名</p>
            <p className="font-bold w-100 ml-7">重量</p>
            <p className="font-bold w-22 ml-7">回数</p>
          </div>
          <TodayRecordsList trainings={trainings} loginUserId={userId} />
        </div>
      </div>
    </div>
  );
}
