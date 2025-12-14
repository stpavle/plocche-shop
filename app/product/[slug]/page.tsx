import { client } from "../../../lib/sanity";
import { Metadata } from "next";
import ProductPageContent from "../../../components/ProductPageContent"; // <--- Import new component

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { product } = await getData(slug);
  if (!product) return { title: "Record Not Found | Plocche" };
  return {
    title: `${product.title} - ${product.artist} | Plocche`,
    description: `Buy ${product.title} by ${product.artist}.`,
    openGraph: { title: `${product.title} | Plocche`, images: product.imageUrl ? [product.imageUrl] : [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { product, related } = await getData(slug); 

  if (!product) {
    return <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-ink/40 font-mono"><h1 className="text-4xl mb-4">PRODUCT NOT FOUND</h1></div>;
  }

  // Pass data to Client Component for translation
  return <ProductPageContent product={product} related={related} />;
}