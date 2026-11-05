"use client";

import { usePendingRequests } from "@/hooks";
import { DataState, PageHeader } from "../admin/ui";
import { JobCard } from "./JobCard";
import { JobsMap } from "./JobsMap";

export function NearbyRequestsView() {
  const { data, isLoading, error } = usePendingRequests();
  const requests = data?.data ?? [];

  return (
    <>
      <PageHeader
        title="Nearby requests"
        description="Customers waiting for help inside your service radius. This list refreshes every 15 seconds."
      />
      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={requests.length === 0}
        emptyText="No requests near you right now."
      >
        <JobsMap jobs={requests} />
        <div className="grid gap-4 lg:grid-cols-2">
          {requests.map((request) => (
            <JobCard key={request.id} job={request} />
          ))}
        </div>
      </DataState>
    </>
  );
}
