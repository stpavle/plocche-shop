"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Define the shape of a Cart Item
export type CartItem = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity?: number; 
};

// 2. Define the shape of the Context
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeFromCart: (id: string) => void; // <--- RENAMED to match CartDrawer
  clearCart: () => void;
  isCartOpen: boolean; // <--- RESTORED
  toggleCart: () => void; // <--- RESTORED
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  // RESTORED: State for the drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // --- ACTIONS ---

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems; 
      }
      // Open cart automatically when adding an item
      setIsCartOpen(true); 
      return [...prevItems, newItem];
    });
  };

  // RENAMED FUNCTION to match interface
  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  // RESTORED FUNCTION
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeFromCart, // <--- EXPORTED AS removeFromCart
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