export interface SubService {
  id: string;
  name: string;
  pricePerDay: number;
  originalPrice?: number;
  pricingType?: string; // or "per-day" | "per-piece" etc.
  customUnit?: string;
  days: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  offer?: string;
  subServices: Omit<SubService, "days">[];
}

export interface CartItem {
  serviceId: string;
  serviceName: string;
  subServices: SubService[];
  totalPrice: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}
