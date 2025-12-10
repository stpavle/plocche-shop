"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner"; // <--- Import Sonner

type CartItem = {
  id: string; // Changed to string to match Sanity IDs
  title: string;
  price: string;
  artist: string;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    // Optional: Prevent duplicates if unique item
    const exists = items.find(i => i.id === item.id);
    if (exists) {
        toast.error("Item already in cart");
        return;
    }

    setItems((prev) => [...prev, item]);
    setIsCartOpen(true); 
    toast.success(`${item.title} added to crate.`); // <--- Toast Trigger
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, isCartOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}