// src/app/record/all-records/page.tsx
// 今までの記録を表示するページ

import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { getAllRecordsByUserId } from "@/lib/record";
import AllRecordsList from "./allRecordsList";

export default async function AllRecords() {
  noStore(); //キャッシュ禁止
  const prisma = getPrisma();
  const exercise = await prisma.exercise.findMany();

  //ログイン情報の取得
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;
  let userIdNum: number | null = null;

  //ログインしていない場合
  if (!userId) {
    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center mt-[40px]">
          <h1 className="font-bold text-xl">全記録を確認</h1>
          <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500">
            <h2>ログインまたは新規登録してから登録してください</h2>
          </div>
        </div>
      </div>
    );
  } else {
    userIdNum = Number(userId);
  }

  //ユーザーの全てのトレーニング記録の取得
  const trainings = await getAllRecordsByUserId(userIdNum);

  //ログインしている場合
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <h1 className="font-bold text-xl">全記録を確認</h1>
        <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500">
          <div className="flex w-full mt-[20px] h-[30px]">
            <p className="font-bold w-[180px] ml-[20px]">トレーニング名</p>
            <p className="font-bold w-[100px] ml-[30px]">重量（kg）</p>
            <p className="font-bold w-[90px] ml-[30px]">回数</p>
          </div>
          <AllRecordsList trainings={trainings} exercises={exercise} />
        </div>
      </div>
    </div>
  );
}
