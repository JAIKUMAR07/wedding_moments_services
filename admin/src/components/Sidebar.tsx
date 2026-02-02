import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  TrendingUp,
  Settings,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navItems = [
    {
      path: "/",
      icon: LayoutDashboard,
      label: "Dashboard",
    },
    {
      path: "/services",
      icon: Package,
      label: "Services",
    },
    {
      path: "/pricing",
      icon: DollarSign,
      label: "Pricing",
    },
    {
      path: "/analytics",
      icon: TrendingUp,
      label: "Analytics",
    },
    {
      path: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div>
              <h1 className="text-2xl font-bold text-amber-400">
                Wedding Moments
              </h1>
              <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
            </div>
            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg">
              <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                <span className="text-amber-400 font-semibold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-400 truncate">
                  admin@wedding.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
