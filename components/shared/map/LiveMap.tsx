"use client";

import dynamic from "next/dynamic";

import { Spinner } from "@/components/ui/spinner";

// Leaflet touches `window`, so it must only load in the browser
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] items-center justify-center rounded-2xl border bg-muted/40">
      <Spinner className="size-6" />
    </div>
  ),
});

export type { MapLine, MapMarker } from "./MapCanvas";
export const LiveMap = MapCanvas;

const R = 6371;

// straight-line distance in km, same formula as the backend
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) *
      Math.cos(rad(b.lat)) *
      Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function formatDistance(km: number) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

// roughly 30 km/h in city traffic
export function etaMinutes(km: number) {
  return Math.max(1, Math.round((km / 30) * 60));
}
