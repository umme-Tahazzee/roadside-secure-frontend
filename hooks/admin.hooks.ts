import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  actOnRefund,
  approveMechanic,
  getAdminActivities,
  getAdminMechanics,
  getAdminPayments,
  getAdminRefunds,
  getAdminRequests,
  getAdminUsers,
  getDashboardStats,
  rejectMechanic,
  setUserBlocked,
} from "@/api";
import type { AdminAction } from "@/types";

// every admin query key starts with "admin", so one invalidate refreshes all admin pages
const ADMIN_KEY = "admin";

export function useAdminDashboard() {
  return useQuery({
    queryKey: [ADMIN_KEY, "dashboard"],
    queryFn: getDashboardStats,
  });
}

export function useAdminUsers(role?: string) {
  return useQuery({
    queryKey: [ADMIN_KEY, "users", role],
    queryFn: () => getAdminUsers(role),
  });
}

export function useAdminMechanics(status?: string) {
  return useQuery({
    queryKey: [ADMIN_KEY, "mechanics", status],
    queryFn: () => getAdminMechanics(status),
  });
}

export function useAdminRequests(status?: string) {
  return useQuery({
    queryKey: [ADMIN_KEY, "requests", status],
    queryFn: () => getAdminRequests(status),
  });
}

export function useAdminPayments(status?: string) {
  return useQuery({
    queryKey: [ADMIN_KEY, "payments", status],
    queryFn: () => getAdminPayments(status),
  });
}

export function useAdminRefunds(status?: string) {
  return useQuery({
    queryKey: [ADMIN_KEY, "refunds", status],
    queryFn: () => getAdminRefunds(status),
  });
}

export function useAdminActivities(params: {
  page: number;
  limit: number;
  action?: AdminAction;
}) {
  return useQuery({
    queryKey: [ADMIN_KEY, "activities", params],
    queryFn: () => getAdminActivities(params),
  });
}

// ---------- actions (each one also adds a row to the activity log) ----------

function useAdminMutation<TVariables>(
  mutationFn: (v: TVariables) => Promise<unknown>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [ADMIN_KEY] }),
  });
}

export function useSetUserBlocked() {
  return useAdminMutation(setUserBlocked);
}

export function useApproveMechanic() {
  return useAdminMutation(approveMechanic);
}

export function useRejectMechanic() {
  return useAdminMutation(rejectMechanic);
}

export function useRefundAction() {
  return useAdminMutation(actOnRefund);
}
