"use client";

import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

//パスワードを忘れた場合の処理
//src/app/password/page.tsx

export default function PasswordForget_page() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //------------------成功メッセージを表示------------------
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      window.location.reload();
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

  //------------------パスワード忘れた時の処理------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページリロード防止
    setMessage("");
    setError("");

    try {
      const formData = new FormData(e.currentTarget);

      const l_username = String(formData.get("username"));
      const l_email = String(formData.get("email"));

      if (l_username === "" || l_email === "") {
        setError("ユーザーIDまたはemailが未入力です");
        return;
      }

      const body = {
        username: l_username,
        email: l_email,
      };

      setLoading(true); //ローディング開始

      const res = await fetch("/api/account/password/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "URL送信に失敗しました");
        setLoading(false);
        return;
      }

      setError("");
      setLoading(false); //ローディング終了
      setMessage("パスワード変更URLを送信しました");
    } catch (error) {
      setError("通信エラー");
    }
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-xl bg-gray-500">
            <p className="flex items-center justify-center h-12 w-25 text-sm font-bold text-white">
              処理中...
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center mt-10">
        <p className="font-bold text-xl">パスワードを忘れた場合</p>
        <div className="relative w-95 h-50 mt-5 rounded border border-gray-500">
          <form onSubmit={handleSubmit}>
            <div className="relative flex mt-8 ml-2">
              <div className="relative flex">
                <p className="font-bold w-38">ユーザーID</p>
                <input
                  name="username"
                  type="text"
                  className="border rounded w-50"
                />
              </div>
            </div>
            <div className="relative flex mt-8 ml-2">
              <div className="relative flex">
                <p className="font-bold w-38">メールアドレス</p>
                <input
                  name="email"
                  type="text"
                  placeholder=" @email.com"
                  className="border rounded w-50"
                />
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <div className="flex justify-center items-center rounded border border-gray-500 w-30 h-10 shadow-lg">
                <Link href="/auth/login" className="font-bold">
                  戻る
                </Link>
              </div>

              <div className="pl-4">
                <button
                  type="submit"
                  className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg bg-green-400"
                >
                  送信
                </button>
              </div>
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
          </form>
        </div>
      </div>
    </div>
  );
}
