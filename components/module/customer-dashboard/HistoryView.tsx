"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useMyRequests } from "@/hooks";
import { formatDate, formatMoney, humanize } from "@/lib/format";
import { DataState, FilterTabs, PageHeader, StatusBadge } from "../admin/ui";
import { PayAndReview } from "./PayAndReview";

const STATUSES = [
  "PENDING",
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export function HistoryView() {
  const [status, setStatus] = useState("");
  const { data, isLoading, error } = useMyRequests(status || undefined);
  const requests = data?.data ?? [];

  return (
    <>
      <PageHeader
        title="My requests"
        description="Everything you asked for, with payment and rating."
      />
      <FilterTabs options={STATUSES} value={status} onChange={setStatus} />
      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={requests.length === 0}
        emptyText="You have no requests yet."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {requests.map((r) => (
            <Card key={r.id}>
              <CardContent className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{humanize(r.serviceType)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <StatusBadge value={r.status} />
                </div>
                {r.mechanic && (
                  <p className="text-sm text-muted-foreground">
                    Mechanic: {r.mechanic.user.name}
                  </p>
                )}
                {r.price != null && (
                  <p className="text-sm font-medium">{formatMoney(r.price)}</p>
                )}
                {(r.status === "COMPLETED" || r.payment) && (
                  <PayAndReview request={r} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </DataState>
    </>
  );
}
