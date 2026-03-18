import { categoryIcons } from '@/lib/config';

interface Props {
  title: string;
  category: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

/**
 * SVGベースのプレースホルダー画像。
 * 実データ差し替え時にはnext/imageのImageコンポーネントに置き換え。
 */
export default function PlaceholderImage({
  title,
  category,
  size = 'md',
}: Props) {
  const icon = categoryIcons[category] || '🖼️';

  const sizeMap = {
    sm: { w: 120, h: 120, iconSize: 32, textSize: 10 },
    md: { w: 200, h: 200, iconSize: 48, textSize: 11 },
    lg: { w: 400, h: 400, iconSize: 72, textSize: 14 },
  };

  const s = sizeMap[size];

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-2 select-none"
      role="img"
      aria-label={title}
    >
      <span
        className={
          size === 'lg' ? 'text-6xl' : size === 'md' ? 'text-4xl' : 'text-2xl'
        }
      >
        {icon}
      </span>
      <span
        className={`text-gray-400 text-center px-2 leading-tight ${
          size === 'lg'
            ? 'text-sm max-w-[280px]'
            : size === 'md'
            ? 'text-[11px] max-w-[160px]'
            : 'text-[10px] max-w-[100px]'
        }`}
      >
        {title}
      </span>
    </div>
  );
}
