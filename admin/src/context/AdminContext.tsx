import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Service, AdminContextType, ServiceStats } from "../types";
import { initialServices } from "../data/services";
import {
  saveServicesToStorage,
  loadServicesFromStorage,
} from "../utils/localStorage";

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  // Load services from localStorage or use initial data
  const [services, setServices] = useState<Service[]>(() => {
    const stored = loadServicesFromStorage();
    return stored || initialServices;
  });

  // Save to localStorage whenever services change
  useEffect(() => {
    saveServicesToStorage(services);
  }, [services]);

  const addService = (service: Service) => {
    const newService = {
      ...service,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: service.isActive !== undefined ? service.isActive : true,
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? {
              ...service,
              ...updatedData,
              updatedAt: new Date().toISOString(),
            }
          : service,
      ),
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((service) => service.id !== id));
  };

  const toggleServiceStatus = (id: string) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? {
              ...service,
              isActive: !service.isActive,
              updatedAt: new Date().toISOString(),
            }
          : service,
      ),
    );
  };

  const getServiceStats = (): ServiceStats => {
    const totalServices = services.length;
    const activeServices = services.filter((s) => s.isActive).length;
    const inactiveServices = totalServices - activeServices;

    const allPrices = services.flatMap((s) =>
      s.subServices.map((sub) => sub.pricePerDay),
    );

    const totalSubServices = allPrices.length;
    const averagePricePerDay =
      totalSubServices > 0
        ? Math.round(
            allPrices.reduce((sum, price) => sum + price, 0) / totalSubServices,
          )
        : 0;
    const highestPrice = totalSubServices > 0 ? Math.max(...allPrices) : 0;
    const lowestPrice = totalSubServices > 0 ? Math.min(...allPrices) : 0;

    return {
      totalServices,
      activeServices,
      inactiveServices,
      totalSubServices,
      averagePricePerDay,
      highestPrice,
      lowestPrice,
    };
  };

  const resetServices = () => {
    setServices(initialServices);
  };

  return (
    <AdminContext.Provider
      value={{
        services,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        getServiceStats,
        resetServices,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
