"use client";

// src/app/record/today-records/todayRecordsList.tsx
// 今日登録したトレーニングを表示する

import { useRef, useState } from "react";
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
};

export default function TodayRecordsList({trainings,exercises}: Props) {
  const router = useRouter();
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startX = useRef(0);
  const moved = useRef(false);

  //押下開始
  const handlePressStart = (training: Training) => {
    moved.current = false;
    pressTimer.current = setTimeout(() => {
      if (!moved.current) {
        console.log("編集対象", training);
      }
    }, 600);
  };

  //押下終了
  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    training: Training
  ) => {
    startX.current = e.touches[0].clientX;
    handlePressStart(training);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX;

    if (Math.abs(currentX - startX.current) > 10) {
      moved.current = true;
      handlePressEnd();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>, id: string) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (diff > 60) {
      setSwipedId(id);
    } else if (diff < -40) {
      setSwipedId(null);
    }

    handlePressEnd();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/training/delete", {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({id}),
    });

    if (!res.ok) {
      console.error("削除に失敗しました");
      return;
    }

    setSwipedId(null);
    router.refresh();
  };


  if (trainings.length === 0) {
    return <p>記録がありません</p>;
  }

  return (
    <div className="h-[340px] overflow-y-auto">
      {trainings.map((t) => (
        <div
          key={t.id}
          className="relative mt-[10px] overflow-hidden rounded-md"
        >
          <div className="absolute inset-y-0 right-0 flex w-[80px] items-center justify-center bg-red-500">
            <button
              type="button"
              className="h-full w-full text-white"
              onClick={() => handleDelete(t.id)}
            >
              削除
            </button>
          </div>

          <div
            className={`relative z-10 flex w-full bg-white transition-transform duration-200 
                ${swipedId === t.id ? "-translate-x-[80px]" : "translate-x-0"}`}
            onMouseDown={() => handlePressStart(t)}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={(e) => handleTouchStart(e, t)}
            onTouchMove={handleTouchMove}
            onTouchEnd={(e) => handleTouchEnd(e, t.id)}
          >
            <p className="w-[180px] ml-[20px]">{t.exercise.name}</p>
            <p className="w-[100px] ml-[50px]">{t.weight}</p>
            <p className="w-[90px] ml-[40px]">{t.reps}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
