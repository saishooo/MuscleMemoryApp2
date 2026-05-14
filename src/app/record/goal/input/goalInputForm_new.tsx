"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// src/app/record/goal/input/goalInputForm_new.tsx

type ExerciseCategory = {
  id: string;
  name: string;
};

type Exercises = {
  id: string;
  name: string;
  categoryId: string;
};

type Props = {
  exerciseCategory: ExerciseCategory[];
  exercises: Exercises[];
  userId: string | null;
};

export default function GoalInputForm({
  exerciseCategory,
  exercises,
  userId,
}: Props) {
  const router = useRouter();
  const [inputGoal, setInputGoal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick_true = () => {
    setInputGoal(true);
  };

  const handleClick_false = () => {
    setInputGoal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページリロード防止

    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={handleClick_true}>目標設定</button>

      {inputGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-90 rounded-xl bg-white p-4 shadow-lg">
            <h2 className="pb-4 text-lg font-bold">目標登録</h2>
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="userId" value={userId ?? ""} />

              <div className="pb-3">
                <a className="pb-1 block text-sm font-medium">部位</a>
                <select
                  name="exerciseCategory"
                  className="block w-full min-w-0 max-w-full appearance-none rounded border border-gray-300 px-3 py-2 text-sm"
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

              <div className="pb-3">
                <a className="pb-1 block text-sm font-medium">種目</a>
                <select
                  name="exercise"
                  className="w-full rounded border border-gray-300 px-3 py-2"
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

              <div className="pb-3">
                <a className="pb-1 block text-sm font-medium">重量</a>
                <input
                  name="weight"
                  type="number"
                  step="0.01"
                  min="0"
                  max="500"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="pb-3">
                <a className="pb-1 block text-sm font-medium">回数</a>
                <select
                  name="reps"
                  className="w-full ronded border border-gray-300 px-3 py-2"
                >
                  <option value="">選択してください</option>
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded border border-gray-300 px-4 py-2"
                  onClick={handleClick_false}
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  記録
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
