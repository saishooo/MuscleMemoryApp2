//src/app/auth/page.tsx
//ユーザー登録ページ

export default function SignUp() {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">新規ユーザー登録</a>

        <form>
          <div className="w-[380px] h-[500px] mt-[20px] rounded border border-gray-500">
            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">ユーザーID</a>
              <input
                name="userId"
                type="text"
                placeholder="ユーザーIDを設定"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">ニックネーム</a>
              <input
                name="nickname"
                type="text"
                placeholder="山田太郎"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">メールアドレス</a>
              <input
                name="email"
                type="text"
                placeholder="@email.com"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">パスワード</a>
              <input
                name="password"
                type="text"
                placeholder="パスワードを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">パスワードの確認</a>
              <input
                name="config_password"
                type="text"
                placeholder="確認用パスワードを入力"
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
