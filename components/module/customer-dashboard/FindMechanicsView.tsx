"use client";

import Link from "next/link";
import { useState } from "react";

import { SERVICE_OPTIONS } from "@/components/module/form/constants";
import * as Icons from "@/components/shared/icons";
import {
  etaMinutes,
  formatDistance,
  LiveMap,
  type MapLine,
  type MapMarker,
} from "@/components/shared/map/LiveMap";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useMechanicSearch } from "@/hooks";
import { humanize } from "@/lib/format";
import { cn } from "@/lib/utils";
import { DataState, PageHeader } from "../admin/ui";

const RADIUS_OPTIONS = [5, 10, 20, 50];

interface Point {
  lat: number;
  lng: number;
}

// "Who is near me?" - works before a request is made, so a customer can see
// the closest online mechanics, their rating and their distance first.
export function FindMechanicsView() {
  const [point, setPoint] = useState<Point | null>(null);
  const [serviceType, setServiceType] = useState("");
  const [radiusKm, setRadiusKm] = useState(10);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const search = useMechanicSearch(
    point
      ? {
          ...point,
          radiusKm,
          serviceType: serviceType.toLowerCase() || undefined,
        }
      : null,
  );
  const mechanics = search.data?.data ?? [];

  const locate = () => {
    if (!navigator.geolocation) {
      toast.add({ title: "Location is not supported here", type: "error" });
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPoint({ lat: coords.latitude, lng: coords.longitude });
        setLocating(false);
      },
      () => {
        setLocating(false);
        toast.add({
          title: "Could not get your location",
          description:
            "Allow location access, or click the map to choose a spot.",
          type: "error",
        });
      },
      { enableHighAccuracy: true, timeout: 15_000 },
    );
  };

  // the selected mechanic, otherwise the closest one, is joined to the customer
  const focus = mechanics.find((m) => m.id === selectedId) ?? mechanics[0];

  const markers: MapMarker[] = [];
  const lines: MapLine[] = [];
  if (point) {
    markers.push({ id: "me", ...point, kind: "customer", label: "You" });
  }
  mechanics.forEach((m, i) => {
    markers.push({
      id: m.id,
      lat: m.lat,
      lng: m.lng,
      kind: m.id === focus?.id ? "closest" : "mechanic",
      label: `${m.name} - ${formatDistance(m.distanceKm)}${i === 0 ? " (closest)" : ""}`,
    });
  });
  if (point && focus) {
    lines.push({
      from: [point.lat, point.lng],
      to: [focus.lat, focus.lng],
      label: `${formatDistance(focus.distanceKm)} - about ${etaMinutes(focus.distanceKm)} min`,
    });
  }

  // sends the choices to the request form
  const requestHref = (service?: string) => {
    if (!point) return "/customer";
    const params = new URLSearchParams({
      lat: String(point.lat),
      lng: String(point.lng),
    });
    const type = service ?? serviceType;
    if (type) params.set("service", type);
    return `/customer?${params}`;
  };

  return (
    <>
      <PageHeader
        title="Find mechanics near you"
        description="See who is online around you, how far they are and how they are rated."
      />

      <Card className="mb-4">
        <CardContent className="flex flex-wrap items-end gap-3">
          <Button onClick={locate} disabled={locating}>
            <Icons.Navigation /> {locating ? "Locating..." : "Use my location"}
          </Button>

          <label className="text-xs" htmlFor="find-service">
            Service
            <select
              id="find-service"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="mt-1 block h-8 rounded-2xl border bg-background px-2 text-sm"
            >
              <option value="">Any service</option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs" htmlFor="find-radius">
            Within
            <select
              id="find-radius"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="mt-1 block h-8 rounded-2xl border bg-background px-2 text-sm"
            >
              {RADIUS_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r} km
                </option>
              ))}
            </select>
          </label>

          <p className="text-xs text-muted-foreground">
            Or click the map to search from another spot.
          </p>
        </CardContent>
      </Card>

      <LiveMap
        height={400}
        markers={markers}
        lines={lines}
        onPick={(lat, lng) => setPoint({ lat, lng })}
      />

      <div className="mt-6">
        {!point ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Choose your location to see mechanics around you.
          </p>
        ) : (
          <DataState
            isLoading={search.isLoading}
            error={search.error}
            isEmpty={mechanics.length === 0}
            emptyText="No online mechanic covers this spot right now. Try a bigger distance or another service."
          >
            <p className="mb-3 text-sm text-muted-foreground">
              {mechanics.length} mechanic{mechanics.length > 1 ? "s" : ""}{" "}
              online near you. List updates every 20 seconds.
            </p>
            <div className="grid gap-3 lg:grid-cols-2">
              {mechanics.map((m, i) => (
                <Card
                  key={m.id}
                  className={cn(
                    "cursor-pointer transition-shadow hover:shadow-md",
                    m.id === focus?.id && "ring-2 ring-primary",
                  )}
                  onClick={() => setSelectedId(m.id)}
                >
                  <CardContent className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">
                          {m.name}
                          {i === 0 && (
                            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-emerald-700">
                              Closest
                            </span>
                          )}
                        </p>
                        <p className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icons.Star className="size-3.5" />
                            {m.rating > 0 ? m.rating.toFixed(1) : "New"}
                          </span>
                          <span>{m.completedJobs} jobs done</span>
                        </p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-medium">
                          {formatDistance(m.distanceKm)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ~{etaMinutes(m.distanceKm)} min
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      {m.serviceTypes.map(humanize).join(", ")}
                    </p>

                    <Link
                      href={requestHref(
                        serviceType || m.serviceTypes[0]?.toUpperCase(),
                      )}
                      className={buttonVariants({ size: "sm" })}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Request help
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DataState>
        )}
      </div>
    </>
  );
}
