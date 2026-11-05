"use client";

import { useMechanicJobs, useMechanicStats } from "@/hooks";
import { formatDate, formatMoney, humanize } from "@/lib/format";
import {
  DataState,
  PageHeader,
  StatusBadge,
  TableCard,
  Td,
  Th,
} from "../admin/ui";
import { Metric } from "./OverviewView";

export function EarningsView() {
  const stats = useMechanicStats();
  const jobs = useMechanicJobs("COMPLETED");

  const s = stats.data?.data;
  const rows = (jobs.data?.data ?? []).filter((job) => job.payment);

  return (
    <>
      <PageHeader title="Earnings" description="Money from completed jobs." />

      <DataState isLoading={stats.isLoading} error={stats.error} isEmpty={!s}>
        {s && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Metric label="Received" value={formatMoney(s.earnings.paid)} />
            <Metric
              label="Waiting for payment"
              value={formatMoney(s.earnings.unpaid)}
            />
            <Metric label="Completed jobs" value={s.jobs.completed} />
          </div>
        )}
      </DataState>

      <h2 className="mb-3 font-heading text-lg font-semibold">
        Payment history
      </h2>
      <DataState
        isLoading={jobs.isLoading}
        error={jobs.error}
        isEmpty={rows.length === 0}
        emptyText="No completed jobs yet."
      >
        <TableCard>
          <thead>
            <tr>
              <Th>Service</Th>
              <Th>Customer</Th>
              <Th>Amount</Th>
              <Th>Method</Th>
              <Th>Payment</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((job) => (
              <tr key={job.id}>
                <Td className="font-medium">{humanize(job.serviceType)}</Td>
                <Td>{job.customer.name}</Td>
                <Td>
                  {job.payment &&
                    formatMoney(job.payment.amount, job.payment.currency)}
                </Td>
                <Td>{job.payment && humanize(job.payment.method)}</Td>
                <Td>
                  {job.payment && <StatusBadge value={job.payment.status} />}
                </Td>
                <Td className="whitespace-nowrap">
                  {formatDate(job.updatedAt)}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableCard>
      </DataState>
    </>
  );
}
