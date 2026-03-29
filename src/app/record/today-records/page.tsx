// src/app/record/today-records/page.tsx
// 今日の記録を表示するページ

export default function todayRecords() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">今日の記録を確認</a>

        <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500"></div>
      </div>
    </div>
  );
}
