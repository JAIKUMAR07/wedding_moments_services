import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export interface Offer {
  id: string;
  code: string;
  description: string;
  discount: number; // percentage
  expiryDate: string;
  isActive: boolean;
  type: "badge" | "ticker";
}

interface OffersContextType {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, "id">) => Promise<void>;
  updateOffer: (id: string, offer: Partial<Offer>) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
  toggleOfferStatus: (id: string) => Promise<void>;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const q = query(collection(db, "offers"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOffers: Offer[] = [];
      snapshot.forEach((doc) => {
        fetchedOffers.push({ ...doc.data(), id: doc.id } as Offer);
      });
      setOffers(fetchedOffers);
    });

    return () => unsubscribe();
  }, []);

  const addOffer = async (offer: Omit<Offer, "id">) => {
    try {
      // Create a simplified ID from the code or random string
      const id =
        offer.code.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
      await setDoc(doc(db, "offers", id), { ...offer, id });
    } catch (error) {
      console.error("Error adding offer:", error);
    }
  };

  const updateOffer = async (id: string, updatedData: Partial<Offer>) => {
    try {
      await updateDoc(doc(db, "offers", id), updatedData);
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  const deleteOffer = async (id: string) => {
    try {
      await deleteDoc(doc(db, "offers", id));
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  const toggleOfferStatus = async (id: string) => {
    const offer = offers.find((o) => o.id === id);
    if (!offer) return;
    try {
      await updateDoc(doc(db, "offers", id), {
        isActive: !offer.isActive,
      });
    } catch (error) {
      console.error("Error toggling offer status:", error);
    }
  };

  return (
    <OffersContext.Provider
      value={{
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        toggleOfferStatus,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("useOffers must be used within OffersProvider");
  }
  return context;
};
