import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { config as defaultConfig } from "../config";

interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  address: string;
}

interface ConfigContextType {
  social: SocialLinks;
  loading: boolean;
  getWhatsAppLink: (message?: string) => string;
  getMailtoLink: (subject?: string, body?: string) => string;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [social, setSocial] = useState<SocialLinks>({
    instagram: defaultConfig.social.instagram,
    facebook: defaultConfig.social.facebook,
    twitter: defaultConfig.social.twitter,
    youtube: "",
    email: defaultConfig.contact.email,
    phone: defaultConfig.contact.phone,
    whatsapp: defaultConfig.contact.whatsapp,
    website: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine which config document to listen to based on studio name or fixed ID
    // Since admin writes to 'config/social', we listen to that
    const docRef = doc(db, "config", "social");

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<SocialLinks>;
          setSocial((prev) => ({
            ...prev,
            ...data,
          }));
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching social config:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const getWhatsAppLink = (message?: string) => {
    const cleanNumber = social.whatsapp.replace(/\D/g, "");
    const baseUrl = `https://wa.me/${cleanNumber}`;
    return message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl;
  };

  const getMailtoLink = (subject?: string, body?: string) => {
    let link = `mailto:${social.email}`;
    const params = [];
    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (body) params.push(`body=${encodeURIComponent(body)}`);
    if (params.length > 0) link += `?${params.join("&")}`;
    return link;
  };

  return (
    <ConfigContext.Provider
      value={{ social, loading, getWhatsAppLink, getMailtoLink }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
