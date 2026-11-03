import type { UserRole } from "./auth.type";
import type { MechanicProfile, MechanicStatus } from "./mechanic.type";

export type RequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "EN_ROUTE"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus =
  | "UNPAID"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUND_REQUESTED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export type RefundStatus =
  | "REQUESTED"
  | "APPROVED"
  | "PROCESSING"
  | "COMPLETED"
  | "REJECTED"
  | "FAILED";

export type AdminAction =
  | "USER_BLOCKED"
  | "USER_UNBLOCKED"
  | "MECHANIC_APPROVED"
  | "MECHANIC_REJECTED"
  | "REFUND_APPROVED"
  | "REFUND_REJECTED"
  | "REFUND_PROCESSED";

export interface DashboardStats {
  users: { totalCustomers: number; totalMechanics: number };
  mechanics: { pendingApproval: number; approved: number };
  requests: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string | null;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface AdminMechanic extends MechanicProfile {
  status: MechanicStatus;
  user: { id: string; name: string; email: string; phone: string | null };
}

export interface AdminRequest {
  id: string;
  serviceType: string;
  description: string | null;
  status: RequestStatus;
  price: number | null;
  createdAt: string;
  customer: { id: string; name: string; phone: string | null };
  mechanic: { id: string; user: { name: string; phone: string | null } } | null;
}

interface PaymentRequestInfo {
  id: string;
  serviceType: string;
  customer: { name: string; phone: string | null };
}

export interface AdminPayment {
  id: string;
  amount: number;
  currency: string;
  method: "CASH" | "BKASH";
  status: PaymentStatus;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  request: PaymentRequestInfo;
}

export interface AdminRefund {
  id: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  createdAt: string;
  payment: { id: string; amount: number; request: PaymentRequestInfo };
}

export interface AdminActivity {
  id: string;
  action: AdminAction;
  targetType: string;
  targetId: string;
  description: string;
  createdAt: string;
  admin: { id: string; name: string; email: string };
}

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ActivitiesResult {
  items: AdminActivity[];
  meta: PageMeta;
}
