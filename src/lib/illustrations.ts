import illustrationsData from '../../data/illustrations.json';
import type { Illustration, Category } from '@/types/illustration';

const illustrations: Illustration[] = illustrationsData as Illustration[];

export function getAllIllustrations(): Illustration[] {
  return illustrations.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getIllustrationById(id: number): Illustration | undefined {
  return illustrations.find((ill) => ill.id === id);
}

export function getIllustrationsByCategory(category: string): Illustration[] {
  return illustrations
    .filter((ill) => ill.category === category)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function getIllustrationsBySubcategory(
  category: string,
  subcategory: string
): Illustration[] {
  return illustrations
    .filter((ill) => ill.category === category && ill.subcategory === subcategory)
    .sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function searchIllustrations(query: string): Illustration[] {
  const q = query.toLowerCase();
  return illustrations.filter(
    (ill) =>
      ill.title.toLowerCase().includes(q) ||
      ill.description.toLowerCase().includes(q) ||
      ill.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      ill.category.toLowerCase().includes(q) ||
      ill.subcategory.toLowerCase().includes(q)
  );
}

export function getCategories(): Category[] {
  const categoryMap = new Map<
    string,
    { subcategories: Set<string>; count: number }
  >();

  illustrations.forEach((ill) => {
    const existing = categoryMap.get(ill.category);
    if (existing) {
      existing.subcategories.add(ill.subcategory);
      existing.count++;
    } else {
      categoryMap.set(ill.category, {
        subcategories: new Set([ill.subcategory]),
        count: 1,
      });
    }
  });

  return Array.from(categoryMap.entries()).map(([name, data]) => ({
    slug: name,
    name,
    subcategories: Array.from(data.subcategories),
    count: data.count,
  }));
}

export function getRelatedIllustrations(
  id: number,
  limit: number = 4
): Illustration[] {
  const target = getIllustrationById(id);
  if (!target) return [];

  return illustrations
    .filter((ill) => ill.id !== id)
    .map((ill) => {
      let score = 0;
      if (ill.category === target.category) score += 3;
      if (ill.subcategory === target.subcategory) score += 2;
      const commonTags = ill.tags.filter((tag) => target.tags.includes(tag));
      score += commonTags.length;
      return { ill, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.ill);
}

export function getTotalCount(): number {
  return illustrations.length;
}
