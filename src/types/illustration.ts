export interface Illustration {
  id: number;
  title: string;
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  imagePath: string;
  createdAt: string;
}

export interface Category {
  slug: string;
  name: string;
  subcategories: string[];
  count: number;
}
