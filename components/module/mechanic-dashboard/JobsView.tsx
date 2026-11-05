"use client";

import { useState } from "react";

import { useMechanicJobs } from "@/hooks";
import { DataState, FilterTabs, PageHeader } from "../admin/ui";
import { JobCard } from "./JobCard";
import { JobsMap } from "./JobsMap";

const STATUSES = ["ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export function JobsView() {
  const [status, setStatus] = useState("");
  const { data, isLoading, error } = useMechanicJobs(status || undefined);
  const jobs = data?.data ?? [];

  return (
    <>
      <PageHeader
        title="My jobs"
        description="Every request you accepted. Start, finish and collect payment here."
      />
      <FilterTabs options={STATUSES} value={status} onChange={setStatus} />
      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={jobs.length === 0}
        emptyText="No jobs found."
      >
        <JobsMap
          jobs={jobs.filter((j) =>
            ["ACCEPTED", "EN_ROUTE", "IN_PROGRESS"].includes(j.status),
          )}
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </DataState>
    </>
  );
}
