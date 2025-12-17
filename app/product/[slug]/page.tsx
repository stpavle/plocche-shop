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

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error(`Failed to fetch product data for slug: ${slug}`, error);
    // Return empty data instead of crashing
    return {
      product: null,
      related: []
    };
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const { product } = await getData(slug);

    if (!product) {
      return { title: "Record Not Found | Plocche" };
    }

    return {
      title: `${product.title} - ${product.artist} | Plocche`,
      description: `Buy ${product.title} by ${product.artist}.`,
      openGraph: { title: `${product.title} | Plocche`, images: product.imageUrl ? [product.imageUrl] : [] },
    };
  } catch (error) {
    console.error("Failed to generate metadata for product page:", error);
    return { title: "Product | Plocche" };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { product, related } = await getData(slug);

    if (!product) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-ink/40 font-mono">
          <h1 className="text-4xl mb-4">PRODUCT NOT FOUND</h1>
          <p className="text-sm">The product you're looking for doesn't exist or has been removed.</p>
        </div>
      );
    }

    // Pass data to Client Component for translation
    return <ProductPageContent product={product} related={related} />;
  } catch (error) {
    console.error("Error rendering product page:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-ink/40 font-mono">
        <h1 className="text-4xl mb-4">ERROR</h1>
        <p className="text-sm">An error occurred while loading this product. Please try again later.</p>
      </div>
    );
  }
}