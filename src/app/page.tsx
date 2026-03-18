import Link from 'next/link';
import { getAllIllustrations, getCategories, getTotalCount } from '@/lib/illustrations';
import { categoryIcons, siteConfig } from '@/lib/config';
import IllustrationGrid from '@/components/IllustrationGrid';
import SearchForm from '@/components/SearchForm';

export default function HomePage() {
  const illustrations = getAllIllustrations();
  const categories = getCategories();
  const totalCount = getTotalCount();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero section */}
      <section className="bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-6xl mx-auto px-4 pt-12 pb-10">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              ぜんぶ無料、ぜんぶ使える。
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mb-6">
              商用OK・クレジット不要のオリジナルイラスト素材
              <span className="inline-block ml-1 text-orange-500 font-medium">
                {totalCount}点
              </span>
            </p>
            <SearchForm large />
          </div>

          {/* Popular tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400">人気:</span>
            {['ビジネス', '猫', '春', '食べ物', '子供'].map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="text-xs px-3 py-1 rounded-full bg-white border border-orange-100 text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Categories section */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">カテゴリから探す</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat) => {
              const icon = categoryIcons[cat.name] || '📁';
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${encodeURIComponent(cat.slug)}`}
                  className="flex flex-col items-center gap-2 py-5 px-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </span>
                  <span className="text-[11px] text-gray-400">{cat.count}点</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* New illustrations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">新着イラスト</h2>
            <span className="text-xs text-gray-400">最新順</span>
          </div>
          <IllustrationGrid illustrations={illustrations} />
        </section>
      </div>
    </>
  );
}
