"use client";

// src/app/record/graphs/glaphOutput.tsx
// 記録を表示する

import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useRouter } from "next/navigation";

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

//Exercisesテーブルの型定義
type Exercises = {
  id: string;
  name: string;
  categoryId: string;
};

//引数の型定義
type Props = {
  trainings: Training[];
  exercises: Exercises[];
  loginUserId: string | null;
};

export default function GlaphOutput({
  trainings,
  exercises,
  loginUserId,
}: Props) {
  const data = [
    { day: "月", weight: 60 },
    { day: "火", weight: 62.5 },
    { day: "水", weight: 65 },
  ];

  return (
    <div>
      <p className="flex flex-col items-center">部位:</p>
      <p className="flex flex-col items-center">種目:</p>
      <LineChart width={400} height={300} data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Line type="monotone" dataKey="weight" />
      </LineChart>
    </div>
  );
}
