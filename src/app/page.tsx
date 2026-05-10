// src/app/page.tsx
//初期ページ

import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import {
  getAllRecordsByUserId,
  getBestRecordsByUserId,
  getGoalRecordsByUserId,
} from "@/lib/record";
import GlaphOutput from "./record/graphs/glaphOutput_new";
import BestRecordsList from "./record/best-records/bestRecordsList_new";
import GoalRecordsList from "./record/goal/output/goalRecordsList_new";

export default async function Home() {
  noStore();
  const prisma = getPrisma();
  const exerciseCategory = await prisma.exerciseCategory.findMany();
  const exercise = await prisma.exercise.findMany();

  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  const items = [
    { id: 1, href: "/auth", label: "ログイン・登録" },
    //{ id: 2, href: "/record", label: "メニュー" },
  ];

  if (!userId) {
    return (
      <div className="min-h-screen">
        <div className="flex justify-center items-center mt-[80px]">
          <div className="flex flex-col">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="flex justify-center items-center mt-[50px] w-[120px] h-[40px] rounded-lg font-bold text-white bg-gray-500"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const trainings = await getAllRecordsByUserId(userId);
  const records = await getBestRecordsByUserId(userId);
  const goals = await getGoalRecordsByUserId(userId);

  return (
    <div className="min-h-screen min-w-full">
      <div className="flex flex-col justify-center items-center mx-auto ">
        <div className="flex justify-center items-center mt-20 w-full">
          <div className="flex items-center justify-center rounded border w-22 h-8">
            <button className="">記録する🖊️</button>
          </div>
          <div className="flex items-center justify-center rounded border ml-10 w-22 h-8">
            <button className="">確認する👀</button>
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <div className="rounded border w-98 h-130">
            <p className="w-full mt-2 ml-3 text-lg font-bold">記録推移</p>
            <GlaphOutput
              trainings={trainings}
              exerciseCategory={exerciseCategory}
              exercises={exercise}
              loginUserId={userId}
            />
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <div className="rounded border w-98 h-100">
            <p className="w-full mt-2 ml-3 text-lg font-bold">最高記録</p>
            <BestRecordsList records={records} exercises={exercise} />
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <div className="rounded border w-98 h-100">
            <p className="w-full mt-2 ml-3 text-lg font-bold">目標</p>
            <GoalRecordsList
              goals={goals}
              exercises={exercise}
              loginUserId={userId}
            />
          </div>
        </div>
        <div className="mt-12"></div>
      </div>
    </div>
  );
}
