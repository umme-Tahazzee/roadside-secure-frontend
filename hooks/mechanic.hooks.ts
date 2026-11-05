import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptRequest,
  applyMechanic,
  completeJob,
  confirmCashPayment,
  getMechanicJobs,
  getMechanicStats,
  getMyMechanicProfile,
  getPendingRequests,
  setMechanicAvailability,
  startJob,
  updateMechanicLocation,
} from "@/api";

export const MECHANIC_PROFILE_KEY = ["mechanic-profile"] as const;

// every dashboard query starts with "mechanic", so one invalidate refreshes all of them
const MECHANIC_KEY = "mechanic";

export function useApplyMechanic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyMechanic,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: MECHANIC_PROFILE_KEY }),
  });
}

// 404 means "no profile yet", so don't retry
export function useMyMechanicProfile(enabled = true) {
  return useQuery({
    queryKey: MECHANIC_PROFILE_KEY,
    queryFn: getMyMechanicProfile,
    retry: false,
    enabled,
  });
}

// ---------- dashboard data ----------

export function useMechanicStats() {
  return useQuery({
    queryKey: [MECHANIC_KEY, "stats"],
    queryFn: getMechanicStats,
  });
}

export function useMechanicJobs(status?: string) {
  return useQuery({
    queryKey: [MECHANIC_KEY, "jobs", status],
    queryFn: () => getMechanicJobs(status),
  });
}

// new requests can show up any time, so check again every 15 seconds
export function usePendingRequests(enabled = true) {
  return useQuery({
    queryKey: [MECHANIC_KEY, "pending"],
    queryFn: getPendingRequests,
    enabled,
    retry: false,
    refetchInterval: 15_000,
  });
}

// ---------- actions ----------

function useMechanicMutation<TVariables>(
  mutationFn: (v: TVariables) => Promise<unknown>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: [MECHANIC_KEY] }),
        queryClient.invalidateQueries({ queryKey: MECHANIC_PROFILE_KEY }),
      ]),
  });
}

export function useSetAvailability() {
  return useMechanicMutation(setMechanicAvailability);
}

export function useUpdateLocation() {
  return useMechanicMutation(updateMechanicLocation);
}

export function useAcceptRequest() {
  return useMechanicMutation(acceptRequest);
}

export function useStartJob() {
  return useMechanicMutation(startJob);
}

export function useCompleteJob() {
  return useMechanicMutation(completeJob);
}

export function useConfirmCash() {
  return useMechanicMutation(confirmCashPayment);
}
