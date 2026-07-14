//src/footer.tsx
//フッター

import { cookies } from "next/headers";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { getUserInfoByUserId } from "./lib/record";
import Image from "next/image";

export default async function Footer() {
  noStore();
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  const items = [
    { id: 1, href: "/", alt: "ホーム", src: "/home.png" },
    { id: 2, href: "/record", alt: "トレーニング", src: "/record.png" },
    { id: 3, href: "/record/graphs", alt: "グラフ", src: "/graph.png" },
    { id: 4, href: "/account", alt: "アカウント", src: "/account.png" },
  ];

  if (!userId) {
    return;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      <div className="max-w-[600px] mx-auto w-full h-20 bg-white">
        <div className="border-[0.25px]"></div>
        <div className="flex justify-evenly items-center pt-3">
          {items.map((item) => (
            <div key={item.id}>
              <Link href={item.href}>
                <Image src={item.src} alt={item.alt} width={50} height={50} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
