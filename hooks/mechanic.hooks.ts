import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyMechanic, getMyMechanicProfile } from "@/api";

export const MECHANIC_PROFILE_KEY = ["mechanic-profile"] as const;

export function useApplyMechanic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyMechanic,
    onSuccess: () =>
      queryClient.invalidateQueries(
        { 
          queryKey: 
          MECHANIC_PROFILE_KEY 
        }
      ),
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
