import { useMutation, useQuery } from "@tanstack/react-query";
import {
  googleOauth,
  userLogin,
  userLogout,
  userMechanicRegistration,
  userProfile,
  userRegistration,
  userResendOTP,
  userVerification,
} from "@/api";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}


export function useMechanicRegistration(){
  return {
     mutationFn : userMechanicRegistration
  }    
}

export function useVerification() {
  return useMutation({
    mutationFn: userVerification,
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: userResendOTP,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}

export function useGoogleAuth() {
  return useMutation({
    mutationFn: googleOauth,
  });
}
export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: userProfile,
    retry: false,
  });
}
