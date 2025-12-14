"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useLanguage } from "../../context/LanguageContext";
import { createOrder } from "../actions";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2, Store, Truck } from "lucide-react";

export default function CheckoutPage() {
  const { items, items: cartItems } = useCart();
  const { t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [deliveryMethod, setDeliveryMethod] = useState<'shipping' | 'pickup'>('shipping');

  const total = items.reduce((acc, item) => {
    const priceNumber = parseInt(item.price.replace(/\D/g, '')); 
    return acc + priceNumber;
  }, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      address: deliveryMethod === 'pickup' 
        ? "STORE PICKUP (Banja Luka)" 
        : formData.get("address"),
      city: deliveryMethod === 'pickup' 
        ? "Banja Luka" 
        : formData.get("city"),
      postalCode: deliveryMethod === 'pickup' 
        ? "78000" 
        : formData.get("postalCode"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      deliveryMethod: deliveryMethod, 
    };

    const result = await createOrder(data, cartItems);
    setLoading(false);
    if (result.success) setIsSuccess(true);
    else alert("Error processing order");
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle size={64} className="text-accent mb-6" />
        <h1 className="text-4xl font-bold uppercase mb-4">{t.checkout.successTitle}</h1>
        <p className="font-mono text-ink/60 mb-8 max-w-md">
            {deliveryMethod === 'pickup' 
                ? t.checkout.successMsgPickup 
                : t.checkout.successMsg}
        </p>
        <Link href="/" className="bg-ink text-paper px-8 py-3 uppercase font-mono text-sm hover:bg-accent hover:text-ink transition-colors">
          {t.checkout.backHome}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-6xl mx-auto">
      <div className="mb-12 pt-8">
        <Link href="/shop" className="flex items-center gap-2 text-sm font-mono uppercase text-ink/60 hover:text-accent mb-4">
          <ArrowLeft size={16} /> {t.checkout.back}
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
          {t.checkout.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest border-b border-ink/10 pb-4 mb-6">
            {t.checkout.shippingDetails}
          </h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* DELIVERY METHOD TOGGLE */}
            <div className="grid grid-cols-2 gap-4 mb-2">
                <button
                    type="button"
                    onClick={() => setDeliveryMethod('shipping')}
                    className={`flex flex-col items-center justify-center gap-3 p-6 border transition-all ${deliveryMethod === 'shipping' ? 'border-accent bg-accent/5' : 'border-ink/20 hover:border-ink/40'}`}
                >
                    <Truck size={24} className={deliveryMethod === 'shipping' ? 'text-accent' : 'text-ink/60'} />
                    <span className="font-mono text-xs uppercase font-bold">{t.checkout.shippingMethod}</span>
                </button>
                <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`flex flex-col items-center justify-center gap-3 p-6 border transition-all ${deliveryMethod === 'pickup' ? 'border-accent bg-accent/5' : 'border-ink/20 hover:border-ink/40'}`}
                >
                    <Store size={24} className={deliveryMethod === 'pickup' ? 'text-accent' : 'text-ink/60'} />
                    <span className="font-mono text-xs uppercase font-bold">{t.checkout.pickupMethod}</span>
                    <span className="text-[10px] text-ink/40 uppercase">{t.checkout.pickupLocation}</span>
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">{t.checkout.firstName}</label>
                    <input name="firstName" required type="text" className="w-full bg-transparent border border-ink/20 p-3 outline-none focus:border-accent transition-colors" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase">{t.checkout.lastName}</label>
                    <input name="lastName" required type="text" className="w-full bg-transparent border border-ink/20 p-3 outline-none focus:border-accent transition-colors" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase">{t.checkout.email}</label>
                <input name="email" required type="email" className="w-full bg-transparent border border-ink/20 p-3 outline-none focus:border-accent transition-colors" />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase">{t.checkout.phone}</label>
                <input name="phone" required type="tel" className="w-full bg-transparent border border-ink/20 p-3 outline-none focus:border-accent transition-colors" />
            </div>

            {deliveryMethod === 'shipping' && (
                <div className="animate-in fade-in slide-in-from-top-4 space-y-6 pt-4 border-t border-ink/10 border-dashed">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase">{t.checkout.address}</label>
                        <input name="address" required type="text" className="w-full bg-transparent border border-ink/20 p-3 outline-none focus:border-accent transition-colors" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase">{t.checkout.city}</label>
                            <input name="city" required type="text" className="w-full bg-transparent border border-ink/20 p-3 outline-none focus:border-accent transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase">{t.checkout.postal}</label>
                            <input name="postalCode" required type="text" className="w-full bg-transparent border border-ink/20 p-3 outline-none focus:border-accent transition-colors" />
                        </div>
                    </div>
                </div>
            )}

            <button type="submit" disabled={loading} className="mt-6 w-full bg-ink text-paper py-4 font-mono text-sm uppercase tracking-widest hover:bg-accent hover:text-ink transition-colors flex justify-center">
                {loading ? <Loader2 className="animate-spin" /> : (
                    deliveryMethod === 'pickup' ? `${t.checkout.confirmPickup} — ${total} KM` : t.checkout.confirm
                )}
            </button>
          </form>
        </div>

        <div className="bg-worn/30 p-8 h-fit border border-ink/10">
          <h3 className="font-mono text-xs uppercase tracking-widest border-b border-ink/10 pb-4 mb-6">
            {t.checkout.orderSummary}
          </h3>
          <div className="flex flex-col gap-4 mb-6">
            {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                    <span>{item.title}</span>
                    <span className="font-mono">{item.price}</span>
                </div>
            ))}
          </div>
          <div className="border-t border-dashed border-ink/20 pt-4 mt-auto">
            <div className="flex justify-between font-bold uppercase text-lg">
                <span>{t.checkout.total}</span>
                <span>{total} KM</span>
            </div>
            <p className="mt-4 text-xs font-mono text-ink/60">
                {deliveryMethod === 'pickup' 
                    ? t.checkout.pickupNote
                    : t.checkout.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}