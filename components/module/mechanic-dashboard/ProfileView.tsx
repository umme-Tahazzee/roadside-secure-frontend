"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMe, useMyMechanicProfile } from "@/hooks";
import { humanize } from "@/lib/format";
import { DataState, PageHeader, StatusBadge } from "../admin/ui";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap justify-between gap-2 border-b py-3 text-sm last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{children}</span>
    </div>
  );
}

export function ProfileView() {
  const me = useGetMe().data?.data;
  const { data, isLoading, error } = useMyMechanicProfile();
  const profile = data?.data;

  return (
    <>
      <PageHeader
        title="Profile"
        description="Your account and service details."
      />
      <DataState isLoading={isLoading} error={error} isEmpty={!profile}>
        {profile && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent>
                <Row label="Name">{me?.name}</Row>
                <Row label="Email">{me?.email}</Row>
                <Row label="Phone">{me?.phone ?? "-"}</Row>
                <Row label="Status">
                  <StatusBadge value={profile.status} />
                </Row>
                <Row label="Service radius">{profile.serviceRadius} km</Row>
                <Row label="Rating">
                  {profile.rating > 0
                    ? profile.rating.toFixed(1)
                    : "No reviews yet"}
                </Row>
                <Row label="Services">
                  {profile.serviceTypes.map(humanize).join(", ")}
                </Row>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p className="mb-3 text-sm font-medium">Vehicle photos</p>
                {profile.vehiclePhoto.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No photos.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {profile.vehiclePhoto.map((url) => (
                      // biome-ignore lint/performance/noImgElement: remote cloudinary urls
                      <img
                        key={url}
                        src={url}
                        alt="Vehicle"
                        className="aspect-video w-full rounded-xl object-cover"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </DataState>
    </>
  );
}
