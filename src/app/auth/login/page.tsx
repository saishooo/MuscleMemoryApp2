"use client";

//src/app/auth/login/page.tsx
//ログインページ

import { useRouter } from "next/navigation"; //⚫︎ページ遷移を操作するためのフック
import { useEffect, useState } from "react"; //⚫︎状態を保存し、画面を更新する

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  //------------------成功メッセージを表示------------------
  //⚫︎useEffect 画面が変わった時に、何か処理をする
  //⚫︎message,routerが変更されたら実行する
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.replace("/"); //⚫︎ページの置き換え（履歴を残さずに移動）
      router.refresh(); //⚫︎再読み込み　これによって、cookieとユーザー名の更新をする
    }, 600);

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

  //------------------ログインボタン押下時の処理------------------
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

      setLoading(true); //ローディング開始

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
        setLoading(false);
        return;
      }

      setError("");
      setLoading(false); //ローティング終了
      setMessage("ログイン成功 🎉");
    } catch {
      setError("通信エラー");
    }
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-xl bg-gray-500">
            <p className="flex items-center justify-center h-12 w-25 text-sm font-bold text-white">
              ログイン中...
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center mt-10">
        <a className="font-bold text-xl">ログイン</a>

        <form onSubmit={handleSubmit}>
          <div className="relative w-87 h-67 mt-5 rounded border border-gray-500">
            <div className="flex items-center mt-8 ml-2">
              <a className="font-bold w-[px]">ユーザーID</a>
              <input
                name="username"
                type="text"
                placeholder=" IDを入力"
                className="w-50 mr-2 ml-auto border rounded"
              />
            </div>

            <div className="relative flex items-center mt-15 ml-2">
              <a className="font-bold">パスワード</a>
              <input
                name="password"
                type={show ? "text" : "password"}
                className="w-50 mr-2 ml-auto border rounded"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShow(!show)}
              >
                {show ? "非表示" : "表示"}
              </button>
            </div>

            <div className="flex justify-end mt-15 mr-4">
              <button
                type="submit"
                className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
              >
                ログイン
              </button>
            </div>

            {message && (
              <div className="fixed inset-0 z-50 flex items-center justify-center animate-slideIn">
                <div className="rounded-xl bg-green-500 px-4 py-3 text-white shadow-lg">
                  {message}
                </div>
              </div>
            )}

            {error && (
              <div className="fixed inset-0 z-50 flex items-center justify-center animate-slideIn">
                <div className="rounded-xl bg-red-500 px-4 py-3 text-white shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
