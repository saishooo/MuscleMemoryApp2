"use client";

//src/app/auth/login/page.tsx
//ログインページ

import { useRouter } from "next/navigation"; //⚫︎ページ遷移を操作するためのフック
import { useEffect, useState } from "react"; //⚫︎状態を保存し、画面を更新する

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //⚫︎useEffect 画面が変わった時に、何か処理をする
  //⚫︎message,routerが変更されたら実行する
  //成功メッセージを表示
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.replace("/record"); //⚫︎ページの置き換え（履歴を残さずに移動）
      router.refresh(); //⚫︎再読み込み　これによって、cookieとユーザー名の更新をする
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [message, router]);

  //エラーメッセージを表示
  useEffect(() => {
    if (!error) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setError("");
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [error]);

  //ログインボタン押下時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページのリロードを防止
    setMessage("");
    setError("");

    try {
      //formの中身を全て取得する
      const formData = new FormData(e.currentTarget);

      const body = {
        username: String(formData.get("username")),
        password: String(formData.get("password")),
      };

      //APIにリクエストを送信
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //APIのレスポンスを受け取る
      const data = await res.json();
      console.log(data);

      //resがなければ、ログイン失敗
      if (!res.ok) {
        setError(data.error ?? "ログインに失敗しました");
        return;
      }

      setError("");
      setMessage("ログイン成功 🎉");
    } catch {
      setError("通信エラー");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">ログイン</a>

        <form onSubmit={handleSubmit}>
          <div className="relative w-[350px] h-[270px] mt-[20px] rounded border border-gray-500">
            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">ユーザーID</a>
              <input
                name="username"
                type="text"
                placeholder=" IDを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">パスワード</a>
              <input
                name="password"
                type="password"
                placeholder=" パスワードを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex justify-end mt-[60px] mr-[20px]">
              <button type="submit" className="font-bold">
                ログイン
              </button>
            </div>

            {message && (
              <div className="absolute left-1/2 top-[145px] z-50 -translate-y-1/2 animate-slideIn">
                <div className="rounded-xl bg-green-500 px-4 py-3 text-white shadow-lg">
                  {message}
                </div>
              </div>
            )}

            {error && (
              <div className="absolute left-1/2 top-[145px] z-50 -translate-y-1/2 animate-slideIn">
                <div className="rounded-xl bg-red-500 px-4 py-3 text-white shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* ⚫︎slideIn 動きの名前 */}
      {/* ⚫︎0.3s 0.3秒で動く */}
      {/* ⚫︎ease-out 最初早くて、最後ゆっくり止まる */}
      {/* ⚫︎transform:translateX(100%) 横に100%分ずらす */}
      {/* ⚫︎opacity: 0; 透明で見えない,  opacity: 1; 完全に見える */}

      <style jsx>{`
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
