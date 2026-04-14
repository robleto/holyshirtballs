import Link from 'next/link';
import SearchBar from './SearchBar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MediumIcon from './ui/MediumIcon';
import type { Medium } from '@/types/entry';
import { Shuffle } from 'lucide-react';

interface HeroProps {
  entryCount: number;
  franchiseCount: number;
  slugs: string[];
}

/*
  Hero section — the site's signature moment.
*/
export default function Hero({ entryCount, franchiseCount, slugs }: HeroProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const mediaQuickFilters: Medium[] = ['TV', 'Film', 'Comic', 'Book', 'Game', 'Animation'];

  const handleSearch = (value: string) => {
    if (value.trim()) {
      router.push(`/browse?search=${encodeURIComponent(value.trim())}`);
    } else {
      router.push('/browse');
    }
  };

  const handleLucky = () => {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/entry/${slug}`);
  };

  return (
    <section
      className="relative overflow-hidden border-b border-ink-100"
      style={{
        background: 'linear-gradient(160deg, #FFF8F4 0%, #FFF4EE 45%, #FFFCF9 100%)',
      }}
    >
      {/* Background glyph decoration — coral at low opacity, rotated for energy */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden={true}>
        {/* Top-left large glyph */}
        <span
          className="absolute font-extrabold leading-none -top-6 -left-6 font-display"
          style={{
            fontSize: '14rem',
            color: 'rgba(245, 93, 53, 0.06)',
            transform: 'rotate(-14deg)',
            userSelect: 'none',
          }}
        >
          @#$!
        </span>
        {/* Bottom-right smaller glyph */}
        <span
          className="absolute font-extrabold leading-none -bottom-8 -right-4 font-display"
          style={{
            fontSize: '9rem',
            color: 'rgba(245, 93, 53, 0.05)',
            transform: 'rotate(10deg)',
            userSelect: 'none',
          }}
        >
          *!@%
        </span>
      </div>

      <div className="relative max-w-5xl px-4 py-20 mx-auto text-center sm:py-28">

        {/* Eyebrow label */}
        <p className="mb-5 eyebrow">
          <span className="w-8 h-px bg-current opacity-60" />
          A Fictional Profanity Dictionary
          <span className="w-8 h-px bg-current opacity-60" />
        </p>

        {/* Site title — display hierarchy */}
        <h1
          className="font-display font-extrabold text-ink-900 mb-5 leading-none"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Holy Shirt
          <span className="text-brand-coral">Balls</span>
        </h1>

        {/* Subtitle */}
        <p
          className="max-w-2xl mx-auto mb-3 leading-relaxed text-ink-700"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
        >
          Every made-up swear word, curse, insult, and taboo expression from every corner of film,
          TV, books, comics, and games. Documented properly.
        </p>

        {/* Stats — subdued, precise */}
        <p className="mb-10 text-sm text-ink-500">
          <strong className="text-ink-900 font-bold">{entryCount}</strong> entries across{' '}
          <strong className="text-ink-900 font-bold">{franchiseCount}</strong> franchises.{' '}
          All completely fake. All deeply studied.
        </p>

        {/* Search + Feeling Lucky */}
        <div className="max-w-2xl mx-auto mb-8 flex items-center gap-3">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              onSubmit={handleSearch}
              placeholder='Try "frak", "Good Place", or "Huttese"'
              autoFocus={false}
            />
          </div>
          <button
            onClick={handleLucky}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-white bg-brand-coral hover:bg-brand-coral-hover transition-colors duration-150"
          >
            <Shuffle size={15} strokeWidth={2.25} aria-hidden />
            Random
          </button>
        </div>

        {/* Quick filter pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {mediaQuickFilters.map((medium) => (
          <Link
            key={medium}
            href={`/medium/${medium.toLowerCase()}`}
            className="hero-pill inline-flex items-center gap-1.5 px-3.5 py-3 text-sm font-semibold rounded-full"
          >
            <MediumIcon medium={medium} size={13} className="opacity-90" />
            <span>{medium}</span>
          </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
