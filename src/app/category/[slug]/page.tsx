import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getIllustrationsByCategory,
  getCategories,
} from '@/lib/illustrations';
import { siteConfig } from '@/lib/config';
import IllustrationGrid from '@/components/IllustrationGrid';
import CategorySidebar from '@/components/CategorySidebar';
import Breadcrumb from '@/components/Breadcrumb';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug);
  const illustrations = getIllustrationsByCategory(categoryName);

  if (illustrations.length === 0) {
    return { title: 'カテゴリが見つかりません' };
  }

  return {
    title: `${categoryName}のイラスト一覧`,
    description: `${categoryName}に関するフリーイラスト素材${illustrations.length}点。商用利用OK・クレジット不要で無料ダウンロードできます。`,
    openGraph: {
      title: `${categoryName}のイラスト一覧 | ${siteConfig.name}`,
      description: `${categoryName}に関するフリーイラスト素材${illustrations.length}点`,
      url: `${siteConfig.url}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categoryName = decodeURIComponent(slug);
  const illustrations = getIllustrationsByCategory(categoryName);

  if (illustrations.length === 0) {
    notFound();
  }

  const subcategories = [
    ...new Set(illustrations.map((ill) => ill.subcategory)),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName}のイラスト一覧`,
    description: `${categoryName}に関するフリーイラスト素材`,
    url: `${siteConfig.url}/category/${slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'トップ',
          item: siteConfig.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryName,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: categoryName }]} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-56 shrink-0">
            <CategorySidebar activeCategory={categoryName} />
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="mb-8">
              <h1 className="text-xl font-bold text-gray-800 mb-2">
                {categoryName}のイラスト
              </h1>
              <p className="text-sm text-gray-500">
                {illustrations.length}点のイラスト素材
              </p>
              {subcategories.length > 1 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <IllustrationGrid illustrations={illustrations} />
          </div>
        </div>
      </div>
    </>
  );
}
