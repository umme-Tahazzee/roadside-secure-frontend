export type MechanicStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

// Sent as multipart/form-data to POST /mechanics/profile
export interface MechanicApplicationData {
  serviceTypes: string[];
  serviceRadius: number;
  nidDoc: File;
  licenseDoc: File;
  vehiclePhotos: File[];
}

export interface MechanicProfile {
  id: string;
  userId: string;
  serviceTypes: string[];
  vehiclePhoto: string[];
  licenseDoc: string;
  nidDoc: string;
  status: MechanicStatus;
  isAvailable: boolean;
  serviceRadius: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
