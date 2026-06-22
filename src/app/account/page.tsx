//src/app/auth/page.tsx
//ユーザー情報ページ

import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { getUserInfoByUserId } from "@/lib/record";

export default async function UserInfo() {
  noStore();

  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  if (!userId) {
    return <p>ログインしてください。</p>;
  }

  const userInfo = await getUserInfoByUserId(userId);

  if (userInfo) {
    const username = userInfo.username;
    const nickname = userInfo.nickname;
    const email = userInfo.email;

    return (
      <div className="min-h-screen">
        <div className="flex flex-col items-center mt-10">
          <a className="font-bold text-xl">ユーザー情報</a>

          <div className="relative w-95 h-75 mt-5 rounded border border-gray-500">
            <div className="flex flex-col mt-8 ml-2">
              <div className="flex">
                <p className="font-bold w-34">ユーザーID：</p>
                <p>{username}</p>
              </div>

              <div className="flex">
                <p className="font-bold w-34">ユーザー名：</p>
                <p>{nickname}</p>
              </div>

              <div className="flex">
                <p className="font-bold w-34">メールアドレス：</p>
                <p>{email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
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
      </div>
    );
  }
}
