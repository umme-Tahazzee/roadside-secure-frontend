// components/legal/LegalLayout.tsx
import type { LucideIcon } from "lucide-react";
import { Mail } from "lucide-react";
import Eyebrow from "@/utils/Eyebrow";
import SectionTitle from "@/utils/SectionTitle";
import TableOfContents, { LegalSection } from "./TableOfContents";
import Link from "next/link";

type LegalLayoutProps = {
  eyebrow: string;
  icon?: LucideIcon;
  title: string;
  highlight?: string;
  description?: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalLayout({
  eyebrow,
  icon,
  title,
  highlight,
  description,
  lastUpdated,
  sections,
}: LegalLayoutProps) {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16 lg:py-24">
      {/* Header */}
      <header className="flex flex-col items-center text-center">
        <Eyebrow label={eyebrow} icon={icon} />
        <SectionTitle
          title={title}
          highlight={highlight}
          description={description}
        />
        <p className="text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* Sticky TOC (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents sections={sections} />
          </div>
        </aside>

        {/* Mobile TOC */}
        <details className="rounded-xl border border-border bg-card p-4 lg:hidden">
          <summary className="cursor-pointer text-sm font-semibold">
            Table of contents
          </summary>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-primary">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </details>

        {/* Content */}
        <article className="min-w-0 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10 lg:col-start-2 lg:row-start-1">
          <div className="space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {i + 1}. {s.title}
                </h2>

                {s.content.map((p, idx) => (
                  <p
                    key={p}
                    className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base"
                  >
                    {p}
                  </p>
                ))}

                {s.list && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-7 text-muted-foreground sm:text-base marker:text-primary">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Contact box */}
          <div className="mt-12 flex items-start gap-4 rounded-xl bg-primary/5 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Questions about this page?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Contact us at{" "}
                <Link
                  href="mailto:tahazzeekaria1@gmail.com"
                  className="font-medium text-primary hover:underline"
                >
                 tahazzeekaria1@gmail.com
                </Link>
              </p>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}