import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface Offer {
  id: string;
  code: string;
  description: string;
  discount: number;
  expiryDate: string;
  isActive: boolean;
  type: "badge" | "ticker";
}

interface OffersContextType {
  offers: Offer[];
  tickerOffers: Offer[];
  badgeOffer: Offer | null;
  loading: boolean;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all offers (same as admin), filter active ones in JS
    const q = query(collection(db, "offers"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOffers: Offer[] = [];
        snapshot.forEach((doc) => {
          fetchedOffers.push({ ...doc.data(), id: doc.id } as Offer);
        });
        // Filter only active offers
        setOffers(fetchedOffers.filter((o) => o.isActive));
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching offers:", err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  // Filter ticker offers (for the rotating banner)
  const tickerOffers = offers.filter((offer) => offer.type === "ticker");

  // Get the first badge offer (for the festive badge)
  const badgeOffer = offers.find((offer) => offer.type === "badge") || null;

  return (
    <OffersContext.Provider
      value={{ offers, tickerOffers, badgeOffer, loading }}
    >
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("useOffers must be used within an OffersProvider");
  }
  return context;
};
