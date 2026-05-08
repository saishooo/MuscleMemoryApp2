"use client";

// src/app/record/graphs/glaphOutput.tsx
// 記録を表示する

import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useState } from "react";

//Trainingテーブルの型定義
type Training = {
  id: string;
  sessionId: string;
  exercise: {
    id: string;
    name: string;
  };
  exerciseId: string;
  weight: number;
  reps: number;
  createdAt: Date;
  updatedAt: Date;
};

type ExerciseCategory = {
  id: string;
  name: string;
};

//Exercisesテーブルの型定義
type Exercises = {
  id: string;
  name: string;
  categoryId: string;
};

//引数の型定義
type Props = {
  trainings: Training[];
  exerciseCategory: ExerciseCategory[];
  exercises: Exercises[];
  loginUserId: string | null;
};

export default function GlaphOutput({
  trainings,
  exerciseCategory,
  exercises,
  loginUserId,
}: Props) {
  const [selectedCategory, setSelectCategory] = useState("");
  const [graphData, setGraphData] = useState<Training[]>([]);

  const data = [
    { day: "月", weight: 60 },
    { day: "火", weight: 62.5 },
    { day: "水", weight: 65 },
  ];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      if (!loginUserId) {
        console.log("ログインまたは新規登録してから描写ボタンを押してください");
        return;
      }

      const body = {
        userId: String(loginUserId),
        exerciseId: String(formData.get("exercise")),
      };

      if (!body.userId || !body.exerciseId) {
        console.log(
          "ログインまたは新規登録してから描写ボタンを押してしてください"
        );
        return;
      }

      //⚫︎fetchの箇所の意味
      const res = await fetch(
        `/api/graph?userId=${loginUserId}&exerciseId=${body.exerciseId}`
      );

      const dataCheck = await res.json();
      console.log(dataCheck);
      setGraphData(dataCheck.trainings);

      if (!res.ok) {
        console.log("更新に失敗しました");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <a className="font-bold w-[50px]">部位:</a>
            <select
              name="exerciseCategory"
              className="w-[200px]"
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option value="">選択してください</option>
              {exerciseCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex mt-[10px]">
            <a className="font-bold w-[50px]">種目:</a>
            <select name="exercise" className="w-[200px]">
              <option value="">選択してください</option>
              {exercises
                .filter(
                  (exercise) => String(exercise.categoryId) === selectedCategory
                )
                .map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-center mt-[15px]">
            <button type="submit" className="w-[50px] border rounded font-bold">
              描写
            </button>
          </div>
        </form>
      </div>

      <div className="mt-[25px]">
        <LineChart width={400} height={300} data={graphData}>
          <XAxis
            dataKey="createdAt"
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString("ja-JP", {
                month: "numeric",
                day: "numeric",
              })
            }
          />
          <YAxis />
          <Line type="monotone" dataKey="weight" />
        </LineChart>
      </div>
    </div>
  );
}
