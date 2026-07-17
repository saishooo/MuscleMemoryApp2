import { getPrisma } from "@/lib/prisma";
import RecordsCalendar from "./RecordsCalendar";
import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

export default async function Calendar() {
  noStore();
  const prisma = getPrisma();
  const cookiesStore = await cookies();
  const userId = cookiesStore.get("userId")?.value;

  if (!userId) {
    return;
  }

  return (
    <div className="min-h-screen min-w-full mt-20">
      <div className="flex flex-col justify-center items-center mx-auto">
        <div className="flex flex-col items-center justify-center pt-14">
          <p className="w-full text-lg font-bold text-center">カレンダー</p>
          <RecordsCalendar userId={userId} />
        </div>
      </div>
    </div>
  );
}
