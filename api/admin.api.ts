import apiClient from "@/lib/apiClient";
import type {
  ActivitiesResult,
  AdminAction,
  AdminMechanic,
  AdminPayment,
  AdminRefund,
  AdminRequest,
  AdminUser,
  ApiResponse,
  DashboardStats,
} from "@/types";

// ofetch skips undefined query values, so an empty filter just means "all"

export function getDashboardStats() {
  return apiClient<ApiResponse<DashboardStats>>("/admin/dashboard");
}

// ---------- users ----------

export function getAdminUsers(role?: string) {
  return apiClient<ApiResponse<AdminUser[]>>("/admin/users", {
    query: { role },
  });
}

export function setUserBlocked(payload: { id: string; isBlocked: boolean }) {
  return apiClient(`/admin/users/${payload.id}/block`, {
    method: "PATCH",
    body: { isBlocked: payload.isBlocked },
  });
}

// ---------- mechanics ----------

export function getAdminMechanics(status?: string) {
  return apiClient<ApiResponse<AdminMechanic[]>>("/mechanics", {
    query: { status },
  });
}

export function approveMechanic(id: string) {
  return apiClient(`/mechanics/${id}/approve`, { method: "PATCH" });
}

export function rejectMechanic(id: string) {
  return apiClient(`/mechanics/${id}/reject`, { method: "PATCH" });
}

// ---------- requests ----------

export function getAdminRequests(status?: string) {
  return apiClient<ApiResponse<AdminRequest[]>>("/admin/requests", {
    query: { status },
  });
}

// ---------- payments and refunds ----------

export function getAdminPayments(status?: string) {
  return apiClient<ApiResponse<AdminPayment[]>>("/payments", {
    query: { status },
  });
}

export function getAdminRefunds(status?: string) {
  return apiClient<ApiResponse<AdminRefund[]>>("/payments/refunds", {
    query: { status },
  });
}

export type RefundAction = "approve" | "reject" | "process";

export function actOnRefund(payload: { id: string; action: RefundAction }) {
  return apiClient(`/payments/refunds/${payload.id}/${payload.action}`, {
    method: "PATCH",
  });
}

// ---------- activity log ----------

export function getAdminActivities(params: {
  page: number;
  limit: number;
  action?: AdminAction;
}) {
  return apiClient<ApiResponse<ActivitiesResult>>("/admin/activities", {
    query: params,
  });
}
