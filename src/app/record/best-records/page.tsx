// src/app/record/best-records/page.tsx
// 最高記録を表示するページ

import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

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

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <h1 className="font-bold text-xl">最高記録を確認</h1>

        <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500"></div>
      </div>
    </div>
  );
}
