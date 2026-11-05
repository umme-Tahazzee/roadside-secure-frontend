"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { SERVICE_OPTIONS } from "@/components/module/form/constants";
import * as Icons from "@/components/shared/icons";
import { LiveMap } from "@/components/shared/map/LiveMap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useCreateRequest } from "@/hooks";
import { getErrorMessage } from "@/lib/error";

interface Point {
  lat: number;
  lng: number;
}

// customer picks the service and drops a pin where the vehicle is stuck
export function NewRequestForm() {
  const { mutate: create, isPending } = useCreateRequest();
  const [serviceType, setServiceType] = useState<string>(
    SERVICE_OPTIONS[0].value,
  );
  const [description, setDescription] = useState("");
  const [point, setPoint] = useState<Point | null>(null);
  const [locating, setLocating] = useState(false);

  const useMyLocation = () => {
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
          description: "Allow location access, or click the map to drop a pin.",
          type: "error",
        });
      },
      { enableHighAccuracy: true, timeout: 15_000 },
    );
  };

  const submit = () => {
    if (!point) {
      toast.add({
        title: "Pick your location on the map first",
        type: "error",
      });
      return;
    }
    create(
      {
        serviceType,
        description: description.trim() || undefined,
        pickupLat: point.lat,
        pickupLng: point.lng,
      },
      {
        onSuccess: (res) =>
          toast.add({
            title: "Request sent",
            description: `${res.data.nearbyMechanicsCount} mechanic(s) can see it now.`,
            type: "success",
          }),
        onError: (err) =>
          toast.add({
            title: "Could not send request",
            description: getErrorMessage(err),
            type: "error",
          }),
      },
    );
  };

  return (
    <Card>
      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm" htmlFor="serviceType">
            What do you need?
            <select
              id="serviceType"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="mt-1 block h-9 w-full rounded-2xl border bg-background px-3 text-sm"
            >
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm" htmlFor="description">
            Details (optional)
            <textarea
              id="description"
              value={description}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Car model, what happened..."
              className="mt-1 block min-h-9 w-full rounded-2xl border bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium">Where are you?</p>
            <Button
              variant="outline"
              disabled={locating}
              onClick={useMyLocation}
            >
              <Icons.Navigation />{" "}
              {locating ? "Locating..." : "Use my location"}
            </Button>
          </div>
          <LiveMap
            height={360}
            fit={Boolean(point)}
            onPick={(lat, lng) => setPoint({ lat, lng })}
            markers={
              point
                ? [
                    {
                      id: "me",
                      ...point,
                      kind: "customer",
                      label: "Pickup point",
                    },
                  ]
                : []
            }
          />
          <p className="text-xs text-muted-foreground">
            {point
              ? `Pin at ${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}. Click the map to move it.`
              : "Click the map to drop a pin, or use your location."}
          </p>
        </div>

        <Button disabled={isPending} onClick={submit}>
          {isPending ? "Sending..." : "Request help"}
        </Button>
      </CardContent>
    </Card>
  );
}
