import type { Illustration } from '@/types/illustration';
import IllustrationCard from './IllustrationCard';

interface Props {
  illustrations: Illustration[];
  priorityCount?: number;
}

export default function IllustrationGrid({
  illustrations,
  priorityCount = 4,
}: Props) {
  if (illustrations.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-4xl block mb-3">🔍</span>
        <p className="text-gray-500">イラストが見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {illustrations.map((ill, i) => (
        <IllustrationCard
          key={ill.id}
          illustration={ill}
          priority={i < priorityCount}
        />
      ))}
    </div>
  );
}
