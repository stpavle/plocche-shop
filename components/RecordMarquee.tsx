"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import VinylDisplay from "./VinylDisplay";

// We simply duplicate the list to create the "infinite" loop effect
const MarqueeItem = ({ product }: { product: any }) => (
  <div className="mx-8 transform scale-75 origin-top hover:scale-90 transition-transform duration-300">
    <Link href={`/product/${product.slug.current}`}>
        <VinylDisplay
            title={product.title}
            artist={product.artist}
            price={`${product.price} KM`}
            color={product.labelColor}
            imageUrl={product.imageUrl}
        />
    </Link>
  </div>
);

export default function RecordMarquee({ items }: { items: any[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full overflow-hidden py-12 border-t border-ink/10 bg-paper">
        {/* Label */}
        <div className="px-6 mb-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-ink/40">
                Fresh in Stock — New Arrivals
            </h3>
        </div>

        {/* The Sliding Track */}
        <div className="flex relative">
            <motion.div
                className="flex"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30, // Adjust speed here (higher = slower)
                }}
            >
                {/* Render items twice to ensure seamless looping */}
                {[...items, ...items].map((product, i) => (
                    <MarqueeItem key={`${product._id}-${i}`} product={product} />
                ))}
            </motion.div>
        </div>
    </div>
  );
}