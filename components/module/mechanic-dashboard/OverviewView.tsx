"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useMechanicJobs, useMechanicStats } from "@/hooks";
import { formatMoney } from "@/lib/format";
import { DataState, PageHeader } from "../admin/ui";
import { JobCard } from "./JobCard";
import { JobsMap } from "./JobsMap";

export function Metric({
  label,
  value,
  href,
  hint,
}: {
  label: string;
  value: ReactNode;
  href?: string;
  hint?: string;
}) {
  const card = (
    <Card className={href ? "transition-shadow hover:shadow-md" : undefined}>
      <CardContent>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-heading text-3xl font-semibold">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
  return href ? <Link href={href}>{card}</Link> : card;
}

export function OverviewView() {
  const stats = useMechanicStats();
  const jobs = useMechanicJobs();

  const s = stats.data?.data;
  const active = (jobs.data?.data ?? []).filter((job) =>
    ["ACCEPTED", "EN_ROUTE", "IN_PROGRESS"].includes(job.status),
  );

  return (
    <>
      <PageHeader
        title="Overview"
        description="Your jobs, earnings and rating at a glance."
      />

      <DataState isLoading={stats.isLoading} error={stats.error} isEmpty={!s}>
        {s && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              label="Active jobs"
              value={s.jobs.active}
              href="/mechanic/jobs"
            />
            <Metric
              label="Completed jobs"
              value={s.jobs.completed}
              href="/mechanic/jobs"
            />
            <Metric
              label="Earned"
              value={formatMoney(s.earnings.paid)}
              href="/mechanic/earnings"
            />
            <Metric
              label="Rating"
              value={s.rating > 0 ? s.rating.toFixed(1) : "-"}
              hint={s.rating > 0 ? "out of 5" : "No reviews yet"}
            />
          </div>
        )}
      </DataState>

      <h2 className="mt-8 mb-3 font-heading text-lg font-semibold">
        Jobs in progress
      </h2>
      <DataState
        isLoading={jobs.isLoading}
        error={jobs.error}
        isEmpty={active.length === 0}
        emptyText="No active jobs. Check nearby requests to pick one up."
      >
        <JobsMap jobs={active} height={300} />
        <div className="grid gap-4 lg:grid-cols-2">
          {active.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </DataState>
    </>
  );
}
