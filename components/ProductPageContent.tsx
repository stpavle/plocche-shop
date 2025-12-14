"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import ProductGallery from "./ProductGallery";
import AddToCartButton from "./AddToCartButton";
import VinylDisplay from "./VinylDisplay";

export default function ProductPageContent({ product, related }: { product: any, related: any }) {
  const { t } = useLanguage();
  const gallery = product.galleryUrls || [];

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto pt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
        <div>
           <ProductGallery mainImage={product.imageUrl} gallery={gallery} />
        </div>

        <div className="flex flex-col h-full">
           <div className="border-b border-ink/10 pb-6 mb-6">
             <h2 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2">{product.artist}</h2>
             <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">{product.title}</h1>
             <div className="flex items-center gap-4 flex-wrap">
                <span className="bg-ink text-paper px-3 py-1 font-mono text-sm uppercase">{product.price} KM</span>
                <span className="font-mono text-sm border border-ink/20 px-3 py-1 uppercase">{product.condition || t.product.used}</span>
             </div>
           </div>

           <div className="font-mono text-sm leading-relaxed text-ink/80 mb-12 whitespace-pre-wrap">
              {product.description}
           </div>

           <div className="mt-auto">
             {product.stock > 0 ? (
                <AddToCartButton product={product} />
             ) : (
                <button disabled className="w-full bg-ink/10 text-ink/40 py-4 font-mono text-sm uppercase cursor-not-allowed">
                    {t.product.soldOut}
                </button>
             )}
             <p className="mt-4 text-xs font-mono text-ink/40 uppercase">
                {t.product.shipping}
             </p>
           </div>
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="border-t border-ink/10 pt-12">
            <h3 className="font-mono text-xl uppercase tracking-tighter mb-8">{t.product.related}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((item: any) => (
                    <div key={item._id} className="flex flex-col gap-4">
                        <Link href={`/product/${item.slug.current}`}>
                            <VinylDisplay 
                                title={item.title}
                                artist={item.artist}
                                price={`${item.price} KM`}
                                color={item.labelColor}
                                imageUrl={item.imageUrl}
                                stock={item.stock}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}