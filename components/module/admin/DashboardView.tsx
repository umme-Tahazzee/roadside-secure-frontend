"use client";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { useAdminDashboard } from "@/hooks";
import { DataState, PageHeader } from "./ui";

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card className="transition-shadow hover:shadow-md">
        <CardContent>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 font-heading text-3xl font-semibold">{value}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export function DashboardView() {
  const { data, isLoading, error } = useAdminDashboard();
  const stats = data?.data;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A quick look at users, mechanics and requests."
      />
      <DataState isLoading={isLoading} error={error} isEmpty={!stats}>
        {stats && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Customers"
              value={stats.users.totalCustomers}
              href="/admin/users"
            />
            <StatCard
              label="Mechanics"
              value={stats.users.totalMechanics}
              href="/admin/users"
            />
            <StatCard
              label="Waiting for approval"
              value={stats.mechanics.pendingApproval}
              href="/admin/mechanics"
            />
            <StatCard
              label="Approved mechanics"
              value={stats.mechanics.approved}
              href="/admin/mechanics"
            />
            <StatCard
              label="All requests"
              value={stats.requests.total}
              href="/admin/requests"
            />
            <StatCard
              label="Pending requests"
              value={stats.requests.pending}
              href="/admin/requests"
            />
            <StatCard
              label="Completed requests"
              value={stats.requests.completed}
              href="/admin/requests"
            />
            <StatCard
              label="Cancelled requests"
              value={stats.requests.cancelled}
              href="/admin/requests"
            />
          </div>
        )}
      </DataState>
    </>
  );
}
