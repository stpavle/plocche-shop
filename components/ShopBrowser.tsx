"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ProductGrid from "./ProductGrid";

interface Product {
  _id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  labelColor: string;
  slug: { current: string };
}

export default function ShopBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const search = query.toLowerCase();
    return (
      product.title.toLowerCase().includes(search) ||
      product.artist.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      {/* --- Search Bar Section --- */}
      <div className="mb-16 pt-12 border-b border-ink/10 pb-6 flex flex-col md:flex-row justify-between md:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
            All Records
          </h1>
          <span className="font-mono text-sm text-ink/60 uppercase">
            {filteredProducts.length} Items Available
          </span>
        </div>

        {/* --- UPDATED CONTAINER --- */}
        {/* We move the hover translation HERE so both children move together */}
        <div className="relative w-full md:w-96 group transition-transform duration-300 ease-out hover:-translate-y-1"> 
          
          <input
            type="text"
            placeholder="Search Artist or Title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full 
              bg-paper/50 backdrop-blur-sm
              border-2 border-ink/20
              py-4 pl-6 pr-12
              font-mono text-sm uppercase 
              text-ink
              placeholder:text-ink/40
              transition-all duration-300 ease-out
              
              /* INTERACTION STATES */
              focus:outline-none 
              focus:border-accent 
              focus:bg-paper
              
              /* SHADOW on hover (Input specific) */
              group-hover:border-ink
              group-hover:shadow-[8px_8px_0px_0px_rgba(26,26,26,0.1)]
            "
          />
          
          {/* Icon - Now moves with the parent because the PARENT translates */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none group-hover:text-accent transition-colors">
            <Search size={20} />
          </div>
        </div>
      </div>

      {/* --- The Grid --- */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="py-20 text-center font-mono text-ink/40 uppercase">
          No records found for "{query}"
        </div>
      )}
    </div>
  );
}