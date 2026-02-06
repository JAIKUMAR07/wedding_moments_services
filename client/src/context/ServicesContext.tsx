import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Service, ServicesContextType } from "../types";

const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined,
);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to Firestore updates
  useEffect(() => {
    // Fetch all services, filter active ones in JS (avoids index requirement)
    const q = query(collection(db, "services"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedServices: Service[] = [];
        snapshot.forEach((doc) => {
          fetchedServices.push({ ...doc.data(), id: doc.id } as Service);
        });
        // Filter only active services for client display
        setServices(fetchedServices.filter((s) => s.isActive !== false));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const getServiceById = (id: string): Service | undefined => {
    return services.find((service) => service.id === id);
  };

  return (
    <ServicesContext.Provider
      value={{ services, loading, error, getServiceById }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
