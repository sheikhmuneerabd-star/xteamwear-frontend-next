"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Product } from "@/types/product";
import type { SizingFormData } from "@/types/sizing";

export interface CartItem extends Product {
  qty: number;
  color: string;
  sizingDetailData?: SizingFormData;
}

interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product, color: string, sizingDetailData?: SizingFormData) => void;
  increase: (id: number | string, color: string) => void;
  decrease: (id: number | string, color: string) => void;
  removeFromCart: (id: number | string, color: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Page Initial Load par LocalStorage se Cart Recover karein
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("xteamwear_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // 2. Jab bhi Cart Update ho, LocalStorage me Save karein
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("xteamwear_cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart, isLoaded]);

  // Har cart line ab id + color se unique hai
  const addToCart = (product: Product, color: string, sizingDetailData?: SizingFormData) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.color === color);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.color === color
            ? { ...item, qty: item.qty + 1, sizingDetailData: sizingDetailData ?? item.sizingDetailData }
            : item
        );
      }
      return [...prev, { ...product, qty: 1, color, sizingDetailData }];
    });
  };

  const increase = (id: number | string, color: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id && item.color === color ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decrease = (id: number | string, color: string) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id && item.color === color ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: number | string, color: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.color === color)));
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("xteamwear_cart");
    } catch (error) {
      console.error("Failed to clear cart from localStorage:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}