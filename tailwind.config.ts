import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4F4F0", // Soft Off-White Background
        ink: "#1A1A1A",   // Soft Black Text
        grain: "#A3A3A3", // Grey for grain effect
        // UPDATED: Restoring a warm, gold accent color for nostalgia/pop
        accent: "#D4AF37", 
        worn: "#E5E5E5",  // Light grey for borders
      },
      fontFamily: {
        // ... keep Montserrat and Mono as is
        sans: ['var(--font-montserrat)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
};
export default config;