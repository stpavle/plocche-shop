import { client } from "../../lib/sanity";
import ShopBrowser from "../../components/ShopBrowser"; // <--- Import the new component

// Fetch Logic (Stays on Server for SEO)
const getData = async () => {
  const query = `*[_type == "product" && stock > 0] | order(_createdAt desc) {
    _id,
    title,
    artist,
    price,
    "imageUrl": image.asset->url, 
    labelColor,
    slug
  }`;
  const data = await client.fetch(query);
  return data;
};

export default async function ShopPage() {
  const products = await getData();

  return (
    <div className="min-h-screen p-6 md:p-12">
      {/* We pass the data to the Client Component to handle interactivity */}
      <ShopBrowser products={products} />
    </div>
  );
}