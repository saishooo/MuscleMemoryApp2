//src/header.tsx
//ヘッダー

import Link from "next/link";

export default async function Header() {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full ml-[10px]">
        <div className="h-[30px] mt-[15px]">
          <a className="font-bold text-2xl">MUSCLE MEMORY</a>
        </div>

        <div className="mt-[15px]">
          <p className="font-bold text-base">ゲスト</p>
        </div>

        <div className="mt-[15px]">
          <Link href="/record" className="border-b">メニュー</Link>
          <Link href="/auth" className="ml-[35px] border-b">ログイン・登録</Link>
        </div>
      </div>
    </div>
  );
}
