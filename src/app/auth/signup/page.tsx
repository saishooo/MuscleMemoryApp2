"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// src/app/auth/signup/page.tsx
// ユーザー登録ページ

export default function SignUpForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  //成功メッセージを表示
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.replace("/record");
      router.refresh();
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

  //登録ボタン押下時の処理
  //フォーム入力をJSONに変換してAPI(POST)に送信
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページのリロード防止
    setMessage("");
    setError("");

    try {
      //formの中身を全て取得する
      const formData = new FormData(e.currentTarget);

      //usernameが英数字か確認する（正規表現でチェック）
      const l_username = String(formData.get("username"));
      //⚫︎正規表現 ^(先頭) $(末尾) a-zA-z0-9(英数字) +(1文字以上)
      const regex = /^[a-zA-Z0-9_.]+$/;
      if (!regex.test(l_username)) {
        setError("ユーザーIDは英数字「.」「_」入力してください");
        return;
      }

      //passwordとconfigpasswordが一致しているかの確認
      const l_password = String(formData.get("password"));
      const l_confirm_password = String(formData.get("confirm_password"));
      if (l_password !== l_confirm_password) {
        setError("パスワードが一致しません");
        console.log("パスワードが一致しません");
        return;
      }

      //⚫︎JSONに送るための必要な値を取り出して、オブジェクト化
      const body = {
        username: String(formData.get("username")),
        nickname: String(formData.get("nickname")),
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        confirm_password: String(formData.get("confirm_password")),
      };

      //⚫︎APIを呼び出し
      //⚫︎fetch APIへ送信
      //⚫︎サーバーへリクエストを送る const res = await fetch( "/api/auth/signup", {
      //⚫︎データを送信することを伝える method: "POST" ,
      //⚫︎JSON形式で送ることを伝える　headers: { "Content-Type" : "application/json", },
      //⚫︎送るデータをJSONに変換　    body: JSON.stringify(body),
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //⚫︎サーバーからのレスポンスをJSONとして受け取る
      const data = await res.json();
      console.log(data);

      //resがなければ登録失敗
      if (!res.ok) {
        setError("新規登録に失敗しました");
        return;
      }

      setError("");
      setMessage("ユーザー登録成功🎉");
    } catch {
      setError("通信エラー");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">新規ユーザー登録</a>

        <form onSubmit={handleSubmit}>
          <div className="relative w-[380px] h-[500px] mt-[20px] rounded border border-gray-500">
            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">ユーザーID</a>
              <input
                name="username"
                type="text"
                placeholder=" ユーザーIDを設定"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">ニックネーム</a>
              <input
                name="nickname"
                type="text"
                placeholder=" 山田太郎"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">メールアドレス</a>
              <input
                name="email"
                type="text"
                placeholder=" @email.com"
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

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">パスワードの確認</a>
              <input
                name="confirm_password"
                type="password"
                placeholder=" 確認用パスワードを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex justify-end mt-[60px] mr-[20px]">
              <button type="submit" className="font-bold">
                登録
              </button>
            </div>
            {message && (
              //⚫︎absolute relativeがついている親の中で自由に基準を決められる
              //⚫︎left-1/2 左から50%の位置に設置(開始位置が真ん中にくる)
              //⚫︎-translate-x-1/2 開始位置を半分だけ左にずらす
              //⚫︎-translate-y-1/2 縦の開始位置を半分だけ上にずらす
              //⚫︎shadow-lg 影をつけて、浮いて見せる
              <div className="absolute left-1/2 top-[145px] z-50 -translate-x-1/2 animate-slideIn">
                <div className="rounded-xl bg-green-500 px-4 py-3 text-white shadow-lg">
                  {message}
                </div>
              </div>
            )}
            {error && (
              <div className="absolute left-1/2 top-[145px] z-50 -translate-x-1/2 animate-slideIn">
                <div className="rounded-xl bg-red-500 px-4 py-3 text-white shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

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
