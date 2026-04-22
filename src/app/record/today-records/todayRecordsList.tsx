"use client";

// src/app/record/today-records/todayRecordsList.tsx
// 今日登録したトレーニングを表示する

//⚫︎useRef 再レタリングせずデータ補保持することができる
//⚫︎router.refresh() 画面を再取得して最新データを表示
import { useEffect, useRef, useState } from "react";
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

export default function TodayRecordsList({
  trainings,
  exercises,
  loginUserId,
}: Props) {
  const router = useRouter();
  const [swipedId, setSwipedId] = useState<string | null>(null); //今スワイプされ、削除ボタンが出ている行のIDを記録
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null); //長押し判定用タイマー
  const startX = useRef(0); //指で触り始めたx座標
  const moved = useRef(false); //動いたかどうかの判定（動いていない→長押し　動いた→スワイプ）
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //------------------成功メッセージを表示------------------
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setMessage("");
      router.replace("/record/input");
      router.refresh();
    }, 1200);

    return () => window.clearTimeout(timeoutId); //⚫︎timeoutの予約削除
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

  //------------------押下した（指が触れた）瞬間の処理------------------
  const handlePressStart = (training: Training) => {
    moved.current = false; //⚫︎currentとはuseRefの中身

    //600ms経って動いていなければ長押し判定
    //setTimeoutとはjavaScriptの「タイマー予約機能」
    pressTimer.current = setTimeout(() => {
      if (!moved.current) {
        //動いていない(moved.currentがfalse)ならば実行
        console.log("編集対象", training);
      }
    }, 600);
  };

  //------------------押下をやめた（指を離した）瞬間の処理------------------
  const handlePressEnd = () => {
    //時間をリセット
    if (pressTimer.current) {
      //pressTimerがnullでなければ実行
      clearTimeout(pressTimer.current); //予約したタイマーを停止する
      pressTimer.current = null; //初期値に戻す
    }
  };

  //------------------指が最初に触れた位置の記録と長押し判定スタート------------------
  //スマホだけ削除と編集ができる状態
  //⚫︎React.TouchEvent<HTMLDivElement> タッチした情報（指の位置,何本指か,どの要素を触ったか）
  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    training: Training
  ) => {
    //⚫︎e.touches[0] 今触れている１本目の指
    //⚫︎.clientX 画面の横座標
    startX.current = e.touches[0].clientX; //触れ始めた位置の記録

    handlePressStart(training); //長押しカウントスタート
  };

  //------------------10px以上動いたらスワイプと判断------------------
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX; //今の指の位置

    //Math.abs 絶対値を見る→移動距離だけを見るため
    if (Math.abs(currentX - startX.current) > 10) {
      //10以上大きかったら指が動いたと判定
      moved.current = true;
      handlePressEnd(); //長押しカウントリセット
    }
  };

  //------------------指を離した瞬間------------------
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>, id: string) => {
    const endX = e.changedTouches[0].clientX; //指を離した瞬間の横座標
    const diff = startX.current - endX;
    
    if (diff > 60) {
      //左へ60px以上動いたかの判定
      setSwipedId(id); //削除ボタンを表示
    } else if (diff < -40) {
      //右に40px以上動いたか判定
      setSwipedId(null); //削除ボタンを非表示
    }

    handlePressEnd(); //長押しカウントリセット
  };

  //------------------削除ボタン押下時の処理------------------
  const handleDelete = async (training: Training) => {
    setMessage("");
    setError("");
    try {
      const body = {
        userId: String(loginUserId),
        trainingId: String(training.id),
      };

      if (typeof body.userId !== "string" || body.userId === null) {
        setError("不正なIDです");
        console.log("不正なIDです");
        return;
      }

      setLoading(true); //ローティング開始

      const res = await fetch("/api/list/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setError("削除に失敗しました");
        console.error("削除に失敗しました");
        return;
      }

      setError("");
      setLoading(false); //ローディング終了
      setSwipedId(null);
      setMessage("削除成功🎉");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("通信に失敗しました");
    }
  };

  if (trainings.length === 0) {
    return <p>記録がありません</p>;
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
      {trainings.map((t) => (
        <div
          key={t.id}
          className="relative mt-[10px] overflow-hidden rounded-md"
        >
          <div className="absolute inset-y-0 -right-20 flex w-[80px] items-center justify-center bg-red-500">
            <button
              type="button"
              className="h-full w-full text-white"
              onClick={() => handleDelete(t)}
            >
              削除
            </button>
          </div>

          {message && (
            <div className="absolute left-1/2 top-[145px] z-50 -translate-x-1/2 animate-slideIn">
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

          <div
            className={`relative z-10 flex w-full bg-white transition-transform duration-200 
                ${swipedId === t.id ? "-translate-x-[80px]" : "translate-x-0"}`}
            onMouseDown={() => handlePressStart(t)} //onMouseDown マウスボタンを押した瞬間
            onMouseUp={handlePressEnd} //onMouseUp マウスボタンを離した瞬間
            onMouseLeave={handlePressEnd} //onMouseLeave 押したままマウスが要素外へ出た
            onTouchStart={(e) => handleTouchStart(e, t)} //onTouchStart 指が触れた瞬間
            onTouchMove={handleTouchMove} //onTouchMove 指を画面上で動かしている途中
            onTouchEnd={(e) => handleTouchEnd(e, t.id)} //onTouchEnd 指を離した瞬間
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
