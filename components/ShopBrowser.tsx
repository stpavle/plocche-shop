"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import ProductGrid from "./ProductGrid";

interface Product {
  _id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  labelColor: string;
  slug: { current: string };
  origin?: string; // New field
  genre?: string;  // New field
}

export default function ShopBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Get unique genres from products for the dropdown/list
  const availableGenres = Array.from(new Set(products.map(p => p.genre).filter(Boolean)));

  // --- FILTERING LOGIC ---
  const filteredProducts = products.filter((product) => {
    const search = query.toLowerCase();
    const matchesSearch = 
      product.title.toLowerCase().includes(search) ||
      product.artist.toLowerCase().includes(search);
    
    const matchesOrigin = selectedOrigin ? product.origin === selectedOrigin : true;
    const matchesGenre = selectedGenre ? product.genre === selectedGenre : true;

    return matchesSearch && matchesOrigin && matchesGenre;
  });

  return (
    <div>
      {/* --- HEADER & CONTROLS --- */}
      <div className="mb-12 pt-12 border-b border-ink/10 pb-8">
        
        {/* Title & Count */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
              All Records
            </h1>
            <span className="font-mono text-sm text-ink/60 uppercase">
              {filteredProducts.length} Items Found
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder="SEARCH..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-paper/50 border border-ink/20 py-3 pl-4 pr-10 font-mono text-sm uppercase focus:outline-none focus:border-accent transition-all placeholder:text-ink/30"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 pointer-events-none">
              <Search size={16} />
            </div>
          </div>
        </div>

        {/* --- FILTERS ROW --- */}
        <div className="flex flex-col md:flex-row gap-8 font-mono text-xs uppercase tracking-widest">
          
          {/* Origin Filter */}
          <div className="flex gap-4 items-center">
            <span className="text-ink/40">Region:</span>
            <button 
              onClick={() => setSelectedOrigin(null)}
              className={`${!selectedOrigin ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}
            >
              All
            </button>
            <button 
              onClick={() => setSelectedOrigin("balkan")}
              className={`${selectedOrigin === "balkan" ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}
            >
              Balkan
            </button>
            <button 
              onClick={() => setSelectedOrigin("worldwide")}
              className={`${selectedOrigin === "worldwide" ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}
            >
              Worldwide
            </button>
          </div>

          {/* Genre Filter */}
          <div className="flex gap-4 items-center flex-wrap">
            <span className="text-ink/40">Genre:</span>
            <button 
                onClick={() => setSelectedGenre(null)}
                className={`${!selectedGenre ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}
            >
                All
            </button>
            {availableGenres.map(genre => (
                <button 
                    key={genre}
                    onClick={() => setSelectedGenre(genre as string)}
                    className={`${selectedGenre === genre ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}
                >
                    {genre}
                </button>
            ))}
          </div>

          {/* Clear Button (Only shows if filters active) */}
          {(selectedOrigin || selectedGenre || query) && (
            <button 
                onClick={() => { setSelectedOrigin(null); setSelectedGenre(null); setQuery(""); }}
                className="ml-auto text-red-500 flex items-center gap-1 hover:opacity-70"
            >
                <X size={14} /> Clear
            </button>
          )}

        </div>
      </div>

      {/* --- The Grid --- */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="py-32 text-center font-mono text-ink/40 uppercase">
          <p className="text-xl mb-2">No records found</p>
          <button onClick={() => { setSelectedOrigin(null); setSelectedGenre(null); setQuery(""); }} className="text-accent underline">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}