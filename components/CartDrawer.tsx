"use client";

import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext"; // <--- 1. Import Hook
import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, removeFromCart } = useCart();
  const { t } = useLanguage(); // <--- 2. Get Dictionary
  const router = useRouter();

  const total = items.reduce((acc, item) => {
    const priceNumber = parseInt(item.price.replace(/\D/g, '')); 
    return acc + priceNumber;
  }, 0);

  const handleCheckout = () => {
    toggleCart(); 
    router.push("/checkout"); 
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-ink/20 z-50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-paper border-l border-ink/10 z-[60] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-ink/10 flex justify-between items-center bg-paper">
              {/* 3. Translated Heading */}
              <h2 className="font-mono uppercase text-sm tracking-widest">
                {t.cart.heading} ({items.length})
              </h2>
              <button onClick={toggleCart} className="hover:rotate-90 transition-transform">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="h-full flex items-center justify-center text-ink/40 font-mono text-sm uppercase">
                  {/* 4. Translated Empty State */}
                  {t.cart.empty}
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-start border-b border-dashed border-ink/20 pb-4">
                    <div>
                      <h4 className="font-bold uppercase text-lg">{item.title}</h4>
                      <p className="font-mono text-xs text-ink/60">{item.artist}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="font-mono font-bold">{item.price}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-ink/40 hover:text-accent transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-ink/10 bg-worn/30">
              <div className="flex justify-between font-bold text-xl uppercase mb-6">
                {/* 5. Translated Total Label */}
                <span>{t.cart.total}</span>
                <span>{total} KM</span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-ink text-paper py-4 font-mono text-sm uppercase tracking-widest hover:bg-accent hover:text-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* 6. Translated Button */}
                {t.cart.checkout}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}