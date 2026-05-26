"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

//ExerciseCategoryテーブルの型定義
type ExerciseCategory = {
  id: string;
  name: string;
};

//Exrcisesテーブルの型定義
type Exercises = {
  id: string;
  name: string;
  categoryId: string;
};

//RecordInputFormの引数の型定義
type Props = {
  exerciseCategory: ExerciseCategory[];
  exercises: Exercises[];
  userId: string | null;
};

export default function RecordInputform({
  exerciseCategory,
  exercises,
  userId,
}: Props) {
  const router = useRouter();
  const [inputTraining, setInputTraining] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //------------------成功メッセージを表示------------------
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setMessage("");
      router.replace("/");
      router.refresh();
    }, 1200);

    return () => window.clearTimeout(timeoutId); //⚫︎timeoutの予約削除
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

  //------------------「記録するボタン」押下時の処理------------------
  const handleClick_true = () => {
    setInputTraining(true);
  };

  const handleClick_false = () => {
    setInputTraining(false);
  };

  //「保存ボタン」押下時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const formUserId = formData.get("userId");
      if (!formUserId) {
        console.log("ログインまたは新規登録してください");
        setError("ログインまたは新規登録してから登録してください");
        console.log(userId);
        return;
      }

      const body = {
        userId: String(formUserId),
        exerciseId: String(formData.get("exercises")),
        weight: String(formData.get("weight")),
        reps: String(formData.get("reps")),
      };

      if (
        body.userId === "" ||
        body.exerciseId === "" ||
        body.weight === "" ||
        !body.reps
      ) {
        console.log("未入力の項目があります");
        setError("未入力の項目があります");
      }

      const weightNum = Number(body.weight);
      if (weightNum > 500) {
        console.log("重量は500kg以下にしてください");
        setError("重量は500kg以下にしてください");
        return;
      }
      if (!/^\d+(\.\d{1,2})?$/.test(body.weight)) {
        console.log("重量は小数点2桁までです");
        setError("重量は小数点2桁までです");
        return;
      }

      setLoading(true);
      const res = await fetch("/api/record/input", {
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
      setMessage("記録成功🎉");
      router.refresh();
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError("通信に失敗しました");
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
        記録する🖊️
      </button>

      {inputTraining && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-90 rounded-xl bg-white p-4 shadow-lg">
            <h2 className="pb-4 text-lg font-bold">記録する</h2>
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
                  name="exercises"
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
                  placeholder="自重の場合は0を選択"
                  className="w-full rounded border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="pb-3">
                <a className="pb-1 block text-sm font-medium">回数</a>
                <select
                  name="reps"
                  className="w-full rounded border border-gray-300 px-3 py-2"
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
              {message && (
                <div className="fixed inset-0 z-60 flex items-center justify-center animate-slideIn">
                  <div className="rounded-xl bg-green-500 py-3 text-white shadow-lg">
                    {message}
                  </div>
                </div>
              )}
              {error && (
                <div className="fixed inset-0 z-60 flex items-center justify-center animate-slideIn">
                  <div className="rounded-xl bg-red-500 py-3 text-white shadow-lg">
                    {error}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
