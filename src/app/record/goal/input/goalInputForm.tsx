"use client";

import { useState } from "react";

// src/app/record/goal/input/goalInputForm.tsx

type ExerciseCategory = {
  id: number;
  name: string;
};

type Exercises = {
  id: number;
  name: string;
  categoryId: number;
};

type Props = {
  exerciseCategory: ExerciseCategory[];
  exercises: Exercises[];
};

export default function GoalInputForm({ exerciseCategory, exercises }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">目標値の設定</a>

        <form>
          <div className="w-[300px] h-[400px] mt-[20px] rounded border border-gray-500">
            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">部位</a>
              <select
                name="exerciseCategory"
                className="w-[200px] mr-[10px] ml-auto border rounded"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">選択してください</option>
                {exerciseCategory.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">種目</a>
              <select
                name="exercises"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              >
                <option value="">選択してください</option>
                {exercises
                  .filter(
                    (exercise) =>
                      String(exercise.categoryId) === selectedCategory
                  )
                  .map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">重さ</a>
              <input
                name="weight"
                type="number"
                placeholder=" XX kg"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">回数</a>
              <select
                name="raps"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              >
                <option value="">選択してください</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-[60px] mr-[20px]">
              <button className="font-bold">登録</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
