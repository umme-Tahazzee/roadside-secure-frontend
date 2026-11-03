"use client";

import { useState } from "react";
import type { RefundAction } from "@/api";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAdminPayments, useAdminRefunds, useRefundAction } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { formatDate, formatMoney, humanize } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  DataState,
  FilterTabs,
  PageHeader,
  StatusBadge,
  TableCard,
  Td,
  Th,
} from "./ui";

const PAYMENT_STATUSES = [
  "UNPAID",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUND_REQUESTED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
];
const REFUND_STATUSES = [
  "REQUESTED",
  "APPROVED",
  "PROCESSING",
  "COMPLETED",
  "REJECTED",
  "FAILED",
];

function PaymentsTable() {
  const [status, setStatus] = useState("");
  const { data, isLoading, error } = useAdminPayments(status || undefined);
  const payments = data?.data ?? [];

  return (
    <>
      <FilterTabs
        options={PAYMENT_STATUSES}
        value={status}
        onChange={setStatus}
      />
      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={payments.length === 0}
        emptyText="No payments found."
      >
        <TableCard>
          <thead>
            <tr>
              <Th>Service</Th>
              <Th>Customer</Th>
              <Th>Amount</Th>
              <Th>Method</Th>
              <Th>Status</Th>
              <Th>Created</Th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <Td className="font-medium">
                  {humanize(payment.request.serviceType)}
                </Td>
                <Td>{payment.request.customer.name}</Td>
                <Td>{formatMoney(payment.amount, payment.currency)}</Td>
                <Td>{humanize(payment.method)}</Td>
                <Td>
                  <StatusBadge value={payment.status} />
                </Td>
                <Td className="whitespace-nowrap">
                  {formatDate(payment.createdAt)}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableCard>
      </DataState>
    </>
  );
}

function RefundsTable() {
  const [status, setStatus] = useState("REQUESTED");
  const { data, isLoading, error } = useAdminRefunds(status || undefined);
  const { mutate: act, isPending } = useRefundAction();
  const refunds = data?.data ?? [];

  const run = (id: string, action: RefundAction) => {
    if (!window.confirm(`${humanize(action)} this refund?`)) return;

    act(
      { id, action },
      {
        onSuccess: () =>
          toast.add({ title: `Refund ${action}d`, type: "success" }),
        onError: (err) =>
          toast.add({
            title: "Action failed",
            description: getErrorMessage(err),
            type: "error",
          }),
      },
    );
  };

  return (
    <>
      <FilterTabs
        options={REFUND_STATUSES}
        value={status}
        onChange={setStatus}
      />
      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={refunds.length === 0}
        emptyText="No refunds found."
      >
        <TableCard>
          <thead>
            <tr>
              <Th>Customer</Th>
              <Th>Service</Th>
              <Th>Refund</Th>
              <Th>Reason</Th>
              <Th>Status</Th>
              <Th>Requested</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {refunds.map((refund) => (
              <tr key={refund.id}>
                <Td>{refund.payment.request.customer.name}</Td>
                <Td>{humanize(refund.payment.request.serviceType)}</Td>
                <Td>
                  {formatMoney(refund.amount)}
                  <span className="block text-xs text-muted-foreground">
                    of {formatMoney(refund.payment.amount)}
                  </span>
                </Td>
                <Td className="max-w-xs whitespace-normal">{refund.reason}</Td>
                <Td>
                  <StatusBadge value={refund.status} />
                </Td>
                <Td className="whitespace-nowrap">
                  {formatDate(refund.createdAt)}
                </Td>
                <Td>
                  <div className="flex justify-end gap-2">
                    {refund.status === "REQUESTED" && (
                      <>
                        <Button
                          size="sm"
                          disabled={isPending}
                          onClick={() => run(refund.id, "approve")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={isPending}
                          onClick={() => run(refund.id, "reject")}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {refund.status === "APPROVED" && (
                      <Button
                        size="sm"
                        disabled={isPending}
                        onClick={() => run(refund.id, "process")}
                      >
                        Process
                      </Button>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableCard>
      </DataState>
    </>
  );
}

export function PaymentsView() {
  const [tab, setTab] = useState<"payments" | "refunds">("refunds");

  return (
    <>
      <PageHeader
        title="Payments"
        description="Track payments and handle refund requests."
      />

      <div className="mb-6 flex gap-6 border-b">
        {(["refunds", "payments"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "-mb-px border-b-2 px-1 pb-2 text-sm font-medium capitalize",
              tab === item
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "refunds" ? <RefundsTable /> : <PaymentsTable />}
    </>
  );
}
