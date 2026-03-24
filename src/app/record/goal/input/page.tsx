//トレーニング内容を記録するページ
//トレーニング内容を記録するページのとりあえずのUI SQLを導入する予定なので

export default function recordTraining_page() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">目標値の設定</a>

        <form>
          <div className="w-[300px] h-[350px] mt-[20px] rounded border border-gray-500">
            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">種目</a>
              <input
                name="event"
                type="text"
                placeholder=" 種目を入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">重さ</a>
              <input
                name="weight"
                type="text"
                placeholder=" 重さを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">回数</a>
              <input
                name="rep"
                type="text"
                placeholder=" 回数を入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex justify-end mt-[60px] mr-[20px]">
              <button className="font-bold">登録</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
