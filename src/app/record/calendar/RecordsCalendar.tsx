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

  //ブラウザコンポーネントではローカル時間で扱い、サーバーに送る時にUTCに変換して送る。
  const fetchTrainingsByDate = async (selectedDate: Date) => {
    if (!userId) return;

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const dateText = `${year}-${month}-${day}`;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const res = await fetch(
      `/api/trainings/by-date?userId=${userId}&date=${dateText}&timeZone=${encodeURIComponent(timeZone)}`
    );

    if (!res.ok) {
      console.error("Failed to fetch trainings by date");
    }

    const data = await res.json();
    setSelectedTrainings(data);
  };

  //"Hydration Error"対策
  useEffect(() => {
    const today = new Date();
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    setDate(todayDate);
    fetchTrainingsByDate(todayDate); //初期描画のために追加
  }, []); //⚫︎[]だと初回のみ実行

  if (!date) {
    return null; //一瞬だけ何も表示しない
  }

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
