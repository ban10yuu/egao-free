'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  initialQuery?: string;
  large?: boolean;
}

export default function SearchForm({ initialQuery = '', large = false }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワードでイラストを探す（例: 猫、ビジネス、春）"
          className={`w-full border border-orange-200 bg-white text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-colors ${
            large
              ? 'pl-5 pr-14 py-4 rounded-2xl text-base'
              : 'pl-4 pr-12 py-2.5 rounded-full text-sm'
          }`}
        />
        <button
          type="submit"
          className={`absolute top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors ${
            large ? 'right-2 p-3' : 'right-1.5 p-2'
          }`}
          aria-label="検索"
        >
          <svg
            className={large ? 'w-5 h-5' : 'w-4 h-4'}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
