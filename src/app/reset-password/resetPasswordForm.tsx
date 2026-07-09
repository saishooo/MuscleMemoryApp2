"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function ResetPaswwordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPass, setNewPass] = useState("");
  const [newPassConf, setNewPassConf] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  //------------------成功メッセージを表示------------------
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.replace("/");
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [message, router]);

  //------------------エラーメッセージを表示------------------
  useEffect(() => {
    if (!error) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setError("");
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [error]);

  //------------------送信ボタン押下時処理------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const formData = new FormData(e.currentTarget);

      //newPasswordとconfirm_newPasswordが一致しているかの確認
      const l_newPassword = String(formData.get("newPassword"));
      const l_confirm_newPassword = String(formData.get("confirm_newPassword"));
      if (l_newPassword !== l_confirm_newPassword) {
        setError("パスワードが一致しません");
        return;
      }

      const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_.!&%$#]{7,}$/;

      if (!regexPass.test(l_newPassword)) {
        setError("パスワードに英数字を1文字以上ずつ使用してください");
        return;
      }

      const body = {
        newPassword: String(l_newPassword),
        confirm_newPassword: String(l_confirm_newPassword),
        resetToken: String(token),
      };

      setLoading(true); //ローディング開始

      const res = await fetch("/api/account/password/reset", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false); //ローディング終了
        setError("更新に失敗しました");
        return;
      }

      setError("");
      setLoading(false); //ローディング終了
      setMessage("パスワード更新成功🎉");
    } catch {
      setLoading(false);
      setError("通信エラー");
    }
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-xl bg-gray-500">
            <p className="flex items-center justify-center h-12 w-25 text-sm font-bold text-white">
              登録中...
            </p>
          </div>
        </div>
      )}
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
                  name="confirm_newPassword"
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

            {message && (
              <div className="fixed inset-0 z-50 flex items-center justify-center animate-slideIn">
                <div className="rounded-xl bg-green-500 px-4 py-3 text-white shadow-lg">
                  {message}
                </div>
              </div>
            )}
            {error && (
              <div className="fixed inset-0 z-50 flex items-center justify-center animate-slideIn">
                <div className="rounded-xl bg-red-500 px-4 py-3 text-white shadow-lg">
                  {error}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
