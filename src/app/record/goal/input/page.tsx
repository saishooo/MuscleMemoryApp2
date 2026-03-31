// src/app/record/goal/input/page.tsx
//トレーニング内容を記録するページ
//トレーニング内容を記録するページのとりあえずのUI SQLを導入する予定なので

import { getPrisma } from "@/lib/prisma";
import GoalInputForm from "./goalInputForm";

export default async function GoalInputPage() {
  const prisma = getPrisma();
  const exerciseCategory = await prisma.exerciseCategory.findMany();
  const exercises = await prisma.exercise.findMany();

  return (
    <GoalInputForm exerciseCategory={exerciseCategory} exercises={exercises} />
  );
}
