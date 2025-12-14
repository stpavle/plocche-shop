"use client";

import { useRef, useState, useEffect } from "react"; // <--- IMPORT useEffect
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import VinylDisplay from "./VinylDisplay";

export default function RecordCarousel({ items }: { items: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false); 

  if (!items || items.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      setIsScrolling(true); // Pause spinning when button is pressed
      
      const scrollAmount = 320; 
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      // Resume spinning after scroll completes (350ms)
      setTimeout(() => {
        setIsScrolling(false);
      }, 350); 
    }
  };

  // NEW: Automatic Scroll Logic (Option B)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const autoScroll = () => {
      if (scrollRef.current) {
        const currentScroll = scrollRef.current.scrollLeft;
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        
        // If we are at the end, jump back to the start (or nearly the start)
        if (currentScroll >= maxScroll - 1) { 
          scrollRef.current.scrollTo({ left: 0, behavior: "instant" });
        }
        
        // Then perform the actual smooth scroll
        scroll('right'); 
      }
      
      // Set the next interval
      timeoutId = setTimeout(autoScroll, 4000); // Wait 4 seconds before next scroll
    };

    // Start the loop
    timeoutId = setTimeout(autoScroll, 4000);

    // Cleanup: Clear timeout when component unmounts
    return () => clearTimeout(timeoutId);
  }, [items]); // Rerun effect if items change


  return (
    <div className="w-full py-12 border-t border-ink/10 bg-paper relative group">
        
        {/* Header + Controls */}
        <div className="px-6 md:px-12 mb-8 flex justify-between items-end">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink/40">
                Fresh in Stock — New Arrivals
            </h3>
            
            {/* Arrows */}
            <div className="flex gap-2">
                <button 
                  onClick={() => scroll("left")}
                  className="w-10 h-10 border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors rounded-full active:scale-90"
                >
                    <ArrowLeft size={16} />
                </button>
                <button 
                  onClick={() => scroll("right")}
                  className="w-10 h-10 border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors rounded-full active:scale-90"
                >
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>

        {/* Scroll Container */}
        <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-8 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
            {/* Render a duplicated list for continuous auto-scrolling feel */}
            {[...items, ...items].map((product, i) => (
                <div key={`${product._id}-${i}`} className="snap-center shrink-0 transform hover:-translate-y-2 transition-transform duration-300">
                    <Link href={`/product/${product.slug.current}`}>
                        <VinylDisplay
                            title={product.title}
                            artist={product.artist}
                            price={`${product.price} KM`}
                            color={product.labelColor}
                            imageUrl={product.imageUrl}
                            stock={product.stock}
                            // Pass the state down to pause the spin
                            isScrolling={isScrolling} 
                        />
                    </Link>
                </div>
            ))}
        </div>
    </div>
  );
}