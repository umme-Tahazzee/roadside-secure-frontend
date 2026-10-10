// src/types/index.ts
export type Role = "CUSTOMER" | "MECHANIC" | "ADMIN";
export type RequestStatus =
  | "PENDING" | "ACCEPTED" | "EN_ROUTE" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type MechanicStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";
export type PaymentMethod = "CASH" | "BKASH";
export type PaymentStatus =
  | "UNPAID" | "PENDING" | "PAID" | "FAILED"
  | "REFUND_REQUESTED" | "REFUNDED" | "PARTIALLY_REFUNDED";
export type RefundStatus =
  | "REQUESTED" | "APPROVED" | "PROCESSING" | "COMPLETED" | "REJECTED" | "FAILED";

// backend er standard response wrapper (sendResponse)
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string | null;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface MechanicProfile {
  id: string;
  userId: string;
  serviceTypes: string[];
  vehiclePhoto: string | null;
  licenseDoc: string;
  nidDoc: string;
  status: MechanicStatus;
  isAvailable: boolean;
  currentLat: number | null;
  currentLng: number | null;
  serviceRadius: number;
  rating: number;
  user?: Pick<User, "id" | "name" | "email" | "phone">;
}

export interface Payment {
  id: string;
  requestId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt: string | null;
  merchantInvoiceNumber: string;
}

export interface ServiceRequest {
  id: string;
  customerId: string;
  mechanicId: string | null;
  serviceType: string;
  description: string | null;
  pickupLat: number;
  pickupLng: number;
  status: RequestStatus;
  price: number | null;
  createdAt: string;
  distanceKm?: number; // nearby/pending list e backend add kore
  customer?: { id?: string; name: string; phone: string | null };
  mechanic?: { id: string; rating: number; user: { name: string; phone: string | null } } | null;
  payment?: Payment | null;
}