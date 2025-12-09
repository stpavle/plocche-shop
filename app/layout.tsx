import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Grain from "../components/Grain";
import CartDrawer from "../components/CartDrawer"; // NEW
import { CartProvider } from "../context/CartContext"; // NEW
import { LanguageProvider } from "../context/LanguageContext";

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
        <LanguageProvider>  {/* <--- OUTER WRAPPER */}
          <CartProvider>    {/* <--- INNER WRAPPER */}
            <Grain />
            <Header />
            <CartDrawer />
            <main className="pt-20">
              {children}
            </main>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}