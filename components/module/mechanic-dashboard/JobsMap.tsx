"use client";

import {
  distanceKm,
  etaMinutes,
  formatDistance,
  LiveMap,
  type MapLine,
  type MapMarker,
} from "@/components/shared/map/LiveMap";
import { useMyMechanicProfile } from "@/hooks";
import { humanize } from "@/lib/format";
import type { MechanicJob } from "@/types";

// mechanic's own position + the customers' pins.
// A dashed line joins the mechanic to the closest customer (the one to go to first).
export function JobsMap({
  jobs,
  height = 340,
}: {
  jobs: MechanicJob[];
  height?: number;
}) {
  const profile = useMyMechanicProfile().data?.data;
  const me =
    profile?.currentLat != null && profile.currentLng != null
      ? { lat: profile.currentLat, lng: profile.currentLng }
      : null;

  if (jobs.length === 0 && !me) return null;

  const ranked = jobs
    .map((job) => ({
      job,
      km:
        job.distanceKm ??
        (me
          ? distanceKm(me, { lat: job.pickupLat, lng: job.pickupLng })
          : null),
    }))
    .sort((a, b) => (a.km ?? Infinity) - (b.km ?? Infinity));

  const markers: MapMarker[] = ranked.map(({ job, km }) => ({
    id: job.id,
    lat: job.pickupLat,
    lng: job.pickupLng,
    kind: "customer",
    label: `${job.customer.name} - ${humanize(job.serviceType)}${km != null ? ` - ${formatDistance(km)}` : ""}`,
  }));
  if (me) markers.push({ id: "me", ...me, kind: "me", label: "You" });

  const lines: MapLine[] = [];
  const first = ranked[0];
  if (me && first?.km != null) {
    lines.push({
      from: [me.lat, me.lng],
      to: [first.job.pickupLat, first.job.pickupLng],
      label: `${formatDistance(first.km)} - about ${etaMinutes(first.km)} min`,
    });
  }

  return (
    <div className="mb-6 space-y-2">
      <LiveMap markers={markers} lines={lines} height={height} />
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-3 rounded-full bg-violet-600" /> You
        </span>
        <span className="flex items-center gap-1">
          <span className="size-3 rounded-full bg-red-600" /> Customer
        </span>
        {!me && <span>Update your location to see distances.</span>}
      </div>
    </div>
  );
}
