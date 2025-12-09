import { client } from "../../../lib/sanity";
import ProductGallery from "../../../components/ProductGallery";
import AddToCartButton from "../../../components/AddToCartButton";
import { Metadata } from "next";

// 1. DATA FETCHING LOGIC
async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == '${slug}'][0] {
      _id,
      title,
      artist,
      price,
      year,
      condition,
      description,
      pressing,
      "imageUrl": image.asset->url,
      "galleryUrls": gallery[].asset->url,
      labelColor
  }`;
  return client.fetch(query);
}

// 2. SEO METADATA GENERATOR (New)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getData(slug);

  if (!product) {
    return {
      title: "Record Not Found | Plocche",
    };
  }

  return {
    title: `${product.title} - ${product.artist} | Plocche`,
    description: `Buy ${product.title} by ${product.artist} on vinyl. Condition: ${product.condition || 'Used'}.`,
    openGraph: {
      title: `${product.title} | Plocche Vinyl`,
      description: `Listen to ${product.artist}. ${product.price} KM.`,
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

// 3. MAIN PAGE COMPONENT
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params for Next.js 15+ compatibility
  const { slug } = await params;
  const product = await getData(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-ink/40 font-mono">
        <h1 className="text-4xl mb-4">PRODUCT NOT FOUND</h1>
        <p>The record you are looking for is missing.</p>
      </div>
    );
  }

  const gallery = product.galleryUrls || [];

  return (
    <div className="min-h-screen p-6 md:p-12 max-w-7xl mx-auto pt-32">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* LEFT: GALLERY */}
        <div>
           <ProductGallery mainImage={product.imageUrl} gallery={gallery} />
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col h-full">
           
           {/* Header */}
           <div className="border-b border-ink/10 pb-6 mb-6">
             <h2 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-2">
                {product.artist}
             </h2>
             <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
                {product.title}
             </h1>

             <div className="flex items-center gap-4 flex-wrap">
                {/* 1. Price Badge */}
                <span className="bg-ink text-paper px-3 py-1 font-mono text-sm uppercase">
                    {product.price} KM
                </span>

                {/* 2. Condition Badge */}
                <span className="font-mono text-sm border border-ink/20 px-3 py-1 uppercase">
                    {product.condition || "Used"}
                </span>

                {/* 3. Pressing Info Badge */}
                {product.pressing && (
                    <span className="font-mono text-sm border border-ink/20 px-3 py-1 uppercase bg-worn/50">
                        {product.pressing}
                    </span>
                )}

                {/* 4. Year Badge */}
                {product.year && (
                    <span className="font-mono text-sm text-ink/60 border border-ink/20 px-3 py-1">
                        {product.year}
                    </span>
                )}
             </div>
           </div>

           {/* Description */}
           <div className="font-mono text-sm leading-relaxed text-ink/80 mb-12 whitespace-pre-wrap">
              {product.description}
           </div>

           {/* Action */}
           <div className="mt-auto">
             <AddToCartButton product={product} />
             <p className="mt-4 text-xs font-mono text-ink/40 uppercase">
                * Worldwide Shipping Available via Post
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}