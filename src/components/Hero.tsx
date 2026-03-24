import Link from 'next/link';
import SearchBar from './SearchBar';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface HeroProps {
  entryCount: number;
  franchiseCount: number;
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
    <section
      className="relative overflow-hidden border-b"
      style={{
        background: 'linear-gradient(160deg, #FFF8F4 0%, #FFF4EE 45%, #FFFCF9 100%)',
        borderBottomColor: '#F2EDEA',
      }}
    >
      {/* Background glyph decoration — coral at 8% opacity, rotated for energy */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
        {/* Top-left large glyph */}
        <span
          className="absolute -top-6 -left-6 font-display font-extrabold leading-none"
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
          className="absolute -bottom-8 -right-4 font-display font-extrabold leading-none"
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

      <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28 text-center">

        {/* Eyebrow label */}
        <p className="eyebrow mb-5">
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
          className="max-w-2xl mx-auto leading-relaxed mb-3"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#4A3F3A',
          }}
        >
          The internet&rsquo;s most comprehensive archive of made-up swear words, curses, insults,
          and taboo expressions &mdash; from every corner of film, TV, books, comics, and games.
        </p>

        {/* Stats — subdued, precise */}
        <p className="text-sm mb-10" style={{ color: '#8C807A' }}>
          <strong style={{ color: '#1A1210', fontWeight: 700 }}>{entryCount}</strong> entries across{' '}
          <strong style={{ color: '#1A1210', fontWeight: 700 }}>{franchiseCount}</strong> franchises.{' '}
          All completely fake. All deeply studied.
        </p>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={handleSearch}
            placeholder='Try "frak", "Good Place", or "Huttese"\u2026'
            autoFocus={false}
          />
        </div>

        {/* Quick filter pills — outline + one solid primary */}
        <div className="flex flex-wrap justify-center gap-2">
          {['TV', 'Film', 'Comic', 'Book', 'Game', 'Animation'].map((medium) => (
            <Link
              key={medium}
              href={`/browse?medium=${medium}`}
              className="px-3.5 py-1.5 text-sm font-semibold rounded-full bg-white transition-all duration-150"
              style={{
                border: '1px solid #D4CCC8',
                color: '#4A3F3A',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#F55D35';
                (e.currentTarget as HTMLElement).style.color = '#F55D35';
                (e.currentTarget as HTMLElement).style.background = '#FFF4EE';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#D4CCC8';
                (e.currentTarget as HTMLElement).style.color = '#4A3F3A';
                (e.currentTarget as HTMLElement).style.background = 'white';
              }}
            >
              {medium}
            </Link>
          ))}
          {/* Primary CTA pill — solid coral */}
          <Link
            href="/browse"
            className="px-3.5 py-1.5 text-sm font-semibold rounded-full text-white transition-colors duration-150"
            style={{ background: '#F55D35' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#D94A22';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#F55D35';
            }}
          >
            Browse All &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
