//src/app/auth/page.tsx
//ユーザー情報ページ

import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { getUserInfoByUserId } from "@/lib/record";
import AccountInfo from "./AccountInfo";

export default async function AccountPage() {
  noStore();

  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  if (!userId) {
    return <p>ログインしてください。</p>;
  }

  const userInfo = await getUserInfoByUserId(userId);

  if (userInfo) {
    return (
      <div className="min-h-screen">
        <AccountInfo userInfo={userInfo} />
      </div>
    );
  }
}
