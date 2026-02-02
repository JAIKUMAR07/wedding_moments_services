import { Search, Bell, User, LogOut, Menu } from "lucide-react";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header = ({ title, onMenuClick }: HeaderProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search - Hidden on very small screens */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-32 lg:w-48"
              aria-label="Search"
            />
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {/* User */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@wedding.com</p>
            </div>
            <button
              className="p-2 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-lg transition-colors"
              title="User profile"
              aria-label="View user profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Logout */}
          <button
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
            title="Logout"
            aria-label="Logout from admin dashboard"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
