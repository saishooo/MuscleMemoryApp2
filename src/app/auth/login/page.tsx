"use client"

//src/app/auth/login/page.tsx
//ログインページ

export default function Login() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()  //ページのリロードを防止

    //formの中身を全て取得する
    const formData = new FormData(e.currentTarget)

    const body = {
      username: String(formData.get( "username" )),
      password: String(formData.get( "password" )),
    }

    const res = await fetch( "/api/auth/login", {
      method: "POST" ,
      headers: { "Content-Type" : "application/json", },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    console.log(data)
  }

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-[40px]">
        <a className="font-bold text-xl">ログイン</a>

        <form onSubmit={handleSubmit}>
          <div className="w-[350px] h-[270px] mt-[20px] rounded border border-gray-500">
            <div className="flex items-center mt-[35px] ml-[10px]">
              <a className="font-bold w-[px]">ユーザーID</a>
              <input
                name="username"
                type="text"
                placeholder=" IDを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex items-center mt-[60px] ml-[10px]">
              <a className="font-bold">パスワード</a>
              <input
                name="password"
                type="password"
                placeholder=" パスワードを入力"
                className="w-[200px] mr-[10px] ml-auto border rounded"
              />
            </div>

            <div className="flex justify-end mt-[60px] mr-[20px]">
              <button type="submit" className="font-bold">ログイン</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
