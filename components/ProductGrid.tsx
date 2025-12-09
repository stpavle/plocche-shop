"use client";

import VinylDisplay from "./VinylDisplay";
import { useCart } from "../context/CartContext";
import Link from "next/link"; // Import Link

interface Product {
  _id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string; 
  labelColor: string;
  slug: { current: string }; // We need the slug to know where to go
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 pb-24">
      {products.map((record) => (
        <div key={record._id} className="flex flex-col gap-4">
           {/* Wrap the Display in a Link to the product page */}
           <Link href={`/product/${record.slug.current}`}>
             <VinylDisplay 
                title={record.title} 
                artist={record.artist} 
                price={`${record.price} KM`} 
                color={record.labelColor}
                imageUrl={record.imageUrl} 
             />
           </Link>
           
           <button 
              onClick={() => addToCart({
                  id: parseInt(record._id) || Math.random(), 
                  title: record.title,
                  price: `${record.price} KM`,
                  artist: record.artist
              })}
              className="mx-auto text-xs font-mono uppercase tracking-widest border-b border-transparent hover:border-accent hover:text-accent transition-all"
           >
              + Add to Cart
           </button>
        </div>
      ))}
    </div>
  );
}