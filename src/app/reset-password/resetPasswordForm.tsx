"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPaswwordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPass, setNewPass] = useState("");
  const [newPassConf, setNewPassConf] = useState("");
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-10">
        <p className="font-bold text-xl">パスワードの変更</p>
        <div className="relative w-95 h-54 mt-5 rounded border border-gray-500">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mt-8 ml-2">
              <div className="relative flex">
                <p className="font-bold w-38">新しいパスワード</p>
                <input
                  name="newPassword"
                  type={show ? "text" : "password"}
                  className="border rounded w-50"
                />
                <button
                  type="button"
                  className="absolute right-6 text-gray-500"
                  onClick={() => setShow(!show)}
                >
                  {show ? "非表示" : "表示"}
                </button>
              </div>

              <div className="relative flex mt-10">
                <p className="font-bold w-38">確認用パスワード</p>
                <input
                  name="newPassword"
                  type={show ? "text" : "password"}
                  placeholder="もう一度入力"
                  className="border rounded w-50"
                />
                <button
                  type="button"
                  className="absolute right-6 text-gray-500"
                  onClick={() => setShow(!show)}
                >
                  {show ? "非表示" : "表示"}
                </button>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg bg-green-400"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
