"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext"; // <--- Import Language Hook
import { toast } from "sonner";
import VinylDisplay from "./VinylDisplay"; 

interface Product {
  _id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  labelColor: string;
  slug: { current: string };
  stock: number;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const { addItem } = useCart();
  const { t } = useLanguage(); // <--- Get Translation Dictionary

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent navigating to product page
    
    addItem({
      id: product._id,
      title: product.title,
      price: `${product.price} KM`,
      image: product.imageUrl,
    });
    
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
      {products.map((product) => (
        <div key={product._id} className="group flex flex-col gap-4">
          <Link href={`/product/${product.slug.current}`}>
             <VinylDisplay 
                title={product.title}
                artist={product.artist}
                price={`${product.price} KM`}
                color={product.labelColor}
                imageUrl={product.imageUrl}
                stock={product.stock}
             />
          </Link>

          <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             {product.stock > 0 ? (
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="text-xs font-mono uppercase tracking-widest border-b border-accent text-accent hover:text-ink hover:border-ink transition-colors pb-1"
                >
                  {t.shop.addToCart} {/* <--- TRANSLATED STRING */}
                </button>
             ) : (
                <span className="text-xs font-mono uppercase tracking-widest text-ink/40 border-b border-transparent pb-1 cursor-not-allowed">
                  {t.product.soldOut}
                </span>
             )}
          </div>
        </div>
      ))}
    </div>
  );
}