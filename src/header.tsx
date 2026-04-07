//src/header.tsx
//ヘッダー
import { cookies } from "next/headers";
import { getPrisma } from "./lib/prisma";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

export default async function Header() {
  noStore();
  const cookiesStore = await cookies(); //cookieに保存されているものを全て取得
  const userId = cookiesStore.get("userId")?.value; //cookieで保存されたuserIDを取得

  let username = "ゲスト";
  let isLogin = false;

  if (userId) {
    const prisma = getPrisma();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      username = user.username;
      isLogin = true;
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full ml-[10px]">
        <div className="h-[30px] mt-[15px]">
          <Link href="/" className="font-bold text-2xl">
            MUSCLE MEMORY
          </Link>
        </div>

        <div className="mt-[15px]">
          <p className="font-bold text-base">{username}</p>
        </div>

        <div className="flex mt-[20px]">
          <Link href="/record" className="border-b">
            メニュー
          </Link>
          {!isLogin ? (
            <Link href="/auth" className="ml-[35px] border-b">
              ログイン・登録
            </Link>
          ) : (
            <form action="/api/auth/logout" method="POST">
              <button type="submit" className="ml-[35px] border-b">
                ログアウト
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
