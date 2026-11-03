"use client";

import { useState } from "react";

import { useAdminRequests } from "@/hooks";
import { formatDate, formatMoney, humanize } from "@/lib/format";
import {
  DataState,
  FilterTabs,
  PageHeader,
  StatusBadge,
  TableCard,
  Td,
  Th,
} from "./ui";

const STATUSES = [
  "PENDING",
  "ACCEPTED",
  "EN_ROUTE",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export function RequestsView() {
  const [status, setStatus] = useState("");
  const { data, isLoading, error } = useAdminRequests(status || undefined);

  const requests = data?.data ?? [];

  return (
    <>
      <PageHeader
        title="Service requests"
        description="Every roadside request from customers."
      />
      <FilterTabs options={STATUSES} value={status} onChange={setStatus} />

      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={requests.length === 0}
        emptyText="No requests found."
      >
        <TableCard>
          <thead>
            <tr>
              <Th>Service</Th>
              <Th>Customer</Th>
              <Th>Mechanic</Th>
              <Th>Status</Th>
              <Th>Price</Th>
              <Th>Created</Th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <Td>
                  <p className="font-medium">{humanize(request.serviceType)}</p>
                  {request.description && (
                    <p className="max-w-xs truncate text-xs text-muted-foreground">
                      {request.description}
                    </p>
                  )}
                </Td>
                <Td>
                  <p>{request.customer.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {request.customer.phone ?? ""}
                  </p>
                </Td>
                <Td>
                  {request.mechanic ? (
                    <>
                      <p>{request.mechanic.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.mechanic.user.phone ?? ""}
                      </p>
                    </>
                  ) : (
                    <span className="text-muted-foreground">Not assigned</span>
                  )}
                </Td>
                <Td>
                  <StatusBadge value={request.status} />
                </Td>
                <Td>
                  {request.price != null ? formatMoney(request.price) : "-"}
                </Td>
                <Td className="whitespace-nowrap">
                  {formatDate(request.createdAt)}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableCard>
      </DataState>
    </>
  );
}
