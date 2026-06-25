//src/header.tsx
//ヘッダー
import { cookies } from "next/headers";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { getUserInfoByUserId } from "./lib/record";

export default async function Header() {
  noStore();
  const cookiesStore = await cookies(); //cookieに保存されているものを全て取得
  const userId = cookiesStore.get("userId")?.value; //cookieで保存されたuserIDを取得

  const items = [
    { id: 1, href: "/record", label: "トレーニング" },
    { id: 2, href: "/record/graphs", label: "グラフ" },
    { id: 3, href: "/account", label: "アカウント" },
  ];

  let nickname = "ゲスト";
  let isLogin = false;

  const userInfo = await getUserInfoByUserId(userId);

  if (userInfo) {
    nickname = userInfo.nickname;
    isLogin = true;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full pl-3">
        <div className="h-7 mt-4">
          <Link href="/" className="font-bold text-2xl">
            MUSCLE MEMORY
          </Link>
        </div>

        <div className="mt-4">
          <p className="font-bold text-base">{nickname}</p>
        </div>

        <div className="flex mt-5">
          {isLogin && (
            <>
              <Link href="/" className="border-b">
                ホーム
              </Link>
              {items.map((item) => (
                <Link key={item.id} href={item.href} className="ml-3 border-b">
                  {item.label}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
