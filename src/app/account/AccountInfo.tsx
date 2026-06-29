"use client";

//src/app/account/AccountInfo.tsx

import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const [editPassword, setEditPassword] = useState<User>(userInfo);

  const userInfoUpdate = async () => {
    console.log(userInfo.nickname);
    console.log(editUserInfo.nickname);
    if (
      userInfo.username === editUserInfo.username &&
      userInfo.nickname === editUserInfo.nickname &&
      userInfo.email === editUserInfo.email
    ) {
      console.log("変更がされていません");
      return;
    }

    try {
      const body = {
        userId: String(userInfo.id),
        username: String(editUserInfo.username),
        nickname: String(editUserInfo.nickname),
        email: String(editUserInfo.email),
      };

      const res = await fetch("api/account/userInfo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      router.refresh();
    } catch (error) {
      console.error("通信に失敗しました");
    }
  };

  const passwordUpdate = async () => {};

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-10">
        {isEditPass ? (
          <>
            <a className="font-bold text-xl">ユーザー情報</a>
            <div className="relative w-95 h-65 mt-5 rounded border border-gray-500">
              <div className="flex flex-col mt-8 ml-2">
                <div className="flex">
                  <p className="font-bold w-38">現在のパスワード</p>
                  <input type="text" className="border rounded w-50" />
                </div>
                <div className="flex mt-10">
                  <p className="font-bold w-38">新しいパスワード</p>
                  <input type="text" className="border rounded w-50" />
                </div>
                <div className="flex mt-4">
                  <p className="font-bold w-38">確認</p>
                  <input
                    type="text"
                    className="border rounded w-50"
                    placeholder="新しいパスワードをもう一度入力"
                  />
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
                        className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
                        onClick={() => {
                          setIsEditInfo(false);
                          setIsEditPass(false);
                        }}
                      >
                        更新
                      </button>
                    </div>
                  </>
                )}
              </div>
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
                      className={
                        isEditPass
                          ? "font-bold rounded border border-gray-500 w-30 h-10 shadow-lg bg-green-400"
                          : "font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
                      }
                      onClick={() => {
                        if (isEditInfo === false) {
                          //ユーザー情報が編集中でなければ押下可能
                          //更新ボタン押下時のみ実行
                          //api送信処理
                          console.log("パスワード変更api送信");
                        }
                        setIsEditPass(!isEditPass);
                      }}
                    >
                      {isEditPass ? "更新" : "パスワード変更"}
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
    </div>
  );
}
