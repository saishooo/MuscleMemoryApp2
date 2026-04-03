// src/app/record/today-records/page.tsx
// 今日の記録を表示するページ

import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

export default async function todayRecords() {
  noStore(); //⚫︎キャッシュ禁止
  const prisma = getPrisma();
  const workoutSession = await prisma.workoutSession.findMany();
  const training = await prisma.training.findMany();

  //ログイン情報の取得
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;
  let isloginUserId: number | null = null;
  if (userId) {
    isloginUserId = Number(userId);
    const filterWorkoutSession = workoutSession.filter(
      (sesstion) => isloginUserId === sesstion.userId
    ); //userIdが同じものを掬い上げる
    const sessionIds = filterWorkoutSession.map((session) => session.id); //userIdが同じものの、idのみを掬い上げる
    const filterTraining = training.filter((training) =>
      sessionIds.includes(training.sessionId)
    ); //trainingでworkoutsessionIdが同じものを掬い上げる
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">今日の記録を確認</a>

        <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500">
          {!isloginUserId ? <a>ログインしてください</a> : <a>成功</a>}
        </div>
      </div>
    </div>
  );
}
