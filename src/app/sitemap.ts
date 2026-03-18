import type { MetadataRoute } from 'next';
import { getAllIllustrations, getCategories } from '@/lib/illustrations';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const illustrations = getAllIllustrations();
  const categories = getCategories();

  const illustrationUrls: MetadataRoute.Sitemap = illustrations.map((ill) => ({
    url: `${siteConfig.url}/illustration/${ill.id}`,
    lastModified: new Date(ill.createdAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${siteConfig.url}/category/${encodeURIComponent(cat.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...categoryUrls,
    ...illustrationUrls,
  ];
}
