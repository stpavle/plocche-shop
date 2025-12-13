import type { Metadata } from "next";
// Removed 'Inter' from import
import { JetBrains_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"; //
import Grain from "../components/Grain"; //
import CartDrawer from "../components/CartDrawer"; //
import { CartProvider } from "../context/CartContext"; //
import { LanguageProvider } from "../context/LanguageContext"; //
import { Toaster } from "sonner"; //
import { Analytics } from "@vercel/analytics/react"; //

// Removed Inter declaration

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "700", "900"],
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
      {/* Removed inter.variable from body class */}
      <body className={`${montserrat.variable} ${mono.variable} font-sans bg-paper text-ink antialiased`}>
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