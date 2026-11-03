import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import img from "@/assets/images/auth/login.png";
import Logo from "@/components/shared/Logo";

export function ApplyShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-3">
      {/* Left: form */}
      <div className="flex flex-col px-4 py-2 sm:px-10 md:col-span-2 md:py-8">
        <header className="flex items-center justify-between gap-4">
          <Logo imageClassName="h-20 w-auto" />
          <p className="text-sm text-muted-foreground">
            <span className="hidden sm:inline">Already registered? </span>
            <Link
              href="/login?next=/apply/profile"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </header>

        <main className="flex flex-1 justify-center py-6 md:py-10">
          <div className="w-full max-w-3xl">{children}</div>
        </main>

        <footer className="text-center text-xs text-muted-foreground">
          By applying, you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </footer>
      </div>

      {/* Right: image stays in place while the form scrolls */}
      <aside className="relative hidden lg:block">
        <div className="sticky top-0 h-svh overflow-hidden bg-muted">
          <Image
            src={img}
            alt="Mechanic helping a driver at the roadside"
            fill
            priority
            placeholder="blur"
            sizes="33vw"
            className="object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 space-y-3 p-10 text-white xl:p-14">
            <h2 className="max-w-md text-3xl font-semibold leading-tight tracking-tight">
              Get roadside jobs near you
            </h2>
            <p className="max-w-md text-sm text-white/80">
              Set your service area, choose what you fix, and start receiving
              requests once your documents are approved.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
