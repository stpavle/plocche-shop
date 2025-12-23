"use client";

import React from "react";

export default function Logo() {
  return (
    // ADJUSTED: Changed gap-3 (12px) to gap-1 (4px) for a tighter, more standard spacing.
    <div className="flex items-center gap-[0.04em] select-none group cursor-pointer relative">

      {/* 1. 'pl' */}
      <span className="font-sans font-black text-3xl md:text-4xl text-ink tracking-[0.04em] relative top-[-2px] transition-colors group-hover:text-accent">
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

          {/* NEW: Groove Reflection (Arc) - More Realistic */}
          <div className="absolute inset-[15%] rounded-full border-t-[2px] border-white/20 rotate-12"></div>
          {/* Secondary subtle arc */}
          <div className="absolute inset-[25%] rounded-full border-b-[1px] border-white/10 -rotate-45"></div>

          {/* Inner Label (Dark Grey) */}
          <div className="absolute inset-[30%] bg-[#333] rounded-full"></div>

        </div>

        {/* 2b. The STATIONARY Spindle Dot (Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

          {/* Spindle Hole (Paper Color) */}
          <div className="w-2 h-2 bg-paper rounded-full flex items-center justify-center">

            {/* Inner Black Dot */}
            <div className="w-[2px] h-[2px] bg-ink rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 3. 'cche' */}
      <span className="font-sans font-black text-3xl md:text-4xl text-ink tracking-[0.04em] relative top-[-2px] transition-colors group-hover:text-accent">
        cche
      </span>
    </div>
  );
}