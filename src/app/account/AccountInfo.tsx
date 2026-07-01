"use client";

//src/app/account/AccountInfo.tsx

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  const router = useRouter();
  const [isEditInfo, setIsEditInfo] = useState<boolean>(false);
  const [isEditPass, setIsEditPass] = useState<boolean>(false);
  const [editUserInfo, setEditUserInfo] = useState<User>(userInfo);

  const [nowPass, setNowPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [newPassConf, setNewPassConf] = useState<string>("");

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
      setMessage("");
      setIsEditPass(false);
      setIsEditInfo(false);
      router.replace("/account");
      router.refresh();
    }, 600);

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

  //------------------新しいパスワードがあっているかの確認------------------
  useEffect(() => {
    if (newPass === newPassConf) {
      console.log("同じ");
    } else {
      console.log("違う");
    }
  }, [newPass, newPassConf]);

  //------------------ユーザー情報アップデート処理------------------
  const userInfoUpdate = async () => {
    setMessage("");
    setError("");

    if (
      userInfo.username === editUserInfo.username &&
      userInfo.nickname === editUserInfo.nickname &&
      userInfo.email === editUserInfo.email
    ) {
      setError("変更されていません");
      return;
    }

    try {
      const body = {
        userId: String(userInfo.id),
        username: String(editUserInfo.username),
        nickname: String(editUserInfo.nickname),
        email: String(editUserInfo.email),
      };

      setLoading(true); //ローディング開始

      const res = await fetch("/api/account/userInfo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      console.log(res);
      if (!res.ok) {
        setError(data.error ?? "更新に失敗しました");
        setLoading(false); //ローディング終了
        return;
      }

      setError("");
      setLoading(false); //ローディング終了
      setMessage("更新成功");
    } catch (error) {
      setError("通信エラー");
    }
  };

  //------------------パスワード更新処理------------------
  const passwordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (nowPass === "" || newPass === "" || newPassConf === "") {
      console.log("未入力の項目があります");
      setError("未入力の項目があります");
      return;
    }

    if (newPass !== newPassConf) {
      console.log("新しいパスワードと確認パスワードが異なります");
      setError("新しいパスワードと確認パスワードが異なります");
      return;
    }

    try {
      const body = {
        userId: String(userInfo.id),
        nowPass: String(nowPass),
        newPass: String(newPass),
        newPassConf: String(newPassConf),
      };

      setLoading(true); //ローディング開始

      const res = await fetch("/api/account/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "パスワード変更に失敗しました");
        setLoading(false); //ローディング終了
        return;
      }

      setError("");
      setLoading(false); //ローディング終了
      setMessage("パスワード変更🎉");
    } catch (error) {
      setError("通信エラー");
    }
  };

  return (
    <div className="min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="rounded-xl bg-gray-500">
            <p className="flex items-center justify-center h-12 w-25 text-sm font-bold text-white">
              更新中...
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center mt-10">
        {isEditPass ? (
          <>
            <a className="font-bold text-xl">ユーザー情報</a>
            <div className="relative w-95 h-65 mt-5 rounded border border-gray-500">
              <form onSubmit={passwordUpdate}>
                <div className="flex flex-col mt-8 ml-2">
                  <div className="relative flex">
                    <p className="font-bold w-38">現在のパスワード</p>
                    <input
                      type={show ? "text" : "password"}
                      className="border rounded w-50"
                      onChange={(e) => {
                        setNowPass(e.target.value);
                      }}
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
                    <p className="font-bold w-38">新しいパスワード</p>
                    <input
                      type={show ? "text" : "password"}
                      className="border rounded w-50"
                      onChange={(e) => {
                        setNewPass(e.target.value);
                      }}
                    />
                    <button
                      type="button"
                      className="absolute right-6 text-gray-500"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "非表示" : "表示"}
                    </button>
                  </div>

                  <div className="relative flex mt-4">
                    <p className="font-bold w-38">確認用パスワード</p>
                    <input
                      type={show ? "text" : "password"}
                      className="border rounded w-50"
                      placeholder="もう一度入力"
                      onChange={(e) => {
                        setNewPassConf(e.target.value);
                      }}
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
                  {/* ユーザー情報またはパスワードが編集中でなければ表示 */}
                  {isEditPass && (
                    <>
                      <button
                        className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
                        onClick={() => {
                          setIsEditInfo(false);
                          setIsEditPass(false);
                        }}
                      >
                        戻る
                      </button>

                      <div className="pl-4">
                        <button
                          type="submit"
                          className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg bg-green-400"
                        >
                          更新
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <a className="font-bold text-xl">ユーザー情報</a>
            <div className="relative w-95 h-55 mt-5 rounded border border-gray-500">
              <div className="flex flex-col mt-8 ml-2">
                <div className="flex">
                  <p className="font-bold w-34">ユーザーID：</p>
                  {isEditInfo ? (
                    <input
                      type="text"
                      value={editUserInfo.username}
                      className="border rounded w-50"
                      onChange={(e) =>
                        setEditUserInfo({
                          ...editUserInfo,
                          username: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{userInfo.username}</p>
                  )}
                </div>

                <div className="flex mt-3">
                  <p className="font-bold w-34">ユーザー名：</p>
                  {isEditInfo ? (
                    <input
                      type="text"
                      value={editUserInfo.nickname}
                      className="border rounded w-50"
                      onChange={(e) =>
                        setEditUserInfo({
                          ...editUserInfo,
                          nickname: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{userInfo.nickname}</p>
                  )}
                </div>

                <div className="flex mt-3">
                  <p className="font-bold w-34">メールアドレス：</p>
                  {isEditInfo ? (
                    <input
                      type="text"
                      value={editUserInfo.email}
                      className="border rounded w-50"
                      onChange={(e) =>
                        setEditUserInfo({
                          ...editUserInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{userInfo.email}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center pt-8">
                {/* ユーザー情報またはパスワードが編集中でなければ表示 */}
                {isEditInfo && (
                  <button
                    className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
                    onClick={() => {
                      setIsEditInfo(false);
                      setIsEditPass(false);
                    }}
                  >
                    戻る
                  </button>
                )}

                {/* パスワードが編集中でなければ表示 */}
                {!isEditPass && (
                  <div className={isEditInfo ? "pl-4" : "pl-0"}>
                    <button
                      className={
                        isEditInfo
                          ? "font-bold rounded border border-gray-500 w-30 h-10 shadow-lg bg-green-400"
                          : "font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
                      }
                      onClick={() => {
                        if (isEditPass === false) {
                          //パスワードが編集中でなければ押下可能
                          if (isEditInfo === true) {
                            //更新ボタン押下時のみ実行
                            //api送信処理
                            userInfoUpdate();
                          }
                          setIsEditInfo(!isEditInfo);
                        }
                      }}
                    >
                      {isEditInfo ? "更新" : "編集"}
                    </button>
                  </div>
                )}
                {/* ユーザー情報が編集中でなければ表示 */}
                {!isEditInfo && (
                  <div className="pl-4">
                    <button
                      className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
                      onClick={() => {
                        setIsEditPass(!isEditPass);
                      }}
                    >
                      パスワード変更
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

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
    </div>
  );
}
