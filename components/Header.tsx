"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext"; 
// 1. IMPORT THE NEW LOGO
import Logo from "./Logo"; 

export default function Header() {
  const { items, toggleCart } = useCart();
  const { lang, toggleLanguage, t } = useLanguage(); 

  return (
    <header className="fixed top-0 left-0 w-full z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-sm transition-all">
      <div className="flex items-center justify-between px-6 py-4">
        
        {/* LEFT: LOGO SECTION */}
        <Link href="/" className="hover:opacity-70 transition-opacity block">
           {/* 2. USE THE COMPONENT */}
           <Logo />
        </Link>

        {/* RIGHT: NAVIGATION */}
        <nav className="flex items-center gap-6">
          <Link href="/shop" className="text-sm font-medium uppercase hover:text-accent transition-colors">
            {t.header.shop}
          </Link>
          
          <Link href="/info" className="hidden md:block text-sm font-medium uppercase hover:text-accent transition-colors">
            {t.header.info}
          </Link>
          
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