"use client";

import { Suspense } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useActiveRequest, useMyRequests } from "@/hooks";
import { formatMoney, humanize } from "@/lib/format";
import { DataState, PageHeader } from "../admin/ui";
import { NewRequestForm } from "./NewRequestForm";
import { PayAndReview } from "./PayAndReview";
import { TrackingPanel } from "./TrackingPanel";

export function HelpView() {
  const active = useActiveRequest();
  const history = useMyRequests("COMPLETED");

  const request = active.data?.data ?? null;

  // finished jobs that still wait for a payment or a rating
  const toFinish = (history.data?.data ?? []).filter(
    (r) =>
      !r.review ||
      (r.payment?.method === "BKASH" &&
        ["UNPAID", "PENDING", "FAILED"].includes(r.payment.status)),
  );

  return (
    <>
      <PageHeader
        title={request ? "Your request" : "Get roadside help"}
        description={
          request
            ? "Follow your mechanic on the map."
            : "Tell us what happened and where you are. The closest mechanic is shown on the map."
        }
      />

      <DataState
        isLoading={active.isLoading}
        error={active.error}
        isEmpty={false}
      >
        {request ? (
          <TrackingPanel request={request} />
        ) : (
          <Suspense>
            <NewRequestForm />
          </Suspense>
        )}
      </DataState>

      {toFinish.length > 0 && (
        <div className="mt-10 space-y-3">
          <h2 className="font-heading text-lg font-semibold">Finish up</h2>
          {toFinish.map((r) => (
            <Card key={r.id}>
              <CardContent className="space-y-3">
                <p className="font-medium">
                  {humanize(r.serviceType)}
                  {r.price != null && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      {formatMoney(r.price)}
                    </span>
                  )}
                </p>
                <PayAndReview request={r} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
