import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  MechanicApplicationData,
  MechanicJob,
  MechanicProfile,
  MechanicStats,
} from "@/types";

export function applyMechanic(payload: MechanicApplicationData) {
  // The backend reads multer fields: nidDoc, licenseDoc, vehiclePhoto
  const formData = new FormData();
  formData.append("serviceTypes", JSON.stringify(payload.serviceTypes));
  formData.append("serviceRadius", String(payload.serviceRadius));
  formData.append("nidDoc", payload.nidDoc);
  formData.append("licenseDoc", payload.licenseDoc);
  for (const photo of payload.vehiclePhotos) {
    formData.append("vehiclePhoto", photo);
  }

  return apiClient<ApiResponse<MechanicProfile>>("/mechanics/profile", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
}

export function getMyMechanicProfile() {
  return apiClient<ApiResponse<MechanicProfile>>("/mechanics/profile/me");
}

// ---------- mechanic dashboard ----------

export function getMechanicStats() {
  return apiClient<ApiResponse<MechanicStats>>("/mechanics/stats");
}

export function getMechanicJobs(status?: string) {
  return apiClient<ApiResponse<MechanicJob[]>>("/mechanics/jobs", {
    query: { status },
  });
}

export function setMechanicAvailability(isAvailable: boolean) {
  return apiClient<ApiResponse<MechanicProfile>>("/mechanics/availability", {
    method: "PATCH",
    body: { isAvailable },
  });
}

export function updateMechanicLocation(payload: { lat: number; lng: number }) {
  return apiClient("/mechanics/location", { method: "PATCH", body: payload });
}

export function getPendingRequests() {
  return apiClient<ApiResponse<MechanicJob[]>>("/requests/pending");
}

export function acceptRequest(id: string) {
  return apiClient(`/requests/${id}/accept`, { method: "PATCH" });
}

export function startJob(id: string) {
  return apiClient(`/requests/${id}/status`, {
    method: "PATCH",
    body: { status: "IN_PROGRESS" },
  });
}

export function completeJob(payload: {
  id: string;
  finalPrice: number;
  method: "CASH" | "BKASH";
}) {
  return apiClient(`/requests/${payload.id}/complete`, {
    method: "PATCH",
    body: { finalPrice: payload.finalPrice, method: payload.method },
  });
}

export function confirmCashPayment(paymentId: string) {
  return apiClient(`/payments/${paymentId}/confirm-cash`, { method: "PATCH" });
}
