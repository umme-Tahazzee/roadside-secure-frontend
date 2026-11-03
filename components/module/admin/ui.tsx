"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { getErrorMessage } from "@/lib/error";
import { humanize } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-heading text-2xl font-semibold">{title}</h1>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// colour by meaning, so the same word looks the same on every page
const GOOD = "bg-emerald-100 text-emerald-700";
const WAIT = "bg-amber-100 text-amber-700";
const BAD = "bg-red-100 text-red-700";
const INFO = "bg-sky-100 text-sky-700";
const NEUTRAL = "bg-muted text-muted-foreground";

const TONES: Record<string, string> = {
  APPROVED: GOOD,
  COMPLETED: GOOD,
  PAID: GOOD,
  REFUNDED: GOOD,
  PENDING: WAIT,
  UNPAID: WAIT,
  REQUESTED: WAIT,
  REFUND_REQUESTED: WAIT,
  PROCESSING: WAIT,
  PARTIALLY_REFUNDED: WAIT,
  ACCEPTED: INFO,
  EN_ROUTE: INFO,
  IN_PROGRESS: INFO,
  REJECTED: BAD,
  SUSPENDED: BAD,
  FAILED: BAD,
  CANCELLED: BAD,
  BLOCKED: BAD,
  ACTIVE: GOOD,
  ADMIN: INFO,
  MECHANIC: INFO,
  CUSTOMER: NEUTRAL,
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        TONES[value] ?? NEUTRAL,
      )}
    >
      {humanize(value)}
    </span>
  );
}

// row of filter buttons, "All" has the value ""
export function FilterTabs({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {["", ...options].map((option) => (
        <Button
          key={option || "all"}
          size="sm"
          variant={value === option ? "default" : "outline"}
          onClick={() => onChange(option)}
        >
          {option ? humanize(option) : "All"}
        </Button>
      ))}
    </div>
  );
}

// shows spinner / error / empty message, otherwise the table
export function DataState({
  isLoading,
  error,
  isEmpty,
  emptyText = "Nothing to show yet.",
  children,
}: {
  isLoading: boolean;
  error: unknown;
  isEmpty: boolean;
  emptyText?: string;
  children: ReactNode;
}) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="size-6" />
      </div>
    );
  }
  if (error) {
    return (
      <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
        {getErrorMessage(error)}
      </p>
    );
  }
  if (isEmpty) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        {emptyText}
      </p>
    );
  }
  return <>{children}</>;
}

export function TableCard({ children }: { children: ReactNode }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">{children}</table>
      </div>
    </Card>
  );
}

export function Th({ children }: { children?: ReactNode }) {
  return (
    <th className="bg-muted/50 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground whitespace-nowrap">
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("border-t px-4 py-3 align-middle", className)}>
      {children}
    </td>
  );
}
