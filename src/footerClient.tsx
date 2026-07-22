"use client";
// src/footerClient.tsx

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterClient() {
  const pathname = usePathname();
  console.log(pathname);
  const items = [
    { id: 1, href: "/", alt: "ホーム", src: "/home.png" },
    { id: 2, href: "/record", alt: "トレーニング", src: "/record.png" },
    { id: 3, href: "/record/calendar", alt: "カレンダー", src: "/calendar.png" },
    { id: 4, href: "/record/graphs", alt: "グラフ", src: "/graph.png" },
    { id: 5, href: "/account", alt: "アカウント", src: "/account.png" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-20">
      <div className="max-w-[600px] mx-auto w-full h-20 bg-white">
        <div className="border-[0.25px]"></div>
        <div className="flex justify-evenly items-center mt-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex h-14 w-14 rounded-xl items-center justify-center
                ${
                  pathname === item.href
                    ? "border-3 border-yellow-300"
                    : "border border-white"
                }
                `}
            >
              <Link
                href={item.href}
                className="flex h-full w-full items-center justify-center"
              >
                <Image src={item.src} alt={item.alt} width={35} height={35} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
