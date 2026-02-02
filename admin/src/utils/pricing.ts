import type { PricingType } from "../types";

// Get display label for pricing type
export const getPricingLabel = (pricingType?: PricingType): string => {
  switch (pricingType) {
    case "per-day":
      return "Per Day";
    case "per-piece":
      return "Per Piece";
    case "per-hour":
      return "Per Hour";
    case "per-event":
      return "Per Event";
    default:
      return "Per Day"; // Default fallback
  }
};

// Get short unit display
export const getPricingUnit = (pricingType?: PricingType): string => {
  switch (pricingType) {
    case "per-day":
      return "/day";
    case "per-piece":
      return "/piece";
    case "per-hour":
      return "/hour";
    case "per-event":
      return "/event";
    default:
      return "/day";
  }
};

// All available pricing types
export const PRICING_TYPES: { value: PricingType; label: string }[] = [
  { value: "per-day", label: "Per Day" },
  { value: "per-piece", label: "Per Piece" },
  { value: "per-hour", label: "Per Hour" },
  { value: "per-event", label: "Per Event" },
];
