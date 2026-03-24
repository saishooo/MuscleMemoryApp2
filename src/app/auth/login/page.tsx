//src/app/auth/login/page.tsx
//ログインページ

export default function Login() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">ログイン</a>

        <form>
          <div className="w-[350px] h-[270px] mt-[20px] rounded border border-gray-500">
            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">ユーザーID</a>
              <input
                name="event"
                type="text"
                placeholder=" IDを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">パスワード</a>
              <input
                name="weight"
                type="text"
                placeholder=" パスワードを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex justify-end mt-[60px] mr-[20px]">
              <button className="font-bold">ログイン</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
