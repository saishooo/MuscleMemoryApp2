//src/header.tsx
//ヘッダー

export default async function Header() {
  return (
    <div className="w-full">
      <div className="bg-red-200">
        <div className="flex flex-col w-full ml-[10px]">
          <div className="h-[30px] mt-[15px]">
            <a className="font-bold text-2xl">MUSCLE MEMORY</a>
          </div>

          <div className="mt-[15px]">
            <p className="font-bold text-base">ゲスト</p>
          </div>
        </div>
      </div>
    </div>
  );
}
