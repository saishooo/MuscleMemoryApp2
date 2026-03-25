// src/app/page.tsx
//初期ページ

import Link from "next/link";

export default function Home() {
  const items = [
    { id: 1, href: "/auth", label: "ユーザー情報" },
    { id: 2, href: "/record", label: "メニュー" },
  ];
  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center mt-[80px]">
        <div className="flex flex-col">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex justify-center items-center mt-[50px] w-[120px] h-[40px] rounded-lg font-bold text-white bg-gray-500"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
