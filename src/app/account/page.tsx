//src/app/auth/page.tsx
//ユーザー情報ページ

import Link from "next/link";

export default function UserInfo() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">ユーザー情報</a>

        <div className="relative w-[380px] h-[500px] mt-[20px] rounded border border-gray-500">
          <div className="flex items-center mt-[35px] ml-[10px]">
            <a className="font-bold w-[px]">ユーザーID</a>
            <input
              name="username"
              type="text"
              placeholder=" ユーザーIDを設定"
              className="w-[200px] mr-[10px] ml-auto border rounded"
            />
            <a className="font-bold w-[px]">ユーザー名</a>
            <a className="font-bold w-[px]">メールアドレス</a>
          </div>
        </div>

        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
          >
            ログアウト
          </button>
        </form>
      </div>
    </div>
  );
}
