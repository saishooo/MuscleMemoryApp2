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
import AllRecordsList from "./record/all-records/allRecordsList_new";
import RecordInputform from "./record/input/recordInputForm_new";
import GoalInputForm from "./record/goal/input/goalInputForm_new";

export default async function Home() {
  noStore();
  const prisma = getPrisma();
  const exerciseCategory = await prisma.exerciseCategory.findMany();
  const exercise = await prisma.exercise.findMany();

  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  const items = [
    { id: 1, href: "/auth/login", label: "ログイン" },
    { id: 2, href: "/auth/signup", label: "登録" },
  ];

  if (!userId) {
    return (
      <div className="min-h-screen">
        <div className="flex justify-center items-center pt-20">
          <div className="flex flex-col">
            {items.map((item) => (
              <div key={item.id} className="pt-10">
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex justify-center items-center w-30 h-10 rounded-lg font-bold text-white bg-gray-500"
                >
                  {item.label}
                </Link>
              </div>
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
        <div className="flex justify-center pt-5">
          <div className="rounded border w-96 h-100"></div>
        </div>

        <div className="flex justify-center items-center pt-5 w-full">
          <div className="flex items-center justify-center rounded border w-22 h-8">
            <RecordInputform
              exerciseCategory={exerciseCategory}
              exercises={exercise}
              userId={userId}
            />
          </div>

          <div className="pl-6">
            <div className="flex items-center justify-center rounded border w-22 h-8">
              <GoalInputForm
                exerciseCategory={exerciseCategory}
                exercises={exercise}
                userId={userId}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-5">
          <div className="rounded border w-96 h-130">
            <p className="w-full pt-2 pl-3 text-lg font-bold">記録推移</p>
            <GlaphOutput
              trainings={trainings}
              exerciseCategory={exerciseCategory}
              exercises={exercise}
              loginUserId={userId}
            />
          </div>
        </div>

        <div className="flex justify-center pt-5">
          <div className="rounded border w-96 h-100">
            <p className="w-full pt-2 pl-2 text-lg font-bold">最高記録</p>
            <BestRecordsList records={records} exercises={exercise} />
          </div>
        </div>

        <div className="flex justify-center pt-5">
          <div className="rounded border w-96 h-100">
            <p className="w-full pt-2 pl-2 text-lg font-bold">目標</p>
            <GoalRecordsList
              goals={goals}
              exercises={exercise}
              loginUserId={userId}
            />
          </div>
        </div>

        <div className="flex justify-center pt-5">
          <div className="rounded border w-96 h-100">
            <p className="w-full pt-2 pl-2 text-lg font-bold">すべての記録</p>
            <AllRecordsList trainings={trainings} exercises={exercise} />
          </div>
        </div>
        <div className="pt-12"></div>
      </div>
    </div>
  );
}
