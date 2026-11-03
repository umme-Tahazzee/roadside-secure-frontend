"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import {
  useAdminMechanics,
  useApproveMechanic,
  useRejectMechanic,
} from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { formatDate, humanize } from "@/lib/format";
import {
  DataState,
  FilterTabs,
  PageHeader,
  StatusBadge,
  TableCard,
  Td,
  Th,
} from "./ui";

const STATUSES = ["PENDING", "APPROVED", "REJECTED", "SUSPENDED"];

function DocLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline-offset-4 hover:underline"
    >
      {label}
    </a>
  );
}

export function MechanicsView() {
  // start on PENDING, because approving applications is the main job here
  const [status, setStatus] = useState("PENDING");
  const { data, isLoading, error } = useAdminMechanics(status || undefined);
  const approve = useApproveMechanic();
  const reject = useRejectMechanic();

  const profiles = data?.data ?? [];
  const busy = approve.isPending || reject.isPending;

  const decide = (
    id: string,
    email: string,
    decision: "approve" | "reject",
  ) => {
    if (!window.confirm(`${humanize(decision)} mechanic ${email}?`)) return;

    const mutation = decision === "approve" ? approve : reject;
    mutation.mutate(id, {
      onSuccess: () =>
        toast.add({
          title:
            decision === "approve" ? "Mechanic approved" : "Mechanic rejected",
          type: "success",
        }),
      onError: (err) =>
        toast.add({
          title: "Action failed",
          description: getErrorMessage(err),
          type: "error",
        }),
    });
  };

  return (
    <>
      <PageHeader
        title="Mechanics"
        description="Check the documents, then approve or reject each application."
      />
      <FilterTabs options={STATUSES} value={status} onChange={setStatus} />

      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={profiles.length === 0}
        emptyText="No mechanic profiles found."
      >
        <TableCard>
          <thead>
            <tr>
              <Th>Mechanic</Th>
              <Th>Services</Th>
              <Th>Radius</Th>
              <Th>Documents</Th>
              <Th>Status</Th>
              <Th>Applied</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <Td>
                  <p className="font-medium">{profile.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {profile.user.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profile.user.phone ?? ""}
                  </p>
                </Td>
                <Td>{profile.serviceTypes.map(humanize).join(", ")}</Td>
                <Td>{profile.serviceRadius} km</Td>
                <Td>
                  <div className="flex flex-col gap-1">
                    <DocLink href={profile.nidDoc} label="NID" />
                    <DocLink href={profile.licenseDoc} label="License" />
                    {profile.vehiclePhoto.map((url, index) => (
                      <DocLink
                        key={url}
                        href={url}
                        label={`Vehicle photo ${index + 1}`}
                      />
                    ))}
                  </div>
                </Td>
                <Td>
                  <StatusBadge value={profile.status} />
                </Td>
                <Td className="whitespace-nowrap">
                  {formatDate(profile.createdAt)}
                </Td>
                <Td>
                  {profile.status === "PENDING" && (
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        disabled={busy}
                        onClick={() =>
                          decide(profile.id, profile.user.email, "approve")
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={busy}
                        onClick={() =>
                          decide(profile.id, profile.user.email, "reject")
                        }
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </TableCard>
      </DataState>
    </>
  );
}
