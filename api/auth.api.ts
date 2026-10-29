import apiClient from "@/lib/apiClient";
import { LoginPayload, MechanicRegistationPayload, RegistationPayload, verifyPayload } from "@/types";

export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function userRegistration(payload: RegistationPayload) {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function userVerification(payload: verifyPayload) {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
}

export function userResendOTP(payload: { email: string }) {
  return apiClient("/auth/resend-otp", {
    method: "POST",
    body: payload,
  });
}

export function userLogout() {
  return apiClient("/auth/logout", {
    method: "POST",
  });
}

export function userProfile() {
  return apiClient("/auth/me");
}

export function googleOauth(payload: { idToken: string }) {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
}


export function userMechanicRegistration(payload:MechanicRegistationPayload ){
    return apiClient("",{
        method : "POST",
        body : payload
    })
}
