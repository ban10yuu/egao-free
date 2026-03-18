import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Site info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎨</span>
              <span className="font-bold text-gray-800">{siteConfig.name}</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              商用利用OK・クレジット不要の
              <br />
              オリジナルイラスト素材サイト
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mb-3">サイトメニュー</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-500 hover:text-orange-600 transition-colors">
                  トップページ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-500 hover:text-orange-600 transition-colors">
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-500 hover:text-orange-600 transition-colors">
                  利用規約
                </Link>
              </li>
            </ul>
          </div>

          {/* Usage */}
          <div>
            <h3 className="font-semibold text-gray-700 text-sm mb-3">ご利用について</h3>
            <ul className="space-y-1.5 text-sm text-gray-500">
              <li>個人・商用利用 無料</li>
              <li>クレジット表記 不要</li>
              <li>加工 OK</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
