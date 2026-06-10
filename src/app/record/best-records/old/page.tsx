// src/app/record/best-records/page.tsx
// 最高記録を表示するページ

import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import BestRecordsList from "./bestRecordsList";
import { getBestRecordsByUserId } from "@/lib/record";

export default async function BestRecords() {
  noStore();
  const prisma = getPrisma();
  const exercise = await prisma.exercise.findMany();

  //ログイン情報の取得
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  //ログインしていない場合
  if (!userId) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center mt-[40px]">
          <h1 className="font-bold text-xl">最高記録の確認</h1>
          <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500">
            <h2>ログインまたは新規登録してから登録してください</h2>
          </div>
        </div>
      </div>
    );
  }

  //ユーザーのトレーニング最高記録の取得
  const records = await getBestRecordsByUserId(userId);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <h1 className="font-bold text-xl">最高記録を確認</h1>

        <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500">
          <div className="flex w-full mt-[20px] h-[30px]">
            <p className="font-bold w-[90px] ml-[7px]">期限</p>
            <p className="font-bold w-[180px] ml-[5px]">トレーニング名</p>
            <p className="font-bold w-[50px] ml-[5px]">重量</p>
            <p className="font-bold w-[50px] ml-[15px]">回数</p>
          </div>
          <BestRecordsList records={records} exercises={exercise} />
        </div>
      </div>
    </div>
  );
}
