import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

interface HeaderProps {
  randomSlug?: string;
}

export default function Header({ randomSlug }: HeaderProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    const handleChange = () => setMenuOpen(false);
    router.events.on('routeChangeComplete', handleChange);
    return () => router.events.off('routeChangeComplete', handleChange);
  }, [router.events]);

  const nav = [
    { href: '/browse', label: 'Browse' },
    { href: '/about', label: 'About' },
    { href: '/contribute', label: 'Contribute' },
  ];

  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-extrabold text-lg text-gray-900 hover:text-brand-coral transition-colors shrink-0"
          style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
        >
          <span className="text-brand-coral text-xl" aria-hidden>@#$!</span>
          <span>HolyShirtBalls</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${isActive(href)
                  ? 'bg-orange-50 text-brand-coral'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {randomSlug && (
            <Link
              href={`/entry/${randomSlug}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                text-gray-600 hover:text-brand-coral hover:bg-orange-50 transition-colors"
              title="Random entry"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 3l3-3 3 3M17 17v4" />
              </svg>
              Random
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive(href)
                  ? 'bg-orange-50 text-brand-coral'
                  : 'text-gray-700 hover:bg-gray-50'}`}
            >
              {label}
            </Link>
          ))}
          {randomSlug && (
            <Link
              href={`/entry/${randomSlug}`}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              🎲 Random Entry
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
