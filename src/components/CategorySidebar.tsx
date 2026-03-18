import Link from 'next/link';
import { getCategories } from '@/lib/illustrations';
import { categoryIcons } from '@/lib/config';

interface Props {
  activeCategory?: string;
}

export default function CategorySidebar({ activeCategory }: Props) {
  const categories = getCategories();

  return (
    <aside className="w-full">
      <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">カテゴリ</h2>
      <nav>
        <ul className="space-y-0.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.slug;
            const icon = categoryIcons[cat.name] || '📁';
            return (
              <li key={cat.slug}>
                <Link
                  href={`/category/${encodeURIComponent(cat.slug)}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-orange-100 text-orange-700 font-medium'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{icon}</span>
                    <span>{cat.name}</span>
                  </span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-orange-200 text-orange-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {cat.count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
