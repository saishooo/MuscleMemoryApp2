"use client";

// src/app/record/calendar/RecordsCalendar.tsx
import { useEffect, useState } from "react";
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
  const [training, setTrainings] = useState<Training[]>([]);
  const [trainingDates, setTrainingDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrainingDates = async () => {
      const res = await fetch("/api/training/dates");
      const data = await res.json();
      setTrainingDates(data);
    };
  }, []);

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
      </div>
    </div>
  );
}
