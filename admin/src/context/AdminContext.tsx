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
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  writeBatch,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to Firestore updates
  useEffect(() => {
    // Basic query to order by createdAt if available, or just get all
    // Note: You might need to create an index in Firebase Console if you use complex ordering
    const q = query(collection(db, "services"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedServices: Service[] = [];
        snapshot.forEach((doc) => {
          // We combine the document data with the document ID
          fetchedServices.push({ ...doc.data(), id: doc.id } as Service);
        });
        setServices(fetchedServices);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching services:", error);
        if (error.code === "permission-denied") {
          console.error(
            "Permission denied. Check Firestore rules: allow read/write for testing.",
          );
        }
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const addService = async (service: Service) => {
    try {
      // We use setDoc with the provided ID to ensure consistency
      // Add createdAt timestamp if not present
      const serviceData = {
        ...service,
        createdAt: service.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: service.isActive !== undefined ? service.isActive : true,
      };

      await setDoc(doc(db, "services", service.id), serviceData);
      toast.success("Service added successfully");
    } catch (error) {
      console.error("Error adding service:", error);
      toast.error("Failed to add service");
    }
  };

  const updateService = async (id: string, updatedData: Partial<Service>) => {
    try {
      const serviceRef = doc(db, "services", id);
      await updateDoc(serviceRef, {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      });
      toast.success("Service updated successfully");
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service");
    }
  };

  const deleteService = async (id: string) => {
    try {
      await deleteDoc(doc(db, "services", id));
      toast.success("Service deleted successfully");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    }
  };

  const toggleServiceStatus = async (id: string) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;

    try {
      const serviceRef = doc(db, "services", id);
      await updateDoc(serviceRef, {
        isActive: !service.isActive,
        updatedAt: new Date().toISOString(),
      });
      toast.success(
        `Service ${!service.isActive ? "activated" : "deactivated"}`,
      );
    } catch (error) {
      console.error("Error toggling service status:", error);
      toast.error("Failed to toggle status");
    }
  };

  const getServiceStats = (): ServiceStats => {
    const totalServices = services.length;
    const activeServices = services.filter((s) => s.isActive).length;
    const inactiveServices = totalServices - activeServices;

    const allPrices = services.flatMap((s) =>
      s.subServices ? s.subServices.map((sub) => sub.pricePerDay || 0) : [],
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

  const resetServices = async () => {
    try {
      // Use a batch write to delete all existing and add initial ones
      // Note: Batches are limited to 500 operations.
      // For a reset, deleting everything first might be cleaner or just overwriting.
      // Here we will just map over initialServices and set them.
      // Ideally, we should delete others too, but for 'seed' logic this is okay.

      const batch = writeBatch(db);

      initialServices.forEach((service) => {
        const docRef = doc(db, "services", service.id);
        const serviceData = {
          ...service,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        batch.set(docRef, serviceData);
      });

      await batch.commit();
      console.log("Services reset to initial data");
      toast.success("Services reset to defaults! Database populated.");
    } catch (error) {
      console.error("Error resetting services:", error);
      toast.error("Failed to reset services");
    }
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
