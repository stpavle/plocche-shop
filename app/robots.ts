import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Don't index the admin panel
    },
    sitemap: 'https://plocche-shop.vercel.app/sitemap.xml',
  };
}