"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
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
  increase: (id: number, color: string) => void;
  decrease: (id: number, color: string) => void;
  removeFromCart: (id: number, color: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Har cart line ab id + color se unique hai — same product alag color mein
  // do baar add ho to alag row banegi, taake har row apni sizing details rakh sake.
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

  const increase = (id: number, color: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id && item.color === color ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decrease = (id: number, color: string) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id && item.color === color ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id: number, color: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.color === color)));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increase, decrease, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}