//グラフページ

// src/app/page.tsx
//初期ページ

import Link from "next/link";
import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { getAllRecordsByUserId } from "@/lib/record";
import GlaphOutput from "./glaphOutput_new";

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

  return (
    <div className="min-h-screen min-w-full">
      <div className="flex flex-col justify-center items-center mx-auto">
        <div className="flex justify-center pt-14">
          <div className="rounded border border-gray-500 w-96 h-130 shadow-lg">
            <p className="w-full pt-2 pl-3 text-lg font-bold">記録推移</p>
            <GlaphOutput
              trainings={trainings}
              exerciseCategory={exerciseCategory}
              exercises={exercise}
              loginUserId={userId}
            />
          </div>
        </div>
        <div className="pt-12"></div>
      </div>
    </div>
  );
}
