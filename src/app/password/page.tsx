"use client";

//パスワードを忘れた場合の処理

//src/app/password/page.tsx

export default function PasswordForget_page() {
  //------------------パスワード忘れた時の処理------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //ページリロード防止

    try {
      const formData = new FormData(e.currentTarget);

      const l_username = String(formData.get("username"));
      const l_email = String(formData.get("email"));

      const body = {
        username: l_username,
        email: l_email,
      };

      const res = await fetch("/api/account/password/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
    } catch (error) {}
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-10">
        <p className="font-bold text-xl">パスワードを忘れた場合</p>
        <div className="relative w-95 h-50 mt-5 rounded border border-gray-500">
          <form onSubmit={handleSubmit}>
            <div className="relative flex mt-8 ml-2">
              <div className="relative flex">
                <p className="font-bold w-38">ユーザーID</p>
                <input
                  name="username"
                  type="text"
                  className="border rounded w-50"
                />
              </div>
            </div>
            <div className="relative flex mt-8 ml-2">
              <div className="relative flex">
                <p className="font-bold w-38">メールアドレス</p>
                <input
                  name="email"
                  type="text"
                  placeholder=" @email.com"
                  className="border rounded w-50"
                />
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <div className="flex justify-center items-center rounded border border-gray-500 w-30 h-10 shadow-lg">
                <a href="/auth/login" className="font-bold">
                  戻る
                </a>
              </div>

              <div className="pl-4">
                <button
                  type="submit"
                  className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg bg-green-400"
                >
                  送信
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
