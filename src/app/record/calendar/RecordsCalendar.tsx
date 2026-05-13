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
  loginUserId: string | null;
};

export default function RecordsCalendar({ trainings, loginUserId }: Props) {
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
}
