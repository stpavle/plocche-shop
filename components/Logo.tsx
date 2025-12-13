"use client";

import React from "react";

export default function Logo() {
  return (
    // ADJUSTED: Changed gap-3 (12px) to gap-1 (4px) for a tighter, more standard spacing.
    <div className="flex items-center gap-1 select-none group cursor-pointer relative"> 
      
      {/* 1. 'pl' */}
      <span className="font-sans font-black text-3xl md:text-4xl text-ink tracking-tight relative top-[-2px] transition-colors group-hover:text-accent">
        pl
      </span>

      {/* 2. The Vinyl 'o' Container (w/ non-spinning overlay) */}
      <div className="relative w-7 h-7 md:w-9 md:h-9 shrink-0">
        
        {/* 2a. The Spinning Disc */}
        <div className="absolute inset-0 animate-spin-slow"> 
            
            {/* Vinyl Body (Black) */}
            <div className="absolute inset-0 bg-ink rounded-full shadow-sm"></div>
            
            {/* The "Shine" */}
            <div className="absolute inset-0 rounded-full border-[2px] border-transparent border-b-paper/30 border-r-paper/30 rotate-45 transform scale-75"></div>

            {/* Inner Label (Dark Grey) */}
            <div className="absolute inset-[10%] bg-[#333] rounded-full"></div>
            
        </div>
        
        {/* 2b. The STATIONARY Spindle Dot (Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            
            {/* Spindle Hole (Paper Color) */}
            <div className="w-3 h-3 bg-paper rounded-full flex items-center justify-center">
                
                {/* Inner Black Dot */}
                <div className="w-[3px] h-[3px] bg-ink rounded-full"></div> 
            </div>
        </div>
      </div>
      
      {/* 3. 'cche' */}
      <span className="font-sans font-black text-3xl md:text-4xl text-ink tracking-tight relative top-[-2px] transition-colors group-hover:text-accent"> 
        cche
      </span>
    </div>
  );
}