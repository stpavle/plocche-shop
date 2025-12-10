import { client } from "../../lib/sanity";
import ShopBrowser from "../../components/ShopBrowser"; 

const getData = async () => {
  // Added 'origin' and 'genre' to the query
  const query = `*[_type == "product" && stock > 0] | order(_createdAt desc) {
    _id,
    title,
    artist,
    price,
    "imageUrl": image.asset->url, 
    labelColor,
    slug,
    origin,
    genre
  }`;
  const data = await client.fetch(query);
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