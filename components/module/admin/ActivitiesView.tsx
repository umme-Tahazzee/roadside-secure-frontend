"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAdminActivities } from "@/hooks";
import { formatDate, humanize } from "@/lib/format";
import type { AdminAction } from "@/types";
import {
  DataState,
  FilterTabs,
  PageHeader,
  StatusBadge,
  TableCard,
  Td,
  Th,
} from "./ui";

const LIMIT = 20;

const ACTIONS: AdminAction[] = [
  "USER_BLOCKED",
  "USER_UNBLOCKED",
  "MECHANIC_APPROVED",
  "MECHANIC_REJECTED",
  "REFUND_APPROVED",
  "REFUND_REJECTED",
  "REFUND_PROCESSED",
];

// the action name is shown as a badge, so reuse the colours of the matching status
const BADGE_VALUE: Record<AdminAction, string> = {
  USER_BLOCKED: "BLOCKED",
  USER_UNBLOCKED: "ACTIVE",
  MECHANIC_APPROVED: "APPROVED",
  MECHANIC_REJECTED: "REJECTED",
  REFUND_APPROVED: "APPROVED",
  REFUND_REJECTED: "REJECTED",
  REFUND_PROCESSED: "COMPLETED",
};

export function ActivitiesView() {
  const [action, setAction] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useAdminActivities({
    page,
    limit: LIMIT,
    action: (action || undefined) as AdminAction | undefined,
  });

  const items = data?.data.items ?? [];
  const meta = data?.data.meta;

  const changeFilter = (value: string) => {
    setAction(value);
    setPage(1);
  };

  return (
    <>
      <PageHeader
        title="Activity log"
        description="What admins did: blocks, approvals and refund decisions."
      />
      <FilterTabs options={ACTIONS} value={action} onChange={changeFilter} />

      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={items.length === 0}
        emptyText="No activity yet."
      >
        <TableCard>
          <thead>
            <tr>
              <Th>When</Th>
              <Th>Admin</Th>
              <Th>Action</Th>
              <Th>Details</Th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <Td className="whitespace-nowrap">
                  {formatDate(item.createdAt)}
                </Td>
                <Td>
                  <p className="font-medium">{item.admin.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.admin.email}
                  </p>
                </Td>
                <Td>
                  <span title={humanize(item.action)}>
                    <StatusBadge value={BADGE_VALUE[item.action]} />
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {humanize(item.action)}
                  </p>
                </Td>
                <Td>{item.description}</Td>
              </tr>
            ))}
          </tbody>
        </TableCard>

        {meta && meta.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Page {meta.page} of {meta.totalPages} ({meta.total} entries)
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= meta.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </DataState>
    </>
  );
}
