import { MetadataRoute } from 'next';
import { client } from '../lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Fetch all product slugs
  const products = await client.fetch(`*[_type == "product"] { "slug": slug.current }`);

  // 2. Generate URLs for products
  const productUrls = products.map((product: any) => ({
    url: `https://plocche-shop.vercel.app/product/${product.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  // 3. Static Pages
  const staticUrls = [
    { url: 'https://plocche-shop.vercel.app', lastModified: new Date(), priority: 1 },
    { url: 'https://plocche-shop.vercel.app/shop', lastModified: new Date(), priority: 0.9 },
    { url: 'https://plocche-shop.vercel.app/info', lastModified: new Date(), priority: 0.7 },
  ];

  return [...staticUrls, ...productUrls];
}