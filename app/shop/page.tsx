import { client } from "../../lib/sanity";
import ShopBrowser from "../../components/ShopBrowser"; 

// 1. Fetch Logic (Server-Side)
const getData = async () => {
  try {
    // Calculate the date 30 days ago
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30);
    const cutoffString = cutoffDate.toISOString();

    // THE SMART QUERY:
    // - stock > 0: Show available items
    // - !defined(soldOutAt): Show items you manually set to 0 in Studio (which have no timestamp)
    // - soldOutAt > $cutoff: Show items that sold out automatically within the last 30 days
    const query = `*[_type == "product" && (stock > 0 || !defined(soldOutAt) || soldOutAt > $cutoff)] | order(stock desc, soldOutAt desc, _createdAt desc) {
      _id,
      title,
      artist,
      price,
      stock,
      "imageUrl": image.asset->url,
      labelColor,
      slug,
      origin,
      genre,
      soldOutAt
    }`;

    // Pass the cutoff date variable to Sanity
    const data = await client.fetch(query, { cutoff: cutoffString });
    return data;
  } catch (error) {
    console.error("Failed to fetch shop products:", error);
    // Return empty array instead of crashing
    return [];
  }
};

export default async function ShopPage() {
  try {
    const products = await getData();

    return (
      <div className="min-h-screen p-6 md:p-12">
        {/* Pass the smart list to the interactive browser */}
        <ShopBrowser products={products} />
      </div>
    );
  } catch (error) {
    console.error("Error rendering shop page:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-ink/40 font-mono">
        <h1 className="text-4xl mb-4">ERROR</h1>
        <p className="text-sm">An error occurred while loading the shop. Please try again later.</p>
      </div>
    );
  }
}