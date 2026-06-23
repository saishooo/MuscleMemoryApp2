"use client";

//src/app/auth/page.tsx
//ユーザー情報ページ
type User = {
  id: string;
  username: string;
  nickname: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  userInfo: User;
};

export default function AccountInfo({ userInfo }: Props) {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-10">
        <a className="font-bold text-xl">ユーザー情報</a>

        <div className="relative w-95 h-50 mt-5 rounded border border-gray-500">
          <div className="flex flex-col mt-8 ml-2">
            <div className="flex">
              <p className="font-bold w-34">ユーザーID：</p>
              <p>{userInfo.username}</p>
            </div>

            <div className="flex">
              <p className="font-bold w-34">ユーザー名：</p>
              <p>{userInfo.nickname}</p>
            </div>

            <div className="flex">
              <p className="font-bold w-34">メールアドレス：</p>
              <p>{userInfo.email}</p>
            </div>
          </div>

          <div className="flex justify-center pt-8">
            <button className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg">
              編集
            </button>
            <div className="pl-4">
              <button className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg">
                パスワード変更
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
            >
              ログアウト
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
