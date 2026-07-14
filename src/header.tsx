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
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[600px] mx-auto w-full bg-white">
        <div className="pl-4">
          <div className="h-7 pt-4">
            <Link href="/" className="font-bold text-2xl">
              MUSCLE MEMORY
            </Link>
          </div>

          <div className="mt-6">
            <p className="font-bold text-base">{nickname}</p>
          </div>
        </div>

        <div className="mt-3 border-[0.25px]"></div>
        {/* <div className="flex mt-5">
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
          </div> */}
      </div>
    </div>
  );
}
