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
            <button
              className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
              onClick={() => {
                if (isEditPass === false) {
                  setIsEditInfo(!isEditInfo);
                }
              }}
            >
              {isEditInfo ? "更新" : "編集"}
            </button>

            <div className="pl-4">
              <button
                className="font-bold rounded border border-gray-500 w-30 h-10 shadow-lg"
                onClick={() => {
                  if (isEditInfo === false) {
                    setIsEditPass(!isEditPass);
                  }
                }}
              >
                {isEditPass ? "更新" : "パスワード変更"}
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
