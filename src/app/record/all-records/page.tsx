// src/app/record/all-records/page.tsx
// 今までの記録を表示するページ

export default function allRecords() {
    return(
        <div className="min-h-screen">
            <div className="flex flex-col items-center mt-[40px]">
                <a className="font-bold text-xl">全記録を確認</a>

                <div className="w-[450px] h-[600px] mt-[20px] rounded border border-gray-500"></div>
            </div>
        </div>
    );
}