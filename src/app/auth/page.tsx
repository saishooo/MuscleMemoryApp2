//src/app/auth/page.tsx
//ユーザー情報ページ

import Link from "next/link";

export default function UserInfo() {
  return (
    <div className="min-h-screen">
      <form action="/api/auth/logout" method="POST">
        <button type="submit" className="ml-[35px]">
          ログアウト
        </button>
      </form>
    </div>
  );
}
