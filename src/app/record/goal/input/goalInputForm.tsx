"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// src/app/record/goal/input/goalInputForm.tsx

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //------------------成功メッセージを表示------------------
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setMessage("");
      router.replace("/record/goal/input");
      router.refresh();
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [message, router]);

  //------------------エラーメッセージを表示------------------
  useEffect(() => {
    if (!error) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setError("");
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [error]);

  //------------------ボタン押下時の処理------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページリロード防止
    setMessage("");
    setError("");

    try {
      const formData = new FormData(e.currentTarget);

      const formUserId = formData.get("inputUserId");
      if (!formUserId) {
        setError("ログインまたは新規登録してから登録してください");
        console.log("ログインまたは新規登録してから登録してください");
        return;
      }

      const body = {
        userId: String(formUserId),
        exerciseId: String(formData.get("exercises")),
        targetWeight: String(formData.get("targetWeight")),
        targetReps: String(formData.get("targetReps")),
        deadline: String(formData.get("deadline")),
      };

      if (
        !body.userId ||
        !body.exerciseId ||
        body.targetWeight === "" ||
        !body.targetReps ||
        !body.deadline
      ) {
        setError("未入力の項目があります");
        console.log("未入力の項目があります");
        return;
      }

      setLoading(true); //ローディング開始

      const res = await fetch("/api/record/goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setError("目標登録に失敗しました");
        return;
      }

      setError("");
      setLoading(false); //ローディング終了
      setMessage("登録成功🎉");
    } catch (error) {
      console.error(error);
      setError("通信に失敗しました");
    }
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-xl bg-gray-500">
            <p className="flex items-center justify-center h-[50px] w-[100px] text-sm font-bold text-white">
              登録中...
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">目標の登録</a>

        <form onSubmit={handleSubmit}>
          <div className="w-[300px] h-[400px] mt-[20px] rounded border border-gray-500">
            <input type="hidden" name="inputUserId" value={userId ?? ""} />

            <div className="flex items-center mt-[37px] ml-[10px]">
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

            <div className="flex items-center mt-[37px] ml-[10px]">
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

            {/* ◼︎今のままだとUXが悪い　改善必要 */}
            <div className="flex items-center mt-[37px] ml-[10px]">
              <a className="font-bold">重さ</a>
              <input
                name="targetWeight"
                type="number"
                placeholder=" 自重の場合は0を選択"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[37px] ml-[10px]">
              <a className="font-bold">回数</a>
              <select
                name="targetReps"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              >
                <option value="">選択してください</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center mt-[37px] ml-[10px]">
              <a className="font-bold">期限</a>
              <input
                name="deadline"
                type="date"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex justify-end mt-[37px] mr-[20px]">
              <button type="submit" className="font-bold">
                登録
              </button>
            </div>

            {message && (
              <div className="absolute left-1/2 top-[145px] z-50 -translate-x-1/2 animate-slideIn">
                <div className="rounded-xl bg-green-500 py-3 text-white shadow-lg">
                  {message}
                </div>
              </div>
            )}
            {error && (
              <div className="absolute left-1/2 top-[145px] z-50 -translate-x-1/2 animate-slideIn">
                <div className="rounded-xl bg-red-500 py-3 text-white shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
