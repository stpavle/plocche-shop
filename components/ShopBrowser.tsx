"use client";

import { useState } from "react";
import { Search, X, ArrowUpDown } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { useLanguage } from "../context/LanguageContext"; // <--- Import

interface Product {
  _id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  labelColor: string;
  slug: { current: string };
  origin?: string;
  genre?: string;
  stock: number;
}

export default function ShopBrowser({ products }: { products: Product[] }) {
  const { t } = useLanguage(); // <--- Hook
  const [query, setQuery] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"newest" | "price_asc" | "price_desc">("newest");

  const availableGenres = Array.from(new Set(products.map(p => p.genre).filter(Boolean)));

  const filteredProducts = products
    .filter((product) => {
        const search = query.toLowerCase();
        const matchesSearch = 
          product.title.toLowerCase().includes(search) ||
          product.artist.toLowerCase().includes(search);
        
        const matchesOrigin = selectedOrigin ? product.origin === selectedOrigin : true;
        const matchesGenre = selectedGenre ? product.genre === selectedGenre : true;

        return matchesSearch && matchesOrigin && matchesGenre;
    })
    .sort((a, b) => {
        if (sortOrder === "price_asc") return a.price - b.price;
        if (sortOrder === "price_desc") return b.price - a.price;
        return 0; 
    });

  return (
    <div>
      {/* --- HEADER --- */}
      <div className="mb-12 pt-12 border-b border-ink/10 pb-8">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
              {t.shop.title}
            </h1>
            <span className="font-mono text-sm text-ink/60 uppercase">
              {filteredProducts.length} {t.shop.itemsFound}
            </span>
          </div>

          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder={t.shop.searchPlaceholder}
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
        <div className="flex flex-col md:flex-row gap-8 font-mono text-xs uppercase tracking-widest items-start md:items-center">
          
          {/* Origin */}
          <div className="flex gap-4 items-center">
            <span className="text-ink/40">{t.shop.region}</span>
            <button onClick={() => setSelectedOrigin(null)} className={`${!selectedOrigin ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}>{t.shop.all}</button>
            <button onClick={() => setSelectedOrigin("balkan")} className={`${selectedOrigin === "balkan" ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}>{t.shop.balkan}</button>
            <button onClick={() => setSelectedOrigin("worldwide")} className={`${selectedOrigin === "worldwide" ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}>{t.shop.worldwide}</button>
          </div>

          {/* Genre */}
          <div className="flex gap-4 items-center flex-wrap">
            <span className="text-ink/40">{t.shop.genre}</span>
            <button onClick={() => setSelectedGenre(null)} className={`${!selectedGenre ? "text-accent border-b border-accent" : "text-ink/60 hover:text-ink"}`}>{t.shop.all}</button>
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
            
          {/* SORTING */}
          <div className="flex items-center gap-2 md:ml-auto border-l border-ink/10 pl-8 md:pl-0 md:border-none">
             <ArrowUpDown size={14} className="text-ink/40"/>
             <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="bg-transparent border-none outline-none cursor-pointer text-ink hover:text-accent uppercase font-mono text-xs tracking-widest"
             >
                <option value="newest">{t.shop.sort.newest}</option>
                <option value="price_asc">{t.shop.sort.priceLow}</option>
                <option value="price_desc">{t.shop.sort.priceHigh}</option>
             </select>
          </div>

          {/* Clear Button */}
          {(selectedOrigin || selectedGenre || query) && (
            <button 
                onClick={() => { setSelectedOrigin(null); setSelectedGenre(null); setQuery(""); }}
                className="text-red-500 flex items-center gap-1 hover:opacity-70"
            >
                <X size={14} /> {t.shop.clear}
            </button>
          )}

        </div>
      </div>

      {/* --- The Grid --- */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="py-32 text-center font-mono text-ink/40 uppercase">
          <p className="text-xl mb-2">{t.shop.noRecords}</p>
          <button onClick={() => { setSelectedOrigin(null); setSelectedGenre(null); setQuery(""); }} className="text-accent underline">
            {t.shop.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}