import type { JobPayment, JobStatus } from "./mechanic.type";

export interface CreateRequestPayload {
  serviceType: string;
  description?: string;
  pickupLat: number;
  pickupLng: number;
}

export interface TrackedMechanic {
  id: string;
  rating: number;
  currentLat: number | null;
  currentLng: number | null;
  serviceTypes: string[];
  user: { name: string; phone: string | null };
}

export interface CustomerReview {
  id: string;
  rating: number;
  comment: string | null;
}

// one request as the customer sees it, with the assigned mechanic's live position
export interface CustomerRequest {
  id: string;
  serviceType: string;
  description: string | null;
  pickupLat: number;
  pickupLng: number;
  status: JobStatus;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  customer?: { id: string; name: string; phone: string | null };
  mechanic: TrackedMechanic | null;
  payment: JobPayment | null;
  review: CustomerReview | null;
  distanceKm?: number | null;
}

export interface NearbyMechanic {
  id: string;
  rating: number;
  currentLat: number;
  currentLng: number;
  serviceRadius: number;
  serviceTypes: string[];
  distanceKm: number;
  user: { id: string; name: string; phone: string | null };
}

export interface CreateRequestResult {
  request: CustomerRequest;
  nearbyMechanicsCount: number;
}

// one row of the "find a mechanic near me" search (safe public fields only)
export interface MechanicSearchResult {
  id: string;
  name: string;
  rating: number;
  serviceTypes: string[];
  serviceRadius: number;
  completedJobs: number;
  lat: number;
  lng: number;
  distanceKm: number;
}

export interface MechanicSearchParams {
  lat: number;
  lng: number;
  serviceType?: string;
  radiusKm: number;
}
