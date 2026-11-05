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
  currentLat?: number | null;
  currentLng?: number | null;
  serviceRadius: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus =
  | "PENDING"
  | "ACCEPTED"
  | "EN_ROUTE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface JobPayment {
  id: string;
  amount: number;
  currency: string;
  method: "CASH" | "BKASH";
  status: string;
}

// one service request as the mechanic sees it
export interface MechanicJob {
  id: string;
  serviceType: string;
  description: string | null;
  pickupLat: number;
  pickupLng: number;
  status: JobStatus;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  customer: { id: string; name: string; phone: string | null };
  payment?: JobPayment | null;
  distanceKm?: number;
}

export interface MechanicStats {
  jobs: { active: number; completed: number; cancelled: number };
  earnings: { paid: number; unpaid: number };
  rating: number;
}
