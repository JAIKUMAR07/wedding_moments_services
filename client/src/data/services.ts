import type { Service } from "../types";

export const services: Service[] = [
  {
    id: "baby-shoot",
    name: "Baby Shoot",
    offer: "15% OFF",
    description:
      "Capture precious moments of your little one with our professional baby photography services.",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000",
    subServices: [
      {
        id: "baby-photo",
        name: "Photo Shoot Service",
        pricePerDay: 500,
        originalPrice: 600,
      },
      {
        id: "baby-video",
        name: "Videography Service",
        pricePerDay: 800,
        originalPrice: 1000,
      },
      {
        id: "baby-drone",
        name: "Drone Shoot Service",
        pricePerDay: 1200,
        originalPrice: 1500,
      },
    ],
  },
  {
    id: "pre-wedding",
    name: "Pre-Wedding Shoot",
    offer: "20% OFF",
    description:
      "Create beautiful memories before your big day with our romantic pre-wedding photography.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
    subServices: [
      {
        id: "prewed-photo",
        name: "Photo Shoot Service",
        pricePerDay: 1500,
        originalPrice: 2000,
        pricingType: "per-day",
      },
      {
        id: "prewed-video",
        name: "Videography Service",
        pricePerDay: 2000,
        originalPrice: 2500,
        pricingType: "per-day",
      },
      {
        id: "prewed-drone",
        name: "Drone Shoot Service",
        pricePerDay: 2500,
        originalPrice: 3200,
        pricingType: "per-hour", // Example change
      },
      {
        id: "prewed-album",
        name: "Premium Album Design",
        pricePerDay: 3000,
        originalPrice: 4000,
        pricingType: "manual",
        customUnit: "per Album", // Example change
      },
    ],
  },
  {
    id: "outdoor-shoot",
    name: "Outdoor Shoot",
    description:
      "Professional outdoor photography sessions in stunning natural locations.",
    image:
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1000",
    subServices: [
      {
        id: "outdoor-photo",
        name: "Photo Shoot Service",
        pricePerDay: 1000,
        originalPrice: 1200,
      },
      {
        id: "outdoor-video",
        name: "Videography Service",
        pricePerDay: 1500,
        originalPrice: 1800,
      },
      {
        id: "outdoor-drone",
        name: "Drone Shoot Service",
        pricePerDay: 2000,
        originalPrice: 2500,
      },
    ],
  },
  {
    id: "birthday-shoot",
    name: "Birthday Shoot",
    offer: "Special Deal",
    description:
      "Make birthday celebrations memorable with our vibrant and fun photography services.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000",
    subServices: [
      {
        id: "birthday-photo",
        name: "Photo Shoot Service",
        pricePerDay: 600,
        originalPrice: 800,
      },
      {
        id: "birthday-video",
        name: "Videography Service",
        pricePerDay: 1000,
        originalPrice: 1200,
      },
      {
        id: "birthday-decoration",
        name: "Decoration Coverage",
        pricePerDay: 500,
        originalPrice: 700,
      },
    ],
  },
  {
    id: "film-shoot",
    name: "Film Shoot",
    description:
      "Professional cinematography services for commercial and creative film projects.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000",
    subServices: [
      {
        id: "film-cinema",
        name: "Cinematography Service",
        pricePerDay: 3000,
        originalPrice: 3500,
      },
      {
        id: "film-editing",
        name: "Professional Editing",
        pricePerDay: 2000,
      },
      {
        id: "film-drone",
        name: "Drone Cinematography",
        pricePerDay: 2500,
        originalPrice: 3000,
      },
      {
        id: "film-equipment",
        name: "Premium Equipment Rental",
        pricePerDay: 1500,
      },
    ],
  },
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find((service) => service.id === id);
};
