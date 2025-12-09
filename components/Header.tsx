"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext"; // Import Language

export default function Header() {
  const { items, toggleCart } = useCart();
  const { lang, toggleLanguage, t } = useLanguage(); // Get language tools

  return (
    <header className="fixed top-0 left-0 w-full z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-xl font-bold tracking-tight uppercase hover:text-accent transition-colors">
          Plocche
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/shop" className="text-sm font-medium uppercase hover:text-accent transition-colors">
            {t.header.shop} {/* Translated Word */}
          </Link>
          
          <Link href="/info" className="hidden md:block text-sm font-medium uppercase hover:text-accent transition-colors">
            {t.header.info}
          </Link>
          
          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage} 
            className="font-mono text-xs border border-ink/20 px-2 py-1 rounded hover:bg-ink hover:text-paper transition-colors uppercase"
          >
            {lang}
          </button>
          
          <button 
            onClick={toggleCart}
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <ShoppingBag size={20} />
            <span className="font-mono text-xs">({items.length})</span>
          </button>
        </nav>
      </div>
    </header>
  );
}