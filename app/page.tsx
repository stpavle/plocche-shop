import Link from "next/link";
import VinylDisplay from "../components/VinylDisplay"; 
import { client } from "../lib/sanity"; 
import HomeHeroText from "../components/HomeHeroText";
import HomeFooter from "../components/HomeFooter";
import RecordMarquee from "../components/RecordMarquee";
import VantaBackground from "../components/VantaBackground"; 

async function getData() {
  const featuredQuery = `*[_type == "product"] | order(isFeatured desc, _createdAt desc)[0] {
    title, artist, price, "imageUrl": image.asset->url, labelColor, slug, _id, stock
  }`;

  // CORRECTED: Strictly filter for stock > 0.
  const listQuery = `*[_type == "product" && stock > 0] | order(_createdAt desc)[0...10] {
    title, artist, price, "imageUrl": image.asset->url, labelColor, slug, _id, stock
  }`;

  try {
    const [featured, list] = await Promise.all([
      client.fetch(featuredQuery),
      client.fetch(listQuery)
    ]);

    return { featured, list };
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    // Return fallback data instead of crashing the page
    return {
      featured: null,
      list: []
    };
  }
}

export default async function Home() {
  const { featured, list } = await getData();

  const marqueeItems = list.filter((item: any) => item._id !== featured?._id);

  const displayData = featured || {
    title: "Unknown Artist",
    artist: "Sarajevo Sessions",
    price: "35 KM",
    labelColor: "#FF4D00",
    imageUrl: null
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full overflow-hidden mb-24">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-multiply">
             <div className="relative w-full h-[200%] top-0">
                <div className="w-full h-full scale-[2.3] origin-center">
                    <VantaBackground />
                </div>
             </div>
          </div>

          <section className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 pb-12 items-center px-6 max-w-screen-2xl mx-auto">
            <div><HomeHeroText /></div>
            <div className="flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                {featured?.slug ? (
                  <Link href={`/product/${featured.slug.current}`}>
                     <VinylDisplay 
                        title={displayData.title}
                        artist={displayData.artist}
                        price={typeof displayData.price === 'number' ? `${displayData.price} KM` : displayData.price}
                        color={displayData.labelColor}
                        imageUrl={displayData.imageUrl}
                        stock={featured.stock} 
                     />
                  </Link>
                ) : (
                     <VinylDisplay 
                        title={displayData.title}
                        artist={displayData.artist}
                        price="-- KM"
                        color={displayData.labelColor}
                        imageUrl={displayData.imageUrl}
                     />
                )}
            </div>
          </section>
      </div>

      <div className="relative z-10">
        <RecordMarquee items={marqueeItems} />
      </div>

      <div className="px-6 relative z-10">
        <HomeFooter />
      </div>
    </div>
  );
}