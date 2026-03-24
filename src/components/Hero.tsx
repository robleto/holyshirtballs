import Link from 'next/link';
import SearchBar from './SearchBar';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface HeroProps {
  entryCount: number;
  franchiseCount: number;
}

export default function Hero({ entryCount, franchiseCount }: HeroProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/browse?search=${encodeURIComponent(value.trim())}`);
    } else {
      router.push('/browse');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white border-b border-orange-100">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        <span className="absolute -top-4 -left-4 text-[12rem] font-bold text-orange-100 rotate-[-12deg] leading-none">
          @#$!
        </span>
        <span className="absolute -bottom-6 -right-4 text-[8rem] font-bold text-amber-100 rotate-[8deg] leading-none">
          *!@%
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28 text-center">
        {/* Eyebrow */}
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-coral mb-4">
          <span className="w-6 h-px bg-brand-coral" />
          A Fictional Profanity Dictionary
          <span className="w-6 h-px bg-brand-coral" />
        </p>

        {/* Title */}
        <h1
          className="text-5xl sm:text-7xl font-extrabold text-gray-900 mb-5 leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
        >
          Holy Shirt
          <span className="text-brand-coral">Balls</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed mb-3">
          The internet&rsquo;s most comprehensive archive of made-up swear words, curses, insults,
          and taboo expressions — from every corner of film, TV, books, comics, and games.
        </p>

        {/* Stats */}
        <p className="text-sm text-gray-400 mb-10">
          <strong className="text-gray-700">{entryCount}</strong> entries across{' '}
          <strong className="text-gray-700">{franchiseCount}</strong> franchises. All completely fake. All deeply studied.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={handleSearch}
            placeholder='Try "frak", "Good Place", or "Huttese"…'
            autoFocus={false}
          />
        </div>

        {/* Quick filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {['TV', 'Film', 'Comic', 'Book', 'Game', 'Animation'].map((medium) => (
            <Link
              key={medium}
              href={`/browse?medium=${medium}`}
              className="px-3 py-1.5 text-sm rounded-full bg-white border border-gray-200 text-gray-600
                hover:border-brand-coral hover:text-brand-coral transition-colors shadow-sm"
            >
              {medium}
            </Link>
          ))}
          <Link
            href="/browse"
            className="px-3 py-1.5 text-sm rounded-full bg-brand-coral text-white
              hover:bg-orange-600 transition-colors shadow-sm"
          >
            Browse All →
          </Link>
        </div>
      </div>
    </section>
  );
}
