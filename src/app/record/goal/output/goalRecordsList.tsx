"use client";

// src/app/record/goal/output/goalRecordsList.tsx
// 設定した目標を表示する

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";

//Goalテーブルの型定義
type Goal = {
  id: string;
  userId: string;
  exercise: {
    id: string;
    name: string;
  };
  exerciseId: string;
  targetWeight: number;
  targetReps: number;
  deadline: Date | null;
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
  goals: Goal[];
  exercises: Exercises[];
  loginUserId: string | null;
};

export default function GoalRecordsList({
  goals,
  exercises,
  loginUserId,
}: Props) {
  const router = useRouter();
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startX = useRef(0);
  const moved = useRef(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editDeadline, setEditingDeadline] = useState("");
  const [editTargetWeight, setEditTargetWeight] = useState("");
  const [editTargetReps, setEditTargetReps] = useState("");

  //------------------成功メッセージを表示------------------
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setMessage("");
      router.refresh();
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [message, router]);

  //------------------エラーメッセージを表示------------------
  useEffect(() => {
    if (!error) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setError("");
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [error]);

  //------------------押下時の処理------------------
  const handlePressStart = (goal: Goal) => {
    moved.current = false;

    pressTimer.current = setTimeout(() => {
      if (!moved.current) {
        console.log("編集対象", goal);
        setEditingGoal(goal);
        setEditingDeadline(String(goal.deadline));
        setEditTargetWeight(String(goal.targetWeight));
        setEditTargetReps(String(goal.targetReps));
      }
    }, 600);
  };

  //------------------押下時をやめた瞬間の処理------------------
  const handlePressEnd = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  //------------------指が触れた位置を記録し、長押しとかどうかを判定------------------
  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    goal: Goal
  ) => {
    startX.current = e.touches[0].clientX; //触れ始めた瞬間の横座標
    handlePressStart(goal); //長押しカウントスタート
  };

  //------------------10px以上動いたらスワイプと判断-----------------
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX; //今の指の横座標

    if (Math.abs(currentX - startX.current) > 10) {
      moved.current = true;
      handlePressEnd(); //長押しカウントリセット
    }
  };

  //------------------指を離した瞬間の処理------------------
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>, id: string) => {
    const endX = e.changedTouches[0].clientX; //指を離した瞬間の横座標
    const diff = startX.current - endX;

    if (diff > 60) {
      setSwipedId(id); //削除ボタンを表示
    } else if (diff < -40) {
      setSwipedId(null); //削除ボタンを非表示
    }

    handlePressEnd(); //長押しカウントリセット
  };

  //------------------編集内容の保存処理-----------------
  const handleUpdate = async () => {
    if (!editingGoal) {
      return;
    }

    setMessage("");
    setError("");

    if (!loginUserId) {
      setError("ログイン情報がありません");
      return;
    }
    if (
      !/^\d+(\.\d{1,2})?$/.test(editTargetWeight) ||
      Number(editTargetWeight) > 500
    ) {
      setError("重量は500kg以下、小数点2桁までで入力してください");
      return;
    }
    if (!/^\d+$/.test(editTargetReps)) {
      setError("回数は整数で入力してください");
      return;
    }

    try {
      setLoading(true);

      const body = {
        type: "goal",
        userId: String(loginUserId),
        goalId: editingGoal.id,
        deadline: String(editDeadline),
        targetWeight: Number(editTargetWeight),
        targetReps: Number(editTargetReps),
      };

      const res = await fetch("/api/record/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setError("更新に失敗しました");
        return;
      }
      setEditingGoal(null);
      setLoading(false);
      setEditingDeadline("");
      setEditTargetWeight("");
      setEditTargetReps("");
      setMessage("更新成功🎉");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("通信に失敗しました");
    }
  };

  //------------------削除ボタン押下時の処理------------------
  const handleDelete = async (goal: Goal) => {
    setMessage("");
    setError("");
    try {
      const body = {
        type: "goal",
        userId: String(loginUserId),
        goalId: String(goal.id),
      };
      if (typeof body.userId !== "string" || body.userId === null) {
        setError("不正なIDです");
        return;
      }

      setLoading(true); //ローディング開始

      const res = await fetch("/api/record/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setError("削除に失敗しました");
        return;
      }

      setError("");
      setLoading(false); //ローディング終了
      setSwipedId(null);
      setMessage("削除成功🎉");
      router.refresh();
    } catch (error) {
      setError("通信に失敗しました");
    }
  };

  if (goals.length === 0) {
    return <p>目標がありません</p>;
  }

  return (
    <div className="h-[340px] overflow-y-auto">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-xl bg-gray-500">
            <p className="flex items-center justify-center h-[50px] w-[100px] text-sm font-bold text-white">
              削除中...
            </p>
          </div>
        </div>
      )}
      {message && (
        <div className="absolute left-1/2 top-[145px] z-50 -translate-x-1/2 animates-slideIn">
          <div className="rounded-xl bg-green-500 py-3 text-white shadow-lg">
            {message}
          </div>
        </div>
      )}
      {error && (
        <div className="absolute left-1/2 top-[145px] z-50 -translate-x-1/2 animate-slideIn">
          <div className="rounded-xl bg-red-500 py-3 text-white shadow-lg">
            {error}
          </div>
        </div>
      )}
      {goals.map((t) => {
        let formattedDate = "";

        if (t.deadline !== null) {
          const deadline = new Date(t.deadline);
          formattedDate = `${deadline.getMonth() + 1}月${deadline.getDate()}日`;
        }

        return (
          <div
            key={t.id}
            className="relative mt-[10px] overflow-hidden rounded-md"
          >
            <div className="absolute inset-y-0 -right-0 flex w-[80px] items-center justify-center bg-red-500">
              <button
                type="button"
                className="h-full w-full text-white"
                onClick={() => handleDelete(t)}
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
              <p className="w-[90px] ml-[7px]">{formattedDate}</p>
              <p className="w-[180px] ml-[5px]">{t.exercise.name}</p>
              <p className="w-[50px] ml-[5px]">{t.targetWeight}</p>
              <p className="w-[50px] ml-[15px]">{t.targetReps}</p>
            </div>
          </div>
        );
      })}

      {editingGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[360px] rounded-xl bg-white p-4 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">記録を編集</h2>
            <p className="mb-3 text-sm text-gray-700">
              {editingGoal.exercise.name}
            </p>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">期日</label>
              <input
                type="date"
                value={editDeadline}
                onChange={(e) => setEditingDeadline(e.target.value)}
                className="block w-full min-w-0 max-w-full appearance-none rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">重量</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="500"
                value={editTargetWeight}
                onChange={(e) => setEditTargetWeight(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium">回数</label>
              <input
                type="number"
                step="1"
                min="1"
                value={editTargetReps}
                onChange={(e) => setEditTargetReps(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="rounded border border-gray-300 px-4 py-2"
                onClick={() => {
                  setEditingGoal(null);
                  setEditingDeadline("");
                  setEditTargetWeight("");
                  setEditTargetReps("");
                }}
              >
                キャンセル
              </button>
              <button
                type="button"
                className="rounded bg-blue-500 px-4 py-2 text-white"
                onClick={handleUpdate}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
