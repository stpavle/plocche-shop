"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Define the shape of a Cart Item
export type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity?: number; // Optional, defaults to 1
};

// 2. Define the shape of the Context (What functions/data are available?)
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;     // <--- THIS WAS MISSING
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// 3. Create the Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Create the Provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // --- ACTIONS ---

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        // If item exists, usually we'd increase quantity, but for now let's just keep it simple
        return prevItems; 
      }
      return [...prevItems, newItem];
    });
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 5. Create the Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}