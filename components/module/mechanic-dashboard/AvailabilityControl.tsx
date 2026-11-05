"use client";

import { useEffect } from "react";

import * as Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useSetAvailability, useUpdateLocation } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { cn } from "@/lib/utils";
import type { MechanicProfile } from "@/types";

// asks the browser for the current position, then saves it
export function useShareLocation() {
  const { mutateAsync: saveLocation, isPending } = useUpdateLocation();

  const share = () =>
    new Promise<void>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("This browser cannot share your location."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            await saveLocation({ lat: coords.latitude, lng: coords.longitude });
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        () => reject(new Error("Allow location access to find jobs near you.")),
        { enableHighAccuracy: true, timeout: 15_000 },
      );
    });

  return { share, isPending };
}

// online/offline switch + "update my location", shown on top of every page
export function AvailabilityControl({ profile }: { profile: MechanicProfile }) {
  const { mutate: setAvailable, isPending } = useSetAvailability();
  const { share, isPending: isLocating } = useShareLocation();

  // while online, send the position every 15 seconds so the customer sees the mechanic move
  const { mutate: pushLocation } = useUpdateLocation();
  useEffect(() => {
    if (!profile.isAvailable || !navigator.geolocation) return;
    const send = () =>
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          pushLocation({ lat: coords.latitude, lng: coords.longitude }),
        () => {},
        { enableHighAccuracy: true, timeout: 10_000 },
      );
    const timer = setInterval(send, 15_000);
    return () => clearInterval(timer);
  }, [profile.isAvailable, pushLocation]);

  const hasLocation = profile.currentLat != null && profile.currentLng != null;

  const toggle = () => {
    const goOnline = !profile.isAvailable;
    setAvailable(goOnline, {
      onSuccess: () =>
        toast.add({
          title: goOnline ? "You are online" : "You are offline",
          type: "success",
        }),
      onError: (err) =>
        toast.add({
          title: "Could not change status",
          description: getErrorMessage(err),
          type: "error",
        }),
    });
  };

  const updateLocation = async () => {
    try {
      await share();
      toast.add({ title: "Location updated", type: "success" });
    } catch (err) {
      toast.add({
        title: "Location not updated",
        description: getErrorMessage(err),
        type: "error",
      });
    }
  };

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-card p-4">
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "size-3 rounded-full",
            profile.isAvailable ? "bg-emerald-500" : "bg-muted-foreground/40",
          )}
        />
        <div>
          <p className="text-sm font-medium">
            {profile.isAvailable ? "You are online" : "You are offline"}
          </p>
          <p className="text-xs text-muted-foreground">
            {hasLocation
              ? "Location saved. Update it when you move."
              : "Share your location to see requests near you."}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={isLocating}
          onClick={updateLocation}
        >
          <Icons.Navigation />
          {isLocating ? "Locating..." : "Update location"}
        </Button>
        <Button
          variant={profile.isAvailable ? "outline" : "default"}
          disabled={isPending}
          onClick={toggle}
        >
          {profile.isAvailable ? "Go offline" : "Go online"}
        </Button>
      </div>
    </div>
  );
}
