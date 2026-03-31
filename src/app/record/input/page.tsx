// src/app/record/input/page.tsx
// Server Component Prismaからデータを受け取る
//⚫︎Prismaはサーバー専用なので、ブラウザ側では使用することができない。なので、ファイルを分ける。

import { getPrisma } from "@/lib/prisma";
import RecordInputForm from "./recordInputForm";

export default async function recordTrainingPage() {
  const prisma = getPrisma();
  const exerciseCategory = await prisma.exerciseCategory.findMany();
  const exercises = await prisma.exercise.findMany();

  return (
    <RecordInputForm
      exerciseCategory={exerciseCategory}
      exercises={exercises}
    />
  );
}
