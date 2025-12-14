"use client";

import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function AddToCartButton({ product }: { product: any }) {
  // FIX 1: Use 'addItem' instead of 'addToCart' to match CartContext
  const { addItem } = useCart(); 
  const { t } = useLanguage();

  return (
    <button 
      onClick={() => addItem({ // FIX 1: Call addItem
          id: product._id,
          title: product.title,
          price: `${product.price} KM`, 
          image: product.imageUrl // FIX 2: Pass 'image' (required by Context), not 'artist'
      })}
      className="w-full bg-accent text-white py-4 font-mono text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
    >
      {t.product.addToCart} — {product.price} KM
    </button>
  );
}