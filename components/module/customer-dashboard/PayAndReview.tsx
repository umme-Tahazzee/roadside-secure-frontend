"use client";

import { useState } from "react";

import * as Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useRequestRefund, useReviewRequest, useStartBkash } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { cn } from "@/lib/utils";
import type { CustomerRequest } from "@/types";

function fail(title: string) {
  return (err: unknown) =>
    toast.add({ title, description: getErrorMessage(err), type: "error" });
}

// payment, refund and rating for a finished job
export function PayAndReview({ request }: { request: CustomerRequest }) {
  const bkash = useStartBkash();
  const refund = useRequestRefund();
  const review = useReviewRequest();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const payment = request.payment;

  const pay = () => {
    if (!payment) return;
    bkash.mutate(payment.id, {
      onSuccess: (res) => {
        window.open(res.data.checkoutUrl, "_blank", "noopener");
        toast.add({ title: "bKash checkout opened", type: "success" });
      },
      onError: fail("Could not start payment"),
    });
  };

  const askRefund = () => {
    if (!payment) return;
    const reason = window.prompt("Why do you want a refund?");
    if (!reason || reason.trim().length < 3) return;
    refund.mutate(
      { paymentId: payment.id, amount: payment.amount, reason: reason.trim() },
      {
        onSuccess: () =>
          toast.add({ title: "Refund requested", type: "success" }),
        onError: fail("Refund failed"),
      },
    );
  };

  const sendReview = () => {
    if (rating < 1) {
      toast.add({ title: "Pick a star rating", type: "error" });
      return;
    }
    review.mutate(
      { id: request.id, rating, comment: comment.trim() },
      {
        onSuccess: () =>
          toast.add({ title: "Thanks for rating", type: "success" }),
        onError: fail("Could not send review"),
      },
    );
  };

  return (
    <div className="space-y-3 border-t pt-3">
      {payment && (
        <div className="flex flex-wrap items-center gap-2">
          {payment.method === "BKASH" &&
            ["UNPAID", "PENDING", "FAILED"].includes(payment.status) && (
              <Button disabled={bkash.isPending} onClick={pay}>
                Pay {payment.amount} {payment.currency} with bKash
              </Button>
            )}
          {payment.method === "CASH" && payment.status === "UNPAID" && (
            <p className="text-sm text-muted-foreground">
              Pay {payment.amount} {payment.currency} in cash to your mechanic.
            </p>
          )}
          {payment.status === "PAID" && (
            <Button
              variant="outline"
              disabled={refund.isPending}
              onClick={askRefund}
            >
              Request refund
            </Button>
          )}
        </div>
      )}

      {request.status === "COMPLETED" &&
        (request.review ? (
          <p className="flex items-center gap-1 text-sm">
            <Icons.Star className="size-4 fill-amber-400 text-amber-400" />
            You rated this job {request.review.rating}/5
          </p>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  onClick={() => setRating(n)}
                >
                  <Icons.Star
                    className={cn(
                      "size-6",
                      n <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground",
                    )}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              maxLength={500}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the service? (optional)"
              className="block min-h-16 w-full rounded-2xl border bg-background px-3 py-2 text-sm"
            />
            <Button disabled={review.isPending} onClick={sendReview}>
              Send review
            </Button>
          </div>
        ))}
    </div>
  );
}
