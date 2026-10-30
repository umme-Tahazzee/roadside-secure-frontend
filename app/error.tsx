"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Production e eikhane Sentry/logging service e pathaw
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_30%,color-mix(in_oklab,var(--destructive)_12%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-md text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
          <TriangleAlert className="size-6" />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
          Something went wrong.
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          An unexpected error happened on our side. Please try again, or head
          back home.
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="mt-6 overflow-x-auto rounded-lg border bg-muted/50 p-3 text-left text-xs text-muted-foreground">
            {error.message}
          </pre>
        )}
        {error.digest && (
          <p className="mt-4 text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={() => reset()}>
            Try again
          </Button>
          <Button size="lg" variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}