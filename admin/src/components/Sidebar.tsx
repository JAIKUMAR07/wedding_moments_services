import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  DollarSign,
  BarChart3,
  Settings,
  Camera,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Services", path: "/services", icon: Package },
    { name: "Pricing", path: "/pricing", icon: DollarSign },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
            <Camera className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-white">
              Wedding Moments
            </h1>
            <p className="text-xs text-gray-400">Admin Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-amber-500/10 text-amber-400 font-medium"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                  {active && (
                    <div className="ml-auto w-1 h-6 bg-amber-400 rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="px-4 py-3 bg-gray-800/50 rounded-lg">
          <p className="text-xs text-gray-400 mb-1">Current Version</p>
          <p className="text-sm font-semibold text-white">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
