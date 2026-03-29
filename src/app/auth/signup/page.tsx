"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// src/app/auth/signup/page.tsx
// ユーザー登録ページ

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  //登録ボタン押下時の処理
  //フォーム入力をJSONに変換してAPI(POST)に送信
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページのリロード防止

    //formの中身を全て取得する
    const formData = new FormData(e.currentTarget);

    //passwordとconfigpasswordが一致しているかの確認
    const l_password = String(formData.get("password"));
    const l_confirm_password = String(formData.get("confirm_password"));

    if (l_password !== l_confirm_password) {
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

    if (!res) {
      setError("新規登録に失敗しました");
      return;
    }

    setError("");
    router.replace("/record");
    router.refresh();
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">新規ユーザー登録</a>

        <form onSubmit={handleSubmit}>
          <div className="w-[380px] h-[500px] mt-[20px] rounded border border-gray-500">
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
                ログイン
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
