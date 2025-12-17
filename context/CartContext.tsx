"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Define the shape of a Cart Item
export type CartItem = {
  id: string;
  title: string;
  artist: string; // <--- ADDED THIS
  price: string;
  image: string;
  quantity?: number; 
};

// 2. Define the shape of the Context
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate that the parsed data is an array
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        } else {
          console.error("Invalid cart data in localStorage, resetting cart");
          localStorage.removeItem("cart");
        }
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
      // Clear corrupted data and start fresh
      localStorage.removeItem("cart");
      setItems([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
      // Notify user if storage quota is exceeded or other errors occur
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.error("Storage quota exceeded. Cart may not be saved.");
      }
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems; 
      }
      setIsCartOpen(true); 
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeFromCart, 
        clearCart, 
        isCartOpen, 
        toggleCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}