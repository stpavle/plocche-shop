"use client";

import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext"; // <--- 1. Import Hook

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();
  const { t } = useLanguage(); // <--- 2. Get Dictionary

  return (
    <button 
      onClick={() => addToCart({
          id: product._id,
          title: product.title,
          price: `${product.price} KM`, 
          artist: product.artist
      })}
      className="w-full bg-accent text-white py-4 font-mono text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
    >
      {/* 3. Translated Text */}
      {t.product.addToCart} — {product.price} KM
    </button>
  );
}