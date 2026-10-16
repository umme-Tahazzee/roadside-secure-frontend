import apiClient from "@/lib/apiClient";
import { LoginPayload, RegistationPayload } from "@/types";


export function userLogin(payload: LoginPayload) {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function userRegistration(payload:RegistationPayload){
  return  apiClient("/auth/register", {
      method : "POST",
      body: payload
  })
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

