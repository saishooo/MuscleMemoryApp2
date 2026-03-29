//src/app/record/page.tsx
//メニューページ

import Link from "next/link";

export default function Home() {
  const items = [
    { id: 1, href: "/record/input", label: "記録する" },
    { id: 2, href: "/record/goal/input", label: "目標を設定" },
    { id: 3, href: "/record/goal", label: "目標を確認" },
    { id: 4, href: "/record/today-records", label: "今日記録を確認" },
    { id: 5, href: "/record/all-records", label: "全記録の確認"},
    { id: 6, href: "/record/best-records", label: "最高記録の確認" },
    { id: 7, href: "/", label: "グラフで表示" },
  ];
  return (
    <div className="min-h-screen">
      <div className="flex justify-center items-center mt-[30px]">
        <div className="flex flex-col">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="flex justify-center items-center mt-[25px] w-[120px] h-[40px] rounded-lg font-bold text-white bg-gray-500"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
