// src/app/record/best-records/page.tsx
// 最高記録を表示するページ

export default function bestRecords() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">最高記録を確認</a>

        <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500"></div>
      </div>
    </div>
  );
}
