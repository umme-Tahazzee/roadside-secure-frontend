import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  MechanicApplicationData,
  MechanicProfile,
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
    credentials: "include"
  });
}

export function getMyMechanicProfile() {
  return apiClient<ApiResponse<MechanicProfile>>("/mechanics/profile/me");
}
