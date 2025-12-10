import { client } from "../../lib/sanity";
import ShopBrowser from "../../components/ShopBrowser"; 

const getData = async () => {
  // 1. Calculate the cutoff date (30 Days Ago)
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 30);
  const cutoffString = cutoffDate.toISOString();

  // 2. Query Logic:
  // Show if Stock > 0
  // OR
  // Show if SoldOutAt is NEWER (greater) than 30 days ago
  const query = `*[_type == "product" && (stock > 0 || soldOutAt > $cutoff)] | order(stock desc, soldOutAt desc, _createdAt desc) {
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

  const data = await client.fetch(query, { cutoff: cutoffString });
  return data;
};

export default async function ShopPage() {
  const products = await getData();

  return (
    <div className="min-h-screen p-6 md:p-12">
      <ShopBrowser products={products} />
    </div>
  );
}