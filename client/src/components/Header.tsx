import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const location = useLocation();
  const { cart } = useCart();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Cart", path: "/cart" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg
              className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-lg md:text-xl font-serif font-semibold text-white group-hover:text-amber-400 transition-colors">
              <span className="hidden sm:inline">Wedding Moments</span>
              <span className="sm:hidden">WM Studio</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive(item.path)
                      ? "text-amber-400"
                      : "text-white hover:text-amber-400"
                  }`}
                >
                  {item.name}
                  {item.name === "Cart" && cart.length > 0 && (
                    <span className="absolute -top-2 -right-4 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cart.length}
                    </span>
                  )}
                  {isActive(item.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
        </div>

        {/* Mobile Menu - Simple version */}
        <div className="md:hidden mt-4 pt-4 border-t border-white/10">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block text-sm font-medium ${
                    isActive(item.path) ? "text-amber-400" : "text-white"
                  }`}
                >
                  {item.name}
                  {item.name === "Cart" && cart.length > 0 && (
                    <span className="ml-2 text-amber-400">({cart.length})</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
