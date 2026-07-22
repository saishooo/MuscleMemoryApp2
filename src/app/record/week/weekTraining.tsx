"use client";

import { getDate, getDay } from "date-fns";
import { Istok_Web } from "next/font/google";
import Image from "next/image";

//Recordテーブルの型定義
type workoutSessions = {
  id: string;
  userId: string | null;
  date: Date;
};

type Props = {
  workoutSessions: workoutSessions[] | null;
};

export default function WeekTraining({ workoutSessions }: Props) {
  //workoutSessionsに格納されているdateを取り出す
  const dates = workoutSessions?.map((session) => {
    const date = new Date(session.date);
    date.setHours(0, 0, 0, 0);
    return date;
  });
  console.log(dates);

  const today = new Date(); //今日の日付
  const monday = new Date(today); //月曜日の定義をDateで作成
  const day = today.getDay(); //今日の曜日を取得

  const diff = day === 0 ? -6 : 1 - day; //月曜日の日付を割り出すための、今日の日付からの差分を出す

  monday.setDate(today.getDate() + diff); //今日の日付に差分を加算し、月曜日を特定

  //月曜日から日曜日までの日付を配列に格納
  const week = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  console.log(week);

  const weekLabels = ["月", "火", "水", "木", "金", "土", "日"];

  return (
    <div className="h-45 w-90 border rounded-xl shadow">
      <p className="w-full h-10 pl-4 pt-4 font-bold">今週のトレーニング</p>
      <div className="flex justify-evenly pt-7">
        {week.map((day, index) => {
          const isTrained = dates?.some((date) => {
            return date.getTime() === day.getTime();
          });

          return (
            <div
              key={day.toISOString()}
              className="flex flex-col items-center gap-2"
            >
              <p>{weekLabels[index]}</p>
              <Image
                src={isTrained ? "/check2.png" : "/uncheck.png"}
                alt={isTrained ? "トレーニング済み" : "未実施"}
                width={40}
                height={40}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
