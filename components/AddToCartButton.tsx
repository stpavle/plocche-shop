"use client";

import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart(); 
  const { t } = useLanguage();

  return (
    <button 
      onClick={() => addItem({
          id: product._id,
          title: product.title,
          artist: product.artist, // <--- NOW PASSING ARTIST
          price: `${product.price} KM`, 
          image: product.imageUrl 
      })}
      className="w-full bg-accent text-white py-4 font-mono text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
    >
      {t.product.addToCart} — {product.price} KM
    </button>
  );
}