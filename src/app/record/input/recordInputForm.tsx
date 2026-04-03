"use client";

import { useRouter } from "next/navigation";
// src/app/record/input/recordInputForm.tsx
// Client Component ユーザー側の表示
//⚫︎useStateはクライアント専用。これがファイルを分ける理由です。

import { useState } from "react";

//ExerciseCategoryテーブルの型定義
type ExerciseCategory = {
  id: number;
  name: string;
};

//Exrcisesテーブルの型定義
type Exercises = {
  id: number;
  name: string;
  categoryId: number;
};

//RecordInputFormの引数の型定義
type Props = {
  exerciseCategory: ExerciseCategory[];
  exercises: Exercises[];
  userId: number | null;
};

export default function RecordInputForm({
  exerciseCategory,
  exercises,
  userId,
}: Props) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページリロード防止

    const formData = new FormData(e.currentTarget);

    const formUserId = formData.get("inputUserId");
    if ( !formUserId ){
      setError("ログインまたは新規登録してから登録してください");
      console.log("ログインまたは新規登録してから登録してください");
      return;
    }

    const body = {
      userId:     String(formUserId),
      exerciseId: String(formData.get("exercises")),
      weight:     String(formData.get("weight")),
      reps:       String(formData.get("reps")),
    }

    if( !body.userId || !body.exerciseId || body.weight==="" || !body.reps ){
      setError("未入力の項目があります");
      console.log("未入力の項目があります");
      return;
    }

    try {
      const res = await fetch("/api/record/input", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok){
        setError("トレーニング記録に失敗しました");
        return;
      }

      setError("");
      router.replace("/record/input");
      router.refresh();
    } catch (error){
      console.error(error);
      setError("通信に失敗しました");
    }
    
  }
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">記録</a>

        <form onSubmit={handleSubmit}>
          <div className="w-[300px] h-[400px] mt-[20px] rounded border border-gray-500">
            <input type="hidden" name="inputUserId" value={userId ?? ""} />

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

            <div className="flex items-center mt-[50px] ml-[10px]">
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
            <div className="flex items-center mt-[50px] ml-[10px]">
              <a className="font-bold">重さ</a>
              <input
                name="weight"
                type="number"
                placeholder=" 自重の場合は0を選択"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[50px] ml-[10px]">
              <a className="font-bold">回数</a>
              <select
                name="reps"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              >
                <option value="">選択してください</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-[50px] mr-[20px]">
              <button type="submit" className="font-bold">記録</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
