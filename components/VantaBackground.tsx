"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// Declare Vanta on the window object to avoid TypeScript errors
declare global {
  interface Window {
    VANTA: any;
    p5: any;
  }
}

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Initialize Vanta once scripts are loaded
  useEffect(() => {
    if (!scriptsLoaded) return;

    if (!vantaEffect && window.VANTA && vantaRef.current) {
      setVantaEffect(
        window.VANTA.TRUNK({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          
          // --- PLOCCHE AESTHETIC SETTINGS ---
          color: 0x1A1A1A,       // 'Ink' Color (The lines)
          backgroundColor: 0xF4F4F0, // 'Paper' Color (Background)
          spacing: 0,            // Keep it tight or spread it out
          chaos: 1.5,            // Adds that "Analog/Organic" feel
          // ----------------------------------
        })
      );
    }

    // Cleanup on unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [scriptsLoaded, vantaEffect]);

  return (
    <>
      {/* 1. Load Dependencies from CDN */}
      {/* Vanta Trunk relies on p5.js */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js" 
        strategy="lazyOnload"
      />
      {/* Load Vanta Trunk */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.trunk.min.js"
        strategy="lazyOnload"
        onLoad={() => setScriptsLoaded(true)}
      />

      {/* 2. The Container */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none mix-blend-multiply opacity-60"
      />
    </>
  );
}