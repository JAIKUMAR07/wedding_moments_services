import { useState, useEffect } from "react";
import {
  Trash2,
  User,
  Clock,
  Activity,
  Users,
  Plus,
  Lock,
  Mail,
  Camera,
  Phone,
  AlertTriangle,
} from "lucide-react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Note: This logs out current user if not careful
import { db } from "../lib/firebase"; // Default auth
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

// --- SECONDARY APP CONFIGURATION (To create users without logging out admin) ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize a secondary app for admin actions (like creating another user)
let secondaryApp;
let secondaryAuth: any;

try {
  secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
  secondaryAuth = getAuth(secondaryApp);
} catch (e: any) {
  // If running in development and fast refresh happens, it might complain about duplicate app
  // In that case, we can try to get the existing one or just ignore
  console.log("Secondary app might already be initialized", e);
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  lastLogin: string; // ISO string
  joinedAt: string; // ISO string
  phone?: string;
}

const UserManagement = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [view, setView] = useState<"list" | "register">("list");
  const [loading, setLoading] = useState(false);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "User" as "Admin" | "User",
    password: "",
    confirmPassword: "",
  });

  // Fetch Users from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const fetchedUsers: UserProfile[] = [];
        snapshot.forEach((doc) => {
          fetchedUsers.push({ id: doc.id, ...doc.data() } as UserProfile);
        });
        setUsers(fetchedUsers);
      },
      (error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      },
    );

    return () => unsubscribe();
  }, []);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newUser.password !== newUser.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newUser.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating user account...");

    try {
      // 1. Create user in Firebase Auth using SECONDARY Auth instance
      // This prevents the current admin from being logged out
      // Ensure secondaryAuth is available
      if (!secondaryAuth) {
        // Fallback or re-init
        const app2 = initializeApp(
          firebaseConfig,
          "SecondaryApp-" + Date.now(),
        ); // Unique name fallback
        secondaryAuth = getAuth(app2);
      }

      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        newUser.email,
        newUser.password,
      );

      // 2. Update profile (Display Name)
      await updateProfile(userCredential.user, {
        displayName: newUser.name,
      });

      // 3. Create user document in Firestore (Main DB instance)
      // We manually set the ID to match the Auth UID for easy reference
      const userData: UserProfile = {
        id: userCredential.user.uid,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        lastLogin: new Date().toISOString(), // Initial value
        joinedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userData);

      // 4. Sign out the *secondary* user immediately so the instance is clean
      await signOut(secondaryAuth);

      toast.success("User account created successfully!", { id: toastId });
      setNewUser({
        name: "",
        email: "",
        phone: "",
        role: "User",
        password: "",
        confirmPassword: "",
      });
      setView("list");
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Failed to create user", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this user from the logic record? (Note: This does not delete them from Authentication)",
      )
    ) {
      return;
    }

    try {
      await deleteDoc(doc(db, "users", userId));
      toast.success("User record deleted from database.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user record.");
    }
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A"; // Check for invalid date
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Only allow access if logged in (Client-side check, protect via Security Rules too!)
  if (!currentUser) {
    return (
      <div className="p-8 text-white text-center">
        Please log in to manage users.
      </div>
    );
  }

  // Helper check for admin role if needed, currently we assume login = admin access for this panel
  // or checks strictly in Firestore rules.
  // We don't have a 'role' on 'currentUser' object directly unless we fetch the user doc or custom claims.
  // For now, we allow any logged-in user to see this page based on "Access Restricted" logic below?
  // Actually, the previous code had role simulation. We'll simplify to just show for now
  // or fetch *my* role.
  // For simplicity requested ("her is only admin and user registation allow no super admin okay"),
  // we will just show the UI.

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="hidden md:block"></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            {view === "list"
              ? "Monitor and manage registered system users"
              : "Create a new user account"}
          </p>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-4">
          <div className="flex bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                view === "list"
                  ? "bg-gray-700 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              All Users
            </button>
            <button
              onClick={() => setView("register")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
                view === "register"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Plus className="w-4 h-4" />
              Register New
            </button>
          </div>
        </div>
      </div>

      {view === "list" ? (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-6 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Registered Users
                </h3>
                <p className="text-sm text-gray-400">
                  Total available accounts in the system
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-300">
                {users.length} Total Accounts
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-900/50 text-gray-400 text-sm">
                  <th className="px-6 py-4 font-medium">User Details</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Last Login</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/50">
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {user.name}
                          </p>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">
                              {user.email}
                            </span>
                            {user.phone && (
                              <span className="text-xs text-gray-600">
                                {user.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          user.role === "Admin"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-gray-700/50 text-gray-400 border-gray-600/50"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDateTime(user.lastLogin)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-700">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600">
                <Camera className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Create Profile</h3>
                <p className="text-sm text-gray-400">
                  Enter user details to create a new account
                </p>
              </div>
            </div>

            <form onSubmit={handleAddUser} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({ ...newUser, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={newUser.phone}
                      onChange={(e) =>
                        setNewUser({ ...newUser, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({ ...newUser, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">
                  Access Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["User", "Admin"] as const).map((role) => (
                    <div
                      key={role}
                      onClick={() => setNewUser({ ...newUser, role })}
                      className={`cursor-pointer px-4 py-3 rounded-lg border text-center transition-all ${
                        newUser.role === role
                          ? "bg-amber-500 border-amber-500 text-white"
                          : "bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500"
                      }`}
                    >
                      <div className="font-medium text-sm">{role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({ ...newUser, password: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      value={newUser.confirmPassword}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create User Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
