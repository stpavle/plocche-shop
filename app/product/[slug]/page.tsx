import { client } from "../../../lib/sanity";
import ProductGallery from "../../../components/ProductGallery";
import AddToCartButton from "../../../components/AddToCartButton";
import { Metadata } from "next";
import Link from "next/link"; 
import VinylDisplay from "../../../components/VinylDisplay"; 

// 1. DATA FETCHING LOGIC
async function getData(slug: string) {
  const query = `{
    "product": *[_type == "product" && slug.current == '${slug}'][0] {
        _id, title, artist, price, year, condition, description, pressing, stock,
        "imageUrl": image.asset->url,
        "galleryUrls": gallery[].asset->url,
        labelColor, origin, genre
    },
    "related": *[_type == "product" && slug.current != '${slug}'][0...3] {
        _id, title, artist, price, stock, labelColor, "imageUrl": image.asset->url, slug
    }
  }`;
  return client.fetch(query);
}

// 2. SEO METADATA
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getData(slug);

  if (!product) {
    return { title: "Record Not Found | Plocche" };
  }

  return {
    title: `${product.title} - ${product.artist} | Plocche`,
    description: `Buy ${product.title} by ${product.artist}. Condition: ${product.condition || 'Used'}.`,
    openGraph: {
      title: `${product.title} | Plocche`,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

// 3. MAIN PAGE COMPONENT
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { product, related } = await getData(slug); 

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-ink/40 font-mono">
        <h1 className="text-4xl mb-4">PRODUCT NOT FOUND</h1>
      </div>
    );
  }

  const gallery = product.galleryUrls || [];

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto pt-32">
      
      {/* --- PRODUCT LAYOUT --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
        {/* LEFT: GALLERY */}
        <div>
           <ProductGallery mainImage={product.imageUrl} gallery={gallery} />
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col h-full">
           <div className="border-b border-ink/10 pb-6 mb-6">
             <h2 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2">{product.artist}</h2>
             <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">{product.title}</h1>
             <div className="flex items-center gap-4 flex-wrap">
                <span className="bg-ink text-paper px-3 py-1 font-mono text-sm uppercase">{product.price} KM</span>
                <span className="font-mono text-sm border border-ink/20 px-3 py-1 uppercase">{product.condition || "Used"}</span>
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
                    Sold Out
                </button>
             )}
             <p className="mt-4 text-xs font-mono text-ink/40 uppercase">
                * Worldwide Shipping Available via Post
             </p>
           </div>
        </div>
      </div>

      {/* --- RELATED RECORDS --- */}
      {related && related.length > 0 && (
        <div className="border-t border-ink/10 pt-12">
            <h3 className="font-mono text-xl uppercase tracking-tighter mb-8">You Might Also Like</h3>
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