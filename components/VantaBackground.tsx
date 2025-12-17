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
  const [error, setError] = useState(false);

  // Initialize Vanta once scripts are loaded
  useEffect(() => {
    if (!scriptsLoaded) return;

    // --- Add a timeout to wait for global script execution with error handling ---
    const timer = setTimeout(() => {
      try {
        // Validate that VANTA is available
        if (!window.VANTA) {
          console.error("VANTA library failed to load");
          setError(true);
          return;
        }

        // Validate that the ref is available
        if (!vantaRef.current) {
          console.error("Vanta container ref is not available");
          setError(true);
          return;
        }

        // Only create effect if it doesn't exist
        if (!vantaEffect) {
          try {
            const effect = window.VANTA.TRUNK({
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
            });
            setVantaEffect(effect);
          } catch (initError) {
            console.error("Failed to initialize VANTA effect:", initError);
            setError(true);
          }
        }
      } catch (error) {
        console.error("Unexpected error in Vanta initialization:", error);
        setError(true);
      }
    }, 500); // 500ms delay to ensure scripts are fully registered

    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (destroyError) {
          console.error("Error destroying Vanta effect:", destroyError);
        }
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
        onError={(e) => {
          console.error("Failed to load p5.js:", e);
          setError(true);
        }}
      />
      {/* Load Vanta Trunk */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.trunk.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          setScriptsLoaded(true);
        }}
        onError={(e) => {
          console.error("Failed to load Vanta script:", e);
          setError(true);
        }}
      />

      {/* 2. The Container - with fallback background if Vanta fails */}
      <div
        ref={vantaRef}
        className={`absolute inset-0 w-full h-full -z-10 pointer-events-none mix-blend-multiply opacity-60 ${
          error ? 'bg-gradient-to-br from-paper to-worn' : ''
        }`}
      />
    </>
  );
}