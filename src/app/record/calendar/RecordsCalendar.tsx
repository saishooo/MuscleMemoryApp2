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
    <div className="flex justify-center pt-10">
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <Calendar
          locale="ja-JP"
          onChange={(value) => setDate(value as Date)}
          value={date}
        />
        <p className="pt-4 text-center">
          選択日：
          {date.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </p>

        <div className="pt-5">
          {selectedTrainings.length === 0 ? (
            <p className="text-center text-gray-500">
              この日の記録はありません
            </p>
          ) : (
            <div className="space-y-3">
              {selectedTrainings.map((training) => (
                <div
                  key={training.id}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <p className="font-bold">{training.exercise.name}</p>
                  <p className="text-gray-700">
                    {training.weight}kg {training.reps}回
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
