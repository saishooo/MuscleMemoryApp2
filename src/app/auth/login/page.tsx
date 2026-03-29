"use client"

//src/app/auth/login/page.tsx
//ログインページ

import { useRouter } from "next/navigation";    //⚫︎ページ遷移を操作するためのフック
import { useState } from "react";               //⚫︎状態を保存し、画面を更新する

export default function Login() {
  const router = useRouter();
  const [ error, setError ] = useState("");

  //ログインボタン押下時の処理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  //ページのリロードを防止
    setError("");

    //formの中身を全て取得する
    const formData = new FormData(e.currentTarget);

    const body = {
      username: String(formData.get( "username" )),
      password: String(formData.get( "password" )),
    };

    //APIにリクエストを送信
    const res = await fetch( "/api/auth/login", {
      method: "POST" ,
      headers: { "Content-Type" : "application/json", },
      body: JSON.stringify(body),
    });

    //APIのレスポンスを受け取る
    const data = await res.json();
    console.log(data);

    if (!res.ok){
      setError(data.error ?? "ログインに失敗しました");
      return;
    }

    router.replace("/");    //⚫︎ページの置き換え（履歴を残さずに移動）
    router.refresh();       //⚫︎再読み込み　これによって、cookieとユーザー名の更新をする
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">ログイン</a>

        <form onSubmit={handleSubmit}>
          <div className="w-[350px] h-[270px] mt-[20px] rounded border border-gray-500">
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
              <button type="submit" className="font-bold">ログイン</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
