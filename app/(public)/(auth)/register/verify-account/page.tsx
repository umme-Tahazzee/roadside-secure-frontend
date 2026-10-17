import VerifyAccount from "@/components/module/auth/VerfityAccount";
import { Suspense } from "react";

export default function VerifyAccountPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-card">
          <div className="size-8 animate-spin rounded-full border-2 border-secondary border-t-primary" />
        </main>
      }
    >
        <VerifyAccount/>
    </Suspense>
  );
}