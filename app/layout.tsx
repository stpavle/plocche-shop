import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Grain from "../components/Grain";
import CartDrawer from "../components/CartDrawer"; 
import { CartProvider } from "../context/CartContext"; 
import { LanguageProvider } from "../context/LanguageContext";
import { Toaster } from "sonner"; // <--- TOASTS
import { Analytics } from "@vercel/analytics/react"; // <--- ANALYTICS

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Plocche | Vinyl Store",
  description: "Curated vinyl in Bosnia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} bg-paper text-ink antialiased`}>
        <LanguageProvider>
          <CartProvider>
            <Grain />
            <Header />
            <CartDrawer />
            
            <main className="pt-20">
              {children}
            </main>

            {/* Notification Popup */}
            <Toaster 
              position="bottom-right" 
              toastOptions={{
                style: { background: '#F4F4F0', border: '1px solid #1A1A1A', color: '#1A1A1A', fontFamily: 'var(--font-mono)' }
              }} 
            />
            
            {/* Vercel Analytics */}
            <Analytics />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}