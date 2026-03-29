// src/app/record/input/page.tsx
//トレーニング内容を記録するページ

import { getPrisma } from "@/lib/prisma";

export default async function recordTraining_page() {
  const prisma = getPrisma();
  const exerciseCategory = await prisma.exerciseCategory.findMany();
  const exercises = await prisma.exercise.findMany();

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">記録</a>

        <form>
          <div className="w-[300px] h-[400px] mt-[20px] rounded border border-gray-500">
            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">部位</a>
              <select
                name="exerciseCategory"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              >
                <option value="">選択してください</option>
                {exerciseCategory.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center mt-[50px] ml-[10px]">
              <a className="font-bold w-[px]">種目</a>
              <select
                name="exercises"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              >
                <option value="">選択してください</option>
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center mt-[50px] ml-[10px]">
              <a className="font-bold">重さ</a>
              <input
                name="weight"
                type="text"
                placeholder=" 重さを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[50px] ml-[10px]">
              <a className="font-bold">回数</a>
              <select
                name="event"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              >
                <option value="">選択してください</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-[50px] mr-[20px]">
              <button className="font-bold">記録</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
