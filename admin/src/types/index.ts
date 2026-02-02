// Admin-specific types extending client types

export type PricingType = "per-day" | "per-piece" | "per-hour" | "per-event";

export interface SubService {
  id: string;
  name: string;
  pricePerDay: number; // Keeping name for backward compatibility
  pricingType?: PricingType; // New: pricing model
  days?: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  subServices: SubService[];
  isActive?: boolean; // Admin feature: enable/disable service
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceStats {
  totalServices: number;
  activeServices: number;
  inactiveServices: number;
  totalSubServices: number;
  averagePricePerDay: number;
  highestPrice: number;
  lowestPrice: number;
}

export interface AdminContextType {
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceStatus: (id: string) => void;
  getServiceStats: () => ServiceStats;
  resetServices: () => void;
}

export interface BookingRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  subServices: SubService[];
  totalPrice: number;
  requestedAt: string;
  status: "pending" | "confirmed" | "cancelled";
}
