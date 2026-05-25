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
  const [loading, setLoading] = useState(false);

  const handleClick_true = () => {
    setInputGoal(true);
  };

  const handleClick_false = () => {
    setInputGoal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページリロード防止

    try {
      const formData = new FormData(e.currentTarget);
      const formUserId = formData.get("userId");
      if (!formUserId) {
        console.log("ログインまたは新規登録してから登録してください");
        return;
      }

      const body = {
        userId: String(formUserId),
        exerciseId: String(formData.get("exercise")),
        targetWeight: String(formData.get("targetWeight")),
        targetReps: String(formData.get("targetReps")),
        deadline: String(formData.get("deadline")),
      };

      console.log(body.exerciseId);
      if (
        !body.userId ||
        !body.exerciseId ||
        body.targetWeight === "" ||
        !body.targetReps ||
        !body.deadline
      ) {
        console.log("未入力の項目があります");
        return;
      }

      const targetWeightNum = Number(body.targetWeight);
      if (targetWeightNum > 500) {
        console.log("重量は500kg以下にしてください");
        return;
      }
      if (!/^\d+(\.\d{1,2})?$/.test(body.targetWeight)) {
        console.log("重量は小数点2桁までです");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/record/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log("記録成功🎉");
      router.refresh();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="rounded-xl bg-gray-500">
            <p className="flex items-center justify-center h-[50px] w-[100px] text-sm font-bold text-white">
              登録中...
            </p>
          </div>
        </div>
      )}
      <button onClick={handleClick_true} className="font-bold">
        目標設定↗️
      </button>

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
                  name="targetWeight"
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
                  name="targetReps"
                  className="w-full ronded border border-gray-300 px-3 py-2"
                >
                  <option value="">選択してください</option>
                  {Array.from({ length: 30 }, (_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="pb-3">
                <a className="pb-1 block text-sm font-medium">期限</a>
                <input
                  name="deadline"
                  type="date"
                  className="w-full ronded border border-gray-300 px-3 py-2"
                />
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
