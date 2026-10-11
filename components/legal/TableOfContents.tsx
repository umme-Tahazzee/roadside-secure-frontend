// components/legal/TableOfContents.tsx
"use client";

import { useEffect, useState } from "react";

export type LegalSection = {
  id: string;
  title: string;
  content: string[]; // paragraphs
  list?: string[]; // optional bullet points
};

export default function TableOfContents({
  sections,
}: {
  sections: LegalSection[];
}) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="space-y-1 border-l border-border">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`-ml-px block border-l-2 py-1.5 pl-4 transition-colors ${
                active === s.id
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {i + 1}. {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}