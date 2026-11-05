import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  CreateRequestPayload,
  CreateRequestResult,
  CustomerRequest,
  MechanicSearchParams,
  MechanicSearchResult,
  NearbyMechanic,
} from "@/types";

export function createServiceRequest(payload: CreateRequestPayload) {
  return apiClient<ApiResponse<CreateRequestResult>>("/requests", {
    method: "POST",
    body: payload,
  });
}

// null when the customer has no open request
export function getActiveRequest() {
  return apiClient<ApiResponse<CustomerRequest | null>>("/requests/active");
}

export function getNearbyMechanics(requestId: string) {
  return apiClient<ApiResponse<NearbyMechanic[]>>(
    `/requests/${requestId}/nearby-mechanics`,
  );
}

export function cancelServiceRequest(requestId: string) {
  return apiClient(`/requests/${requestId}/cancel`, { method: "PATCH" });
}

export function getMyRequests(status?: string) {
  return apiClient<ApiResponse<CustomerRequest[]>>("/customers/requests", {
    query: { status },
  });
}

export function startBkashPayment(paymentId: string) {
  return apiClient<
    ApiResponse<{ bkashPaymentID: string; checkoutUrl: string }>
  >(`/payments/${paymentId}/bkash/initiate`, { method: "POST" });
}

export function reviewRequest(payload: {
  id: string;
  rating: number;
  comment?: string;
}) {
  return apiClient(`/requests/${payload.id}/review`, {
    method: "POST",
    body: { rating: payload.rating, comment: payload.comment || undefined },
  });
}

export function requestRefund(payload: {
  paymentId: string;
  amount: number;
  reason: string;
}) {
  return apiClient(`/payments/${payload.paymentId}/refund`, {
    method: "POST",
    body: { amount: payload.amount, reason: payload.reason },
  });
}

export function searchNearbyMechanics(params: MechanicSearchParams) {
  return apiClient<ApiResponse<MechanicSearchResult[]>>("/mechanics/nearby", {
    query: params,
  });
}
