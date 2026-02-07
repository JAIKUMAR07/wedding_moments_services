import { useState, useEffect } from "react";
import { User, Mail, Lock, Camera, Save, LogOut, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200", // Default or fetch if available
  });

  const [formData, setFormData] = useState({ ...adminData });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Fetch real user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) return;
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          const profileData = {
            name: data.name || currentUser.displayName || "User",
            email: data.email || currentUser.email || "",
            role: data.role || "User",
            phone: data.phone || "",
            avatar:
              data.avatar ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
          };
          setAdminData(profileData);
          setFormData(profileData);
        } else {
          // Fallback to auth data if no firestore doc
          const fallbackData = {
            name: currentUser.displayName || "User",
            email: currentUser.email || "",
            role: "User",
            phone: "",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
          };
          setAdminData(fallbackData);
          setFormData(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setFetching(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        // Add other fields if necessary
      });

      setAdminData(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64 text-amber-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-current"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Admin Profile</h2>
        <p className="text-sm text-gray-400 mt-1">
          Manage your personal information and security settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center backdrop-blur-sm">
            <div className="relative inline-block mb-4 group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-500/20 mx-auto relative">
                <img
                  src={adminData.avatar}
                  alt={adminData.name}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                  title="Change Avatar"
                >
                  <Camera className="w-8 h-8 text-white" />
                </button>
              </div>
              <div
                className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"
                title="Online"
              ></div>
            </div>

            <h3 className="text-xl font-bold text-white">{adminData.name}</h3>
            <p className="text-amber-400 font-medium text-sm mt-1">
              {adminData.role}
            </p>

            <div className="mt-6 pt-6 border-t border-gray-700/50 flex justify-center">
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-medium px-4 py-2 hover:bg-red-500/10 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-500" />
                Personal Information
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-sm text-amber-400 hover:text-amber-300 font-medium"
                >
                  Edit Details
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={isEditing ? formData.name : adminData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? formData.email : adminData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? formData.phone : adminData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-700/50">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(adminData);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-amber-500" />
              Security Settings
            </h3>

            <div className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">
                  Current Password
                </label>
                <input
                  type="password"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    placeholder="New password"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    placeholder="Confirm new"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors w-full sm:w-auto">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
