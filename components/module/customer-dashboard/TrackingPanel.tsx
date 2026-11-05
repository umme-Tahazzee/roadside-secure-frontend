"use client";

import * as Icons from "@/components/shared/icons";
import {
  etaMinutes,
  formatDistance,
  LiveMap,
  type MapLine,
  type MapMarker,
} from "@/components/shared/map/LiveMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useCancelRequest, useNearbyMechanics } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { humanize } from "@/lib/format";
import type { CustomerRequest } from "@/types";
import { StatusBadge } from "../admin/ui";

// live map for the customer's open request:
// - waiting: all nearby mechanics, the closest one is joined to the customer by a line
// - accepted: the assigned mechanic is joined to the customer, with distance and ETA
export function TrackingPanel({ request }: { request: CustomerRequest }) {
  const { mutate: cancel, isPending } = useCancelRequest();
  const waiting = request.status === "PENDING";
  const nearby = useNearbyMechanics(waiting ? request.id : undefined);

  const customer = { lat: request.pickupLat, lng: request.pickupLng };
  const markers: MapMarker[] = [
    {
      id: "customer",
      ...customer,
      kind: "customer",
      label: "Your location",
    },
  ];
  const lines: MapLine[] = [];

  const mechanicPos =
    request.mechanic?.currentLat != null && request.mechanic.currentLng != null
      ? { lat: request.mechanic.currentLat, lng: request.mechanic.currentLng }
      : null;

  const candidates = nearby.data?.data ?? [];
  const closest = candidates[0];
  let summary: string | null = null;

  if (waiting) {
    candidates.forEach((m, i) => {
      markers.push({
        id: m.id,
        lat: m.currentLat,
        lng: m.currentLng,
        kind: i === 0 ? "closest" : "mechanic",
        label: `${m.user.name} - ${formatDistance(m.distanceKm)}`,
      });
    });
    if (closest) {
      lines.push({
        from: [customer.lat, customer.lng],
        to: [closest.currentLat, closest.currentLng],
        label: `${formatDistance(closest.distanceKm)} - closest`,
      });
      summary = `${candidates.length} mechanic${candidates.length > 1 ? "s" : ""} nearby. Closest is ${closest.user.name}, ${formatDistance(closest.distanceKm)} away.`;
    } else if (!nearby.isLoading) {
      summary = "No online mechanic in range yet. We keep looking.";
    }
  } else if (mechanicPos && request.mechanic) {
    const km = request.distanceKm ?? 0;
    markers.push({
      id: request.mechanic.id,
      ...mechanicPos,
      kind: "closest",
      label: request.mechanic.user.name,
    });
    lines.push({
      from: [customer.lat, customer.lng],
      to: [mechanicPos.lat, mechanicPos.lng],
      label:
        request.status === "IN_PROGRESS"
          ? "Working on your vehicle"
          : `${formatDistance(km)} - about ${etaMinutes(km)} min`,
    });
  } else if (request.mechanic) {
    summary = "Your mechanic has not shared a location yet.";
  }

  const handleCancel = () => {
    if (!window.confirm("Cancel this request?")) return;
    cancel(request.id, {
      onSuccess: () =>
        toast.add({ title: "Request cancelled", type: "success" }),
      onError: (err) =>
        toast.add({
          title: "Could not cancel",
          description: getErrorMessage(err),
          type: "error",
        }),
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-medium">{humanize(request.serviceType)}</p>
            <p className="text-sm text-muted-foreground">
              {waiting
                ? "Waiting for a mechanic to accept."
                : request.status === "IN_PROGRESS"
                  ? "Your mechanic is working on it."
                  : "A mechanic accepted and is on the way."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge value={request.status} />
            {["PENDING", "ACCEPTED"].includes(request.status) && (
              <Button
                variant="outline"
                disabled={isPending}
                onClick={handleCancel}
              >
                Cancel request
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <LiveMap markers={markers} lines={lines} height={420} />

      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-3 rounded-full bg-red-600" /> You
        </span>
        <span className="flex items-center gap-1">
          <span className="size-3 rounded-full bg-green-600" /> Closest /
          assigned mechanic
        </span>
        <span className="flex items-center gap-1">
          <span className="size-3 rounded-full bg-blue-600" /> Other mechanics
        </span>
      </div>

      {summary && <p className="text-sm">{summary}</p>}

      {request.mechanic && (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-medium">{request.mechanic.user.name}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <Icons.Star className="size-3.5" />
                {request.mechanic.rating > 0
                  ? request.mechanic.rating.toFixed(1)
                  : "New"}
              </p>
            </div>
            {request.mechanic.user.phone && (
              <a
                href={`tel:${request.mechanic.user.phone}`}
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <Icons.Phone className="size-4" /> {request.mechanic.user.phone}
              </a>
            )}
          </CardContent>
        </Card>
      )}

      {waiting && candidates.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-heading text-sm font-semibold">
            Mechanics near you
          </h3>
          {candidates.map((m, i) => (
            <Card key={m.id}>
              <CardContent className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">
                    {m.user.name} {i === 0 && "(closest)"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Rating {m.rating > 0 ? m.rating.toFixed(1) : "new"}
                  </p>
                </div>
                <span className="text-sm">
                  {formatDistance(m.distanceKm)} - ~{etaMinutes(m.distanceKm)}{" "}
                  min
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
