import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';
import { getTotalCount, getCategories } from '@/lib/illustrations';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'このサイトについて',
  description: `${siteConfig.name}は、商用利用OK・クレジット不要のオリジナルイラスト素材を無料で提供するサイトです。`,
};

export default function AboutPage() {
  const totalCount = getTotalCount();
  const categories = getCategories();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'このサイトについて' }]} />

      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        このサイトについて
      </h1>

      <div className="space-y-10">
        {/* Intro */}
        <section>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 lg:p-8 border border-orange-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              {siteConfig.name}とは
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              「{siteConfig.name}」は、だれでも自由に使えるオリジナルイラスト素材を提供するサイトです。
              ビジネス資料、ウェブサイト、SNS、チラシ、教材など、さまざまな用途に無料でご利用いただけます。
            </p>
          </div>
        </section>

        {/* Stats */}
        <section>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center py-6 bg-white rounded-xl border border-gray-100">
              <p className="text-2xl font-bold text-orange-500">{totalCount}</p>
              <p className="text-xs text-gray-500 mt-1">イラスト素材数</p>
            </div>
            <div className="text-center py-6 bg-white rounded-xl border border-gray-100">
              <p className="text-2xl font-bold text-orange-500">
                {categories.length}
              </p>
              <p className="text-xs text-gray-500 mt-1">カテゴリ数</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            ご利用のポイント
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: '💰',
                title: '完全無料',
                desc: '個人利用・商用利用ともに無料。料金は一切かかりません。',
              },
              {
                icon: '📝',
                title: 'クレジット不要',
                desc: '出典の記載なしでお使いいただけます。もちろん記載していただいても構いません。',
              },
              {
                icon: '✂️',
                title: '加工OK',
                desc: '色の変更、トリミング、文字追加など、自由に加工・改変できます。',
              },
              {
                icon: '🖼️',
                title: 'PNG形式',
                desc: '透過背景のPNG形式でダウンロード。そのまま使いやすいファイル形式です。',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100"
              >
                <span className="text-2xl shrink-0">{feature.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage note */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            ご利用にあたって
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            素材のご利用前に、
            <Link
              href="/terms"
              className="text-orange-600 hover:underline font-medium"
            >
              利用規約
            </Link>
            をご確認ください。再配布やAI学習目的での一括ダウンロードは禁止しております。
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            ご不明な点がございましたら、お気軽にお問い合わせください。
          </p>
        </section>
      </div>
    </div>
  );
}
