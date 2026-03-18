'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo, Suspense } from 'react';
import illustrationsData from '../../../data/illustrations.json';
import type { Illustration } from '@/types/illustration';
import IllustrationGrid from '@/components/IllustrationGrid';
import SearchForm from '@/components/SearchForm';
import Breadcrumb from '@/components/Breadcrumb';

const illustrations: Illustration[] = illustrationsData as Illustration[];

function searchIllustrations(query: string): Illustration[] {
  const q = query.toLowerCase();
  return illustrations.filter(
    (ill) =>
      ill.title.toLowerCase().includes(q) ||
      ill.description.toLowerCase().includes(q) ||
      ill.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      ill.category.toLowerCase().includes(q) ||
      ill.subcategory.toLowerCase().includes(q)
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query] = useState(initialQuery);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchIllustrations(query.trim());
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '検索結果' }]} />

      <div className="max-w-xl mb-8">
        <SearchForm initialQuery={initialQuery} />
      </div>

      {initialQuery ? (
        <>
          <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-800">
              「{initialQuery}」の検索結果
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {results.length}件のイラストが見つかりました
            </p>
          </div>
          <IllustrationGrid illustrations={results} />
        </>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="text-gray-500 text-lg mb-2">
            キーワードを入力して検索してください
          </p>
          <p className="text-gray-400 text-sm">
            例: ビジネス、猫、春、食べ物
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-10 w-80 bg-gray-200 rounded-full mb-8" />
            <div className="h-6 w-60 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
