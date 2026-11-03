"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useAdminUsers, useSetUserBlocked } from "@/hooks";
import { getErrorMessage } from "@/lib/error";
import { formatDate } from "@/lib/format";
import type { AdminUser } from "@/types";
import {
  DataState,
  FilterTabs,
  PageHeader,
  StatusBadge,
  TableCard,
  Td,
  Th,
} from "./ui";

export function UsersView() {
  const [role, setRole] = useState("");
  const { data, isLoading, error } = useAdminUsers(role || undefined);
  const { mutate: setBlocked, isPending, variables } = useSetUserBlocked();

  const users = data?.data ?? [];

  const toggleBlock = (user: AdminUser) => {
    const isBlocked = !user.isBlocked;
    if (!window.confirm(`${isBlocked ? "Block" : "Unblock"} ${user.email}?`))
      return;

    setBlocked(
      { id: user.id, isBlocked },
      {
        onSuccess: () =>
          toast.add({
            title: isBlocked ? "User blocked" : "User unblocked",
            type: "success",
          }),
        onError: (err) =>
          toast.add({
            title: "Action failed",
            description: getErrorMessage(err),
            type: "error",
          }),
      },
    );
  };

  return (
    <>
      <PageHeader
        title="Users"
        description="All customers, mechanics and admins."
      />
      <FilterTabs
        options={["CUSTOMER", "MECHANIC", "ADMIN"]}
        value={role}
        onChange={setRole}
      />

      <DataState
        isLoading={isLoading}
        error={error}
        isEmpty={users.length === 0}
        emptyText="No users found."
      >
        <TableCard>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Joined</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <Td className="font-medium">{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone ?? "-"}</Td>
                <Td>
                  <StatusBadge value={user.role} />
                </Td>
                <Td>
                  <StatusBadge value={user.isBlocked ? "BLOCKED" : "ACTIVE"} />
                </Td>
                <Td className="whitespace-nowrap">
                  {formatDate(user.createdAt)}
                </Td>
                <Td className="text-right">
                  {/* admins can never be blocked (the backend rejects it too) */}
                  {user.role !== "ADMIN" && (
                    <Button
                      size="sm"
                      variant={user.isBlocked ? "outline" : "destructive"}
                      disabled={isPending && variables?.id === user.id}
                      onClick={() => toggleBlock(user)}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </Button>
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
