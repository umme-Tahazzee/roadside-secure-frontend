import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-5 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_30%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-md text-center">
        <p className="bg-gradient-to-b from-foreground to-foreground/10 bg-clip-text text-8xl font-semibold tracking-tighter text-transparent sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          This road doesn&apos;t lead anywhere.
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The page you&apos;re looking for was moved, deleted, or never existed.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button size="lg" variant="outline">
            <Link href="/#services">Browse services</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}