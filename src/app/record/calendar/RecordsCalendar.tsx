"use client";

// src/app/record/calendar/RecordsCalendar.tsx
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

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
  const [date, setDate] = useState<Date | null>(null);
  const [selectedTrainings, setSelectedTrainings] = useState<Training[]>([]);

  const fetchTrainingsByDate = async (selectedDate: Date) => {
    if (!userId) return;

    const res = await fetch(
      `/api/trainings/by-date?userId=${userId}&date=${selectedDate.toISOString()}`
    );

    if (!res.ok) {
      console.error("Failed to fetch trainings by date");
    }

    const data = await res.json();
    setSelectedTrainings(data);
  };

  useEffect(() => {
    const today = new Date();
    setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate())); //"Hydration Error"対策
    fetchTrainingsByDate(today); //初期描画のために追加
  }, []);

  if (!date) {
    return null; //一瞬だけ何も表示しない
  }

  //ユーザーのトレーニング記録数が増えた場合、下記の処理はAPIに移行する(ここでAPIを呼ぶ)
  // const selectedTrainings = trainings.filter((training) => {
  //   const trainingDate = new Date(training.createdAt);  //⚫︎new Date(training.createdAt)はlocal(日本時間)に変換して代入している

  //   return (
  //     //local(日本時刻)で比較
  //     trainingDate.getFullYear() === date.getFullYear() &&
  //     trainingDate.getMonth() === date.getMonth() &&
  //     trainingDate.getDate() === date.getDate()
  //   );
  // });

  const sortedTrainings = [...selectedTrainings].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="flex justify-center">
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <div className="flex justify-center">
          <Calendar
            locale="ja-JP"
            onChange={(value) => {
              const selectedDate = value as Date;
              setDate(selectedDate);
              fetchTrainingsByDate(selectedDate);
            }}
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
          {sortedTrainings.length === 0 ? (
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
              {sortedTrainings.map((training) => (
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
