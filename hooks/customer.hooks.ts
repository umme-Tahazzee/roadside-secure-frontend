import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelServiceRequest,
  createServiceRequest,
  getActiveRequest,
  getMyRequests,
  getNearbyMechanics,
  requestRefund,
  reviewRequest,
  searchNearbyMechanics,
  startBkashPayment,
} from "@/api";
import type { MechanicSearchParams } from "@/types";

// every customer query starts with "customer", so one invalidate refreshes all of them
const CUSTOMER_KEY = "customer";

// the mechanic moves, so ask again every 8 seconds while a request is open
export function useActiveRequest() {
  return useQuery({
    queryKey: [CUSTOMER_KEY, "active"],
    queryFn: getActiveRequest,
    refetchInterval: 8_000,
  });
}

export function useNearbyMechanics(requestId: string | undefined) {
  return useQuery({
    queryKey: [CUSTOMER_KEY, "nearby", requestId],
    queryFn: () => getNearbyMechanics(requestId as string),
    enabled: Boolean(requestId),
    refetchInterval: 8_000,
  });
}

export function useMyRequests(status?: string) {
  return useQuery({
    queryKey: [CUSTOMER_KEY, "requests", status],
    queryFn: () => getMyRequests(status),
  });
}

function useCustomerMutation<TVariables, TResult>(
  mutationFn: (v: TVariables) => Promise<TResult>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [CUSTOMER_KEY] }),
  });
}

export function useCreateRequest() {
  return useCustomerMutation(createServiceRequest);
}

export function useCancelRequest() {
  return useCustomerMutation(cancelServiceRequest);
}

export function useStartBkash() {
  return useCustomerMutation(startBkashPayment);
}

export function useReviewRequest() {
  return useCustomerMutation(reviewRequest);
}

export function useRequestRefund() {
  return useCustomerMutation(requestRefund);
}

// runs as soon as a spot is chosen; refreshed often because mechanics go on/offline
export function useMechanicSearch(params: MechanicSearchParams | null) {
  return useQuery({
    queryKey: [CUSTOMER_KEY, "search", params],
    queryFn: () => searchNearbyMechanics(params as MechanicSearchParams),
    enabled: params !== null,
    refetchInterval: 20_000,
  });
}
