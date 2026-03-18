import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getIllustrationById,
  getAllIllustrations,
  getRelatedIllustrations,
} from '@/lib/illustrations';
import { siteConfig } from '@/lib/config';
import PlaceholderImage from '@/components/PlaceholderImage';
import DownloadButton from '@/components/DownloadButton';
import IllustrationGrid from '@/components/IllustrationGrid';
import Breadcrumb from '@/components/Breadcrumb';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const illustrations = getAllIllustrations();
  return illustrations.map((ill) => ({
    id: String(ill.id),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const illustration = getIllustrationById(Number(id));

  if (!illustration) {
    return { title: 'イラストが見つかりません' };
  }

  return {
    title: `${illustration.title}のイラスト`,
    description: illustration.description,
    openGraph: {
      title: `${illustration.title} | ${siteConfig.name}`,
      description: illustration.description,
      url: `${siteConfig.url}/illustration/${id}`,
      images: [
        {
          url: illustration.imagePath,
          alt: illustration.title,
        },
      ],
    },
  };
}

export default async function IllustrationDetailPage({ params }: Props) {
  const { id } = await params;
  const illustration = getIllustrationById(Number(id));

  if (!illustration) {
    notFound();
  }

  const related = getRelatedIllustrations(illustration.id, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: illustration.title,
    description: illustration.description,
    contentUrl: `${siteConfig.url}${illustration.imagePath}`,
    url: `${siteConfig.url}/illustration/${id}`,
    datePublished: illustration.createdAt,
    license: `${siteConfig.url}/terms`,
    acquireLicensePage: `${siteConfig.url}/terms`,
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
          name: illustration.category,
          item: `${siteConfig.url}/category/${encodeURIComponent(
            illustration.category
          )}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: illustration.title,
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
        <Breadcrumb
          items={[
            {
              label: illustration.category,
              href: `/category/${encodeURIComponent(illustration.category)}`,
            },
            { label: illustration.title },
          ]}
        />

        {/* Main content area */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="flex flex-col lg:flex-row">
            {/* Image area */}
            <div className="lg:w-1/2 bg-orange-50/60 flex items-center justify-center p-8 lg:p-12 min-h-[300px] lg:min-h-[400px]">
              {illustration.imagePath ? (
                <img
                  src={illustration.imagePath}
                  alt={illustration.title}
                  className="max-w-full max-h-[360px] object-contain"
                />
              ) : (
                <PlaceholderImage
                  title={illustration.title}
                  category={illustration.category}
                  size="lg"
                />
              )}
            </div>

            {/* Info area */}
            <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col">
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                {illustration.title}
              </h1>

              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {illustration.description}
              </p>

              {/* Meta info */}
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-20 shrink-0">カテゴリ</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/category/${encodeURIComponent(
                        illustration.category
                      )}`}
                      className="text-orange-600 hover:underline"
                    >
                      {illustration.category}
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-600">
                      {illustration.subcategory}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-20 shrink-0">追加日</span>
                  <span className="text-gray-600">
                    {new Date(illustration.createdAt).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 w-20 shrink-0">形式</span>
                  <span className="text-gray-600">PNG（透過背景）</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {illustration.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Download button - pushed to bottom */}
              <div className="mt-auto">
                <DownloadButton
                  imagePath={illustration.imagePath}
                  title={illustration.title}
                />
                <p className="mt-3 text-[11px] text-gray-400">
                  商用利用OK / クレジット不要 / 加工OK
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related illustrations */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-lg font-bold text-gray-800 mb-6">
              関連イラスト
            </h2>
            <IllustrationGrid illustrations={related} />
          </section>
        )}
      </div>
    </>
  );
}
