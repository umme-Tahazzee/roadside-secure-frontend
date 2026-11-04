"use client";

import { useAdminDashboard } from "@/hooks";
import { DataState, PageHeader } from "./ui";
import { StatCard } from "@/components/shared/StateCard";



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
