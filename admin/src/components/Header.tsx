import { Bell, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header = ({ title, onMenuClick }: HeaderProps) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Failed to logout", error);
      toast.error("Failed to logout");
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left: Menu Button + Title */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Open menu"
            title="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 hidden sm:block">
              {currentDate}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-3 sm:gap-5 md:gap-6">
          {/* Notifications */}
          <button
            className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 sm:w-5 sm:h-5" />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-amber-500 rounded-full border border-gray-900"></span>
          </button>

          {/* Vertical Divider */}
          <div className="h-5 w-px bg-gray-700 hidden sm:block"></div>

          {/* User Profile Container */}
          <div className="flex items-center gap-3">
            <div
              className="text-right hidden md:block cursor-pointer group"
              onClick={handleProfileClick}
            >
              <p className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                {currentUser?.email?.split("@")[0] || "Admin"}
              </p>
              <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                {currentUser?.email || "admin@wedding.com"}
              </p>
            </div>
            
            <button
              onClick={handleProfileClick}
              className="p-2 sm:p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              title="User profile"
              aria-label="View user profile"
            >
              <User className="w-5 h-5 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="h-5 w-px bg-gray-700 hidden sm:block"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="p-2 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50"
            title="Logout"
            aria-label="Logout from admin dashboard"
          >
            <LogOut className="w-5 h-5 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
