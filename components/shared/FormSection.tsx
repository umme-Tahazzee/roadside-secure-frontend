import type { ComponentType, ReactNode } from "react";

export function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-[18px]" />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-base font-semibold leading-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
