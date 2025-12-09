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

    // --- NEW: Add a timeout to wait for global script execution ---
    const timer = setTimeout(() => {
      if (window.VANTA && vantaRef.current) {
        if (!vantaEffect) {
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
              
              // PLOCCHE AESTHETIC SETTINGS
              color: 0x1A1A1A,
              backgroundColor: 0xF4F4F0,
              spacing: 0,
              chaos: 1.5,
            })
          );
        }
      }
    }, 500); // 500ms delay to ensure scripts are fully registered

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [scriptsLoaded, vantaEffect]);

  // We are using the internal onload hook on the second script to trigger scriptsLoaded = true
  return (
    <>
      {/* 1. Load Dependencies from CDN */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js" 
        strategy="afterInteractive" 
      />
      {/* Load Vanta Trunk */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.trunk.min.js"
        strategy="afterInteractive" 
        onLoad={() => {
            setScriptsLoaded(true);
        }}
      />

      {/* 2. The Container */}
      <div 
        ref={vantaRef} 
        className="absolute inset-0 w-full h-full -z-10 pointer-events-none mix-blend-multiply opacity-60"
      />
    </>
  );
}