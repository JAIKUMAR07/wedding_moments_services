import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem, CartContextType } from "../types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // Check if service already exists in cart
      const existingIndex = prevCart.findIndex(
        (cartItem) => cartItem.serviceId === item.serviceId,
      );

      if (existingIndex !== -1) {
        // Update existing item
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = item;
        return updatedCart;
      }

      // Add new item
      return [...prevCart, item];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.serviceId !== serviceId),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
