import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: '利用規約',
  description: `${siteConfig.name}のイラスト素材の利用規約です。商用利用・個人利用ともに無料でご利用いただけます。`,
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '利用規約' }]} />

      <h1 className="text-2xl font-bold text-gray-800 mb-8">利用規約</h1>

      <div className="prose-like space-y-10">
        {/* Summary box */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">
            かんたんまとめ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: '個人利用', value: '無料', ok: true },
              { label: '商用利用', value: '無料', ok: true },
              { label: 'クレジット表記', value: '不要', ok: true },
              { label: '加工・改変', value: 'OK', ok: true },
              { label: '再配布', value: '禁止', ok: false },
              { label: 'AI学習目的の一括DL', value: '禁止', ok: false },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 border border-orange-100"
              >
                <span className="text-sm text-gray-700">{item.label}</span>
                <span
                  className={`text-sm font-medium ${
                    item.ok ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            1. 利用の範囲
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-2">
            <p>
              当サイト「{siteConfig.name}」で公開しているイラスト素材は、個人利用・商用利用を問わず、
              どなたでも無料でご利用いただけます。
            </p>
            <p>利用可能な例:</p>
            <ul className="list-disc list-inside ml-2 space-y-1 text-gray-500">
              <li>ウェブサイト、ブログ、SNSへの掲載</li>
              <li>プレゼンテーション資料、企画書への使用</li>
              <li>チラシ、ポスター、パンフレット等の印刷物</li>
              <li>YouTube動画のサムネイルや挿入画像</li>
              <li>商品パッケージ、広告バナー</li>
              <li>教育機関での教材利用</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            2. クレジット表記について
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            イラスト素材をご利用の際、クレジット表記（出典の記載）は不要です。
            もしリンクやクレジットを記載していただける場合は、大変ありがたく存じます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            3. 加工・改変について
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            イラスト素材の色の変更、サイズ変更、トリミング、文字の追加など、
            自由に加工・改変してご利用いただけます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            4. 禁止事項
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-2">
            <p>以下の行為は禁止とさせていただきます。</p>
            <ul className="list-disc list-inside ml-2 space-y-1 text-gray-500">
              <li>
                イラスト素材をそのまま、または軽微な加工を加えた状態での再配布
                （素材集としての配布・販売を含む）
              </li>
              <li>
                イラスト素材をそのままの状態で商品化すること
                （Tシャツやグッズ等にイラストのみを印刷して販売する行為）
              </li>
              <li>
                AI（人工知能）の学習データとして使用する目的での一括ダウンロード、
                スクレイピング
              </li>
              <li>公序良俗に反する目的での使用</li>
              <li>
                イラスト素材を利用して、当サイトまたは第三者の名誉・信用を毀損する行為
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            5. 著作権について
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            当サイトに掲載されているイラスト素材の著作権は、当サイト運営者に帰属します。
            上記の利用規約の範囲内であれば、著作権者の許諾なくご利用いただけます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            6. 免責事項
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            イラスト素材の利用によって生じたいかなる損害についても、当サイトは一切の責任を負いかねます。
            ご利用は自己責任でお願いいたします。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-100">
            7. 規約の変更
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            本規約は予告なく変更される場合があります。変更後の規約は、当サイトに掲載した時点で
            効力を生じるものとします。
          </p>
        </section>

        <div className="text-right text-xs text-gray-400 pt-4 border-t border-gray-100">
          最終更新日: 2026年3月18日
        </div>
      </div>
    </div>
  );
}
