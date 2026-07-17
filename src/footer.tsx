//src/footer.tsx
//フッター

import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import FooterClient from "./footerClient";

export default async function Footer() {
  noStore();
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  if (!userId) {
    return;
  }

  return <FooterClient />;
}
