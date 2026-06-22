//src/header.tsx
//ヘッダー
import { cookies } from "next/headers";
import { getPrisma } from "./lib/prisma";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { getUserInfoByUserId } from "./lib/record";

export default async function Header() {
  noStore();
  const cookiesStore = await cookies(); //cookieに保存されているものを全て取得
  const userId = cookiesStore.get("userId")?.value; //cookieで保存されたuserIDを取得

  const items = [
    { id: 1, href: "/", label: "ホーム" },
    { id: 2, href: "/record", label: "トレーニング" },
    { id: 3, href: "/record/graphs", label: "グラフ" },
    { id: 4, href: "/account", label: "アカウント" },
  ];

  let username = "ゲスト";
  let isLogin = false;

  const userInfo = await getUserInfoByUserId(userId);

  if (userInfo){
    username = userInfo.username;
    isLogin = true;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full pl-[10px]">
        <div className="h-[30px] mt-[15px]">
          <Link href="/" className="font-bold text-2xl">
            MUSCLE MEMORY
          </Link>
        </div>

        <div className="mt-[15px]">
          <p className="font-bold text-base">{username}</p>
        </div>

        <div className="flex mt-[20px]">
          {isLogin && (
            <>
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
