import Link from "next/link";

export default async function Header() {

  return (
    <div className="mx-auto max-w-[600px]">
      <div className="flex flex-col w-full ml-[10px]">
        <div className="h-[30px] mt-[15px]">
          <a className="font-bold text-2xl">MUSCLE MEMORY</a>
        </div>

        <div className="mt-[15px]">
            <p className="font-bold text-base">ゲスト</p>
        </div>
      </div>
    </div>
  );
}
