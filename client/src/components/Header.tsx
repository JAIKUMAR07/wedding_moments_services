import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { config } from "../config";
import { Camera, ShoppingBag, Menu, X } from "lucide-react";

const Header = () => {
  const { pathname } = useLocation();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={closeMobileMenu}
          >
            <Camera
              className="w-8 h-8 text-amber-400 group-hover:text-amber-300 transition-colors"
              strokeWidth={1.5}
            />
            <span className="text-lg md:text-xl font-serif font-semibold text-white group-hover:text-amber-400 transition-colors">
              <span className="hidden sm:inline">{config.studioName}</span>
              <span className="sm:hidden">Studio WM</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
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
                  {isActive(item.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side: Cart + Hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart Icon - Always Visible */}
            <Link
              to="/cart"
              className="relative p-2 text-white hover:text-amber-400 transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={2} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-white hover:text-amber-400 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <X className="w-6 h-6" strokeWidth={2} />
              ) : (
                // Hamburger Icon
                <Menu className="w-6 h-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Toggleable */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-4 pt-4 border-t border-white/10">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-amber-400"
                      : "text-white hover:text-amber-400"
                  }`}
                >
                  {item.name}
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
