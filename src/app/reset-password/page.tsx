// src/app/reset-password/page.tsx
// パスワードリセットページ

import { Suspense } from "react";
import ResetPaswwordForm from "./resetPasswordForm";

//⚫︎Suspenseとは、表示の準備ができるま、代わりの画面を表示する仕組み

export default function ResetPaswwordPage() {
  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <ResetPaswwordForm />
    </Suspense>
  );
}
