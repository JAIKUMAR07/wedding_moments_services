import { useState } from "react";
import {
  Shield,
  Trash2,
  User,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Ban,
  Plus,
  X,
  Lock,
  Mail,
  Camera,
  ArrowLeft,
  Phone,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "User";
  status: "Active" | "Inactive";
  lastLogin: string;
  joinedAt: string;
  phone?: string;
}

const mockUsersData: UserProfile[] = [
  {
    id: "1",
    name: "System Admin",
    email: "admin@wedding.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-03-20T10:30:00",
    joinedAt: "2024-01-01",
    phone: "+1 234 567 8900",
  },
  {
    id: "2",
    name: "John Photographer",
    email: "john@wedding.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-03-19T14:20:00",
    joinedAt: "2024-01-15",
  },
  {
    id: "3",
    name: "Sarah Editor",
    email: "sarah@wedding.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-03-18T09:15:00",
    joinedAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Mike Guest",
    email: "mike@client.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2024-03-10T11:00:00",
    joinedAt: "2024-03-01",
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>(mockUsersData);
  const [currentUserRole, setCurrentUserRole] = useState<
    "Super Admin" | "Admin" | "User"
  >("Super Admin");
  const [view, setView] = useState<"list" | "register">("list");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "User" as const,
    password: "",
    confirmPassword: "",
  });

  const handleDeleteUser = (userId: string) => {
    if (!["Super Admin", "Admin"].includes(currentUserRole)) return;
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      lastLogin: new Date().toISOString(),
      joinedAt: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, user]);
    setIsModalOpen(false);
    setNewUser({ name: "", email: "", role: "User" });
  };

  const handleToggleStatus = (userId: string) => {
    if (!["Super Admin", "Admin"].includes(currentUserRole)) return;
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          };
        }
        return user;
      }),
    );
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="hidden md:block"></div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-sm text-gray-400 mt-1">
            {view === "list"
              ? "Monitor and manage system users and access roles"
              : "Create a new user account and assign privileges"}
          </p>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-4">
          {/* View Toggle / Tabs */}
          {["Super Admin", "Admin"].includes(currentUserRole) && (
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
          )}

          {/* Role Simulator */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
            <span className="text-xs text-gray-500 px-2">View as:</span>
            {(["Super Admin", "Admin", "User"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setCurrentUserRole(role)}
                className={`px-2 py-1 text-xs rounded ${
                  currentUserRole === role
                    ? "bg-amber-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {["Super Admin", "Admin"].includes(currentUserRole) ? (
        <>
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
                    {users.filter((u) => u.status === "Active").length} Active
                    Accounts
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-900/50 text-gray-400 text-sm">
                      <th className="px-6 py-4 font-medium">User Details</th>
                      <th className="px-6 py-4 font-medium">Role</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Last Login</th>
                      <th className="px-6 py-4 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
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
                              user.role === "Super Admin"
                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                : user.role === "Admin"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-gray-700/50 text-gray-400 border-gray-600/50"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {user.status === "Active" ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-500" />
                            )}
                            <span
                              className={`text-sm ${
                                user.status === "Active"
                                  ? "text-green-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {user.status}
                            </span>
                          </div>
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
                          {user.role !== "Super Admin" && (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleToggleStatus(user.id)}
                                className={`p-2 rounded-lg transition-all ${
                                  user.status === "Active"
                                    ? "text-amber-400 hover:bg-amber-500/10"
                                    : "text-green-400 hover:bg-green-500/10"
                                }`}
                                title={
                                  user.status === "Active"
                                    ? "Deactivate User"
                                    : "Activate User"
                                }
                              >
                                {user.status === "Active" ? (
                                  <Ban className="w-4 h-4" />
                                ) : (
                                  <CheckCircle className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
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
                    <h3 className="text-xl font-bold text-white">
                      Create Profile
                    </h3>
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
                      className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Create User Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 text-center">
          <div className="flex justify-center mb-3">
            <AlertTriangle className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Access Restricted
          </h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            User management settings are only visible to Super Administrators
            and Admins. You are currently viewing as
            <span className="text-amber-400 font-bold ml-1">
              {currentUserRole}
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
