"use client";

import { useState } from "react";

import * as Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import {
  useAcceptRequest,
  useCompleteJob,
  useConfirmCash,
  useStartJob,
} from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { formatDate, formatMoney, humanize } from "@/lib/format";
import type { MechanicJob } from "@/types";
import { StatusBadge } from "../admin/ui";

// the same success / error toasts for every button on the card
function callbacks(success: string, after?: () => void) {
  return {
    onSuccess: () => {
      toast.add({ title: success, type: "success" });
      after?.();
    },
    onError: (err: unknown) =>
      toast.add({
        title: "Action failed",
        description: getErrorMessage(err),
        type: "error",
      }),
  };
}

// one request/job with the buttons that make sense for its current status
export function JobCard({ job }: { job: MechanicJob }) {
  const accept = useAcceptRequest();
  const start = useStartJob();
  const complete = useCompleteJob();
  const confirmCash = useConfirmCash();

  const [completing, setCompleting] = useState(false);
  const [price, setPrice] = useState("");
  const [method, setMethod] = useState<"CASH" | "BKASH">("CASH");

  const busy =
    accept.isPending ||
    start.isPending ||
    complete.isPending ||
    confirmCash.isPending;

  const submitComplete = () => {
    const finalPrice = Number(price);
    if (!Number.isFinite(finalPrice) || finalPrice <= 0) {
      toast.add({ title: "Enter a valid price", type: "error" });
      return;
    }
    complete.mutate(
      { id: job.id, finalPrice, method },
      callbacks("Job completed", () => setCompleting(false)),
    );
  };

  const payment = job.payment;
  const needsCashConfirm =
    job.status === "COMPLETED" &&
    payment?.method === "CASH" &&
    payment.status === "UNPAID";

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="font-medium">{humanize(job.serviceType)}</p>
            <p className="text-xs text-muted-foreground">
              {formatDate(job.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {job.distanceKm != null && (
              <span className="text-xs text-muted-foreground">
                {job.distanceKm.toFixed(1)} km away
              </span>
            )}
            <StatusBadge value={job.status} />
          </div>
        </div>

        {job.description && (
          <p className="text-sm text-muted-foreground">{job.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span>{job.customer.name}</span>
          {job.customer.phone && (
            <a
              href={`tel:${job.customer.phone}`}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <Icons.Phone className="size-3.5" /> {job.customer.phone}
            </a>
          )}
          <a
            href={`https://www.google.com/maps?q=${job.pickupLat},${job.pickupLng}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <Icons.MapPin className="size-3.5" /> Open map
          </a>
          {job.price != null && (
            <span className="font-medium">{formatMoney(job.price)}</span>
          )}
          {payment && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              {humanize(payment.method)}
              <StatusBadge value={payment.status} />
            </span>
          )}
        </div>

        {completing && (
          <div className="flex flex-wrap items-end gap-2 rounded-xl bg-muted/50 p-3">
            <label className="text-xs" htmlFor={`price-${job.id}`}>
              Final price (BDT)
              <Input
                id={`price-${job.id}`}
                type="number"
                min="1"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-36"
              />
            </label>
            <label className="text-xs" htmlFor={`method-${job.id}`}>
              Payment
              <select
                id={`method-${job.id}`}
                value={method}
                onChange={(e) => setMethod(e.target.value as "CASH" | "BKASH")}
                className="mt-1 block h-8 rounded-2xl border bg-background px-2 text-sm"
              >
                <option value="CASH">Cash</option>
                <option value="BKASH">bKash</option>
              </select>
            </label>
            <Button disabled={busy} onClick={submitComplete}>
              Confirm
            </Button>
            <Button variant="outline" onClick={() => setCompleting(false)}>
              Cancel
            </Button>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {job.status === "PENDING" && (
            <Button
              disabled={busy}
              onClick={() =>
                accept.mutate(job.id, callbacks("Request accepted"))
              }
            >
              Accept request
            </Button>
          )}
          {job.status === "ACCEPTED" && (
            <Button
              disabled={busy}
              onClick={() => start.mutate(job.id, callbacks("Job started"))}
            >
              Start job
            </Button>
          )}
          {job.status === "IN_PROGRESS" && !completing && (
            <Button disabled={busy} onClick={() => setCompleting(true)}>
              Complete job
            </Button>
          )}
          {needsCashConfirm && payment && (
            <Button
              disabled={busy}
              onClick={() =>
                confirmCash.mutate(
                  payment.id,
                  callbacks("Cash payment confirmed"),
                )
              }
            >
              Cash received
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
