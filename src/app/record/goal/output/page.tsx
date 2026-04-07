// src/app/record/goal/output/page.tsx
// 目標値の確認ページ

export default function goalRecords() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">目標を確認</a>
        <div className="w-[380px] h-[400px] mt-[20px] rounded border border-gray-500">
          <div className="flex w-full mt-[20px] h-[30px]">
            <p className="font-bold w-[180px] ml-[20px]">トレーニング名</p>
            <p className="font-bold w-[100px] ml-[30px]">重量（kg）</p>
            <p className="font-bold w-[90px] ml-[30px]">回数</p>
          </div>
          {/* <GoalRecordsList trainings={trainings} exercises={exercise} /> */}
        </div>
      </div>
    </div>
  );
}
