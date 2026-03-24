import Link from 'next/link';
import SearchBar from './SearchBar';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MediumIcon from './ui/MediumIcon';
import type { Medium } from '@/types/entry';
import { getAllSlugs } from '@/lib/entries';
import { Shuffle } from 'lucide-react';

interface HeroProps {
  entryCount: number;
  franchiseCount: number;
  randomSlug: string;
}

/*
  Hero section — the site's signature moment.

  Design decisions:
  - Background: warm cream gradient (cream -> parchment) instead of orange-50 -> white.
    This connects smoothly to the body background (parchment), preventing the hard edge
    that occurred when a bright orange gradient met a pure-white body.
  - Background glyphs: coral at lower opacity (not orange-100/amber-100 which read as pale blobs)
  - Eyebrow: uses the `eyebrow` utility class with flanking rule bars
  - Title: letter-spacing tightened for display size; "Balls" span carries the coral
  - Stats: ink-500 muted text; strong values in ink-800 (not gray-700)
  - Quick filter pills: outline style matching the Button outline variant
  - "Browse All" pill: solid coral — intentional hierarchy, not an outlier
*/
export default function Hero({ entryCount, franchiseCount, randomSlug }: HeroProps) {
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
    const slugs = getAllSlugs();
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    router.push(`/entry/${slug}`);
  };

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{
        background: 'linear-gradient(160deg, #FFF8F4 0%, #FFF4EE 45%, #FFFCF9 100%)',
        borderBottomColor: '#F2EDEA',
      }}
    >
      {/* Background glyph decoration — coral at 8% opacity, rotated for energy */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
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
          className="font-display font-extrabold text-[#1A1210] mb-5 leading-none"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          Holy Shirt
          <span style={{ color: '#F55D35' }}>Balls</span>
        </h1>

        {/* Subtitle */}
        <p
          className="max-w-2xl mx-auto mb-3 leading-relaxed"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#4A3F3A',
          }}
        >
          Every made-up swear word, curse, insult, and taboo expression from every corner of film,
          TV, books, comics, and games. Documented properly.
        </p>

        {/* Stats — subdued, precise */}
        <p className="mb-10 text-sm" style={{ color: '#8C807A' }}>
          <strong style={{ color: '#1A1210', fontWeight: 700 }}>{entryCount}</strong> entries across{' '}
          <strong style={{ color: '#1A1210', fontWeight: 700 }}>{franchiseCount}</strong> franchises.{' '}
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
            className="shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-white transition-colors duration-150"
            style={{ background: '#F55D35' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#D94A22'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#F55D35'; }}
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
            className="hero-pill inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold rounded-full"
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
