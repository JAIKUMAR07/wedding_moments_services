import { useState, useEffect } from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MessageCircle,
  Save,
  Globe,
  MapPin,
} from "lucide-react";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";

interface SocialLinks {
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
}

const SocialManagement = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [socialData, setSocialData] = useState<SocialLinks>({
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
  });

  // Fetch initial data
  useEffect(() => {
    const docRef = doc(db, "config", "social");
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setSocialData(docSnap.data() as SocialLinks);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching social config:", error);
        toast.error("Failed to load social configuration");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docRef = doc(db, "config", "social");
      await setDoc(docRef, socialData, { merge: true });
      toast.success("Social configuration updated successfully!");
    } catch (error) {
      console.error("Error saving social config:", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-amber-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-current"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Social & Contact Management
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Update your social media links and contact details visible on the
          client site
        </p>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-8">
        {/* Social Media Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Social Media Links
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-500" /> Instagram URL
              </label>
              <input
                type="url"
                name="instagram"
                value={socialData.instagram || ""}
                onChange={handleChange}
                placeholder="https://instagram.com/yourprofile"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Facebook className="w-4 h-4 text-blue-600" /> Facebook URL
              </label>
              <input
                type="url"
                name="facebook"
                value={socialData.facebook || ""}
                onChange={handleChange}
                placeholder="https://facebook.com/yourpage"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" /> YouTube URL
              </label>
              <input
                type="url"
                name="youtube"
                value={socialData.youtube || ""}
                onChange={handleChange}
                placeholder="https://youtube.com/channel/..."
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
            <Phone className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">
              Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={socialData.email || ""}
                onChange={handleChange}
                placeholder="info@studio.com"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={socialData.phone || ""}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp
                Number (No spaces/symbols)
              </label>
              <input
                type="text"
                name="whatsapp"
                value={socialData.whatsapp || ""}
                onChange={handleChange}
                placeholder="919876543210"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
              <p className="text-xs text-gray-500">
                Format: Country code + number (e.g., 919876543210)
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400" /> Studio Address
              </label>
              <input
                type="text"
                name="address"
                value={socialData.address || ""}
                onChange={handleChange}
                placeholder="123 Wedding Street, City, State"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialManagement;
