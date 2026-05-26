"use client";

// src/app/record/calendar/RecordsCalendar.tsx
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

type Props = {
  trainings: Training[];
  userId: string | null;
};

export default function RecordsCalendar({ trainings, userId }: Props) {
  const [date, setDate] = useState(new Date());

  const selectedTrainings = trainings.filter((training) => {
    const trainingDate = new Date(training.createdAt);

    return (
      trainingDate.getFullYear() === date.getFullYear() &&
      trainingDate.getMonth() === date.getMonth() &&
      trainingDate.getDate() === date.getDate()
    );
  });

  return (
    <div className="flex justify-center">
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <div className="flex justify-center">
          <Calendar
            locale="ja-JP"
            onChange={(value) => setDate(value as Date)}
            value={date}
          />
        </div>
        <p className="pt-4 text-center">
          {date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}{" "}
          の記録
        </p>

        <div className="pt-2">
          {selectedTrainings.length === 0 ? (
            <p className="flex justify-center items-center h-30 text-center text-gray-500">
              この日の記録はありません
            </p>
          ) : (
            <div className="space-y-1">
              <div className="flex mt-2">
                <p className="w-62 pl-2 font-bold">トレーニング</p>
                <p className="w-16 text-center font-bold">重量</p>
                <p className="w-16 text-center font-bold">回数</p>
              </div>
              {selectedTrainings.map((training) => (
                <div key={training.id} className="flex w-full">
                  <p className="w-62 pl-2">{training.exercise.name}</p>
                  <p className="w-14 pl-2 text-center">{training.weight}</p>
                  <p className="w-16 pl-3 text-center">{training.reps}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
