import Link from 'next/link';
import type { Illustration } from '@/types/illustration';
import PlaceholderImage from './PlaceholderImage';

interface Props {
  illustration: Illustration;
  priority?: boolean;
}

export default function IllustrationCard({ illustration, priority = false }: Props) {
  const hasImage = !!illustration.imagePath;

  return (
    <Link
      href={`/illustration/${illustration.id}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-200"
    >
      <div className="aspect-square bg-orange-50/60 p-4 flex items-center justify-center overflow-hidden">
        {hasImage ? (
          <img
            src={illustration.imagePath}
            alt={illustration.title}
            loading={priority ? 'eager' : 'lazy'}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <PlaceholderImage
            title={illustration.title}
            category={illustration.category}
          />
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
          {illustration.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100">
            {illustration.category}
          </span>
          {illustration.subcategory && (
            <span className="text-[11px] text-gray-400">
              {illustration.subcategory}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
