"use client";

import { useState } from "react";

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
  const [isEditInfo, setIsEditInfo] = useState<boolean>(false);
  const [isEditPass, setIsEditPass] = useState<boolean>(false);
  const [editUserInfo, setEditUserInfo] = useState<User>(userInfo);
  const [editPassword, setEditPassword] = useState("");

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mt-10">
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
                      username: e.target.value,
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
                      username: e.target.value,
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
            {(isEditInfo || isEditPass) && (
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
                        console.log("ユーザー情報変更api送信");
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
                      if (isEditPass === true) {
                        //更新ボタン押下時のみ実行
                        //api送信処理
                        console.log("パスワード変更api送信");
                      }
                      setIsEditPass(!isEditPass);
                    }
                  }}
                >
                  {isEditPass ? "更新" : "パスワード変更"}
                </button>
              </div>
            )}
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
