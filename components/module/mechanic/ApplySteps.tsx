import * as Icons from "@/components/shared/icons";
import { cn } from "@/lib/utils";

const STEPS = ["Create account", "Verify email", "Documents"] as const;

export function ApplySteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol
      className="flex items-center gap-2 text-sm"
      aria-label="Application progress"
    >
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <li
            key={label}
            aria-current={active ? "step" : undefined}
            className="flex items-center gap-2"
          >
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full border text-xs font-medium",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary text-primary",
                !done && !active && "text-muted-foreground",
              )}
            >
              {done ? <Icons.CheckCircle2 className="size-4" /> : step}
            </span>
            <span
              className={cn(
                "hidden sm:inline",
                active ? "font-medium" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
            {step < STEPS.length && (
              <span className="h-px w-4 bg-border sm:w-8" aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
