import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Compass, Info, PenLine } from 'lucide-react';
import LogoIcon from '@/components/ui/LogoIcon';


/*
  Header — sticky nav with warm parchment background.

  Design decisions:
  - Background: warm parchment (#FFFCF9) instead of pure white — matches body
  - Border: ink-100 (#F2EDEA) — warmer than border-gray-100
  - Logo glyph: coral at full saturation, no emoji
  - Active nav links: warm coral-tinted pill (bg: #FFF4EE, text: coral)
  - Hover: same warm tint, lighter version
  - Shadow: removed — the warm border is sufficient depth signal;
    shadow created a heavier visual break than the site's tone requires
  - Random button: dice icon kept; styling matches ghost nav treatment
*/
export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleChange = () => setMenuOpen(false);
    router.events.on('routeChangeComplete', handleChange);
    return () => router.events.off('routeChangeComplete', handleChange);
  }, [router.events]);

  const nav = [
    { href: '/browse',     label: 'Explore',    icon: Compass  },
    { href: '/about',      label: 'About',      icon: Info     },
    { href: '/contribute', label: 'Contribute', icon: PenLine  },
  ];

  const isActive = (href: string) =>
    router.pathname === href || router.pathname.startsWith(href + '/');

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-sm border-b"
      style={{
        background: 'rgba(255, 252, 249, 0.96)',  /* warm parchment, slightly transparent */
        borderBottomColor: '#F2EDEA',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo — display font, coral glyph */}
        <Link
          href="/"
          className="flex items-center gap-1.5 font-display font-extrabold text-lg shrink-0 transition-colors duration-150"
          style={{ color: '#1A1210' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#1A1210'; }}
        >
          <LogoIcon size={22} />
          <span>HolyShirtBalls</span>
        </Link>

        {/* Nav + mobile toggle — all right-aligned */}
        <div className="flex items-center gap-0.5">
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150"
                style={
                  isActive(href)
                    ? { background: '#FFF4EE', color: '#F55D35' }
                    : { color: '#4A3F3A' }
                }
                onMouseEnter={(e) => {
                  if (!isActive(href)) {
                    (e.currentTarget as HTMLElement).style.background = '#FAF7F5';
                    (e.currentTarget as HTMLElement).style.color = '#1A1210';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(href)) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#4A3F3A';
                  }
                }}
              >
                <Icon size={14} strokeWidth={2} aria-hidden />
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-150"
            style={{ color: '#6B5E58' }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#FAF7F5'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
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

      {/* Mobile menu — warm background, same as header */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-0.5 animate-fade-in"
          style={{
            background: 'rgba(255, 252, 249, 0.98)',
            borderTopColor: '#F2EDEA',
          }}
        >
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
              style={
                isActive(href)
                  ? { background: '#FFF4EE', color: '#F55D35' }
                  : { color: '#4A3F3A' }
              }
            >
              <Icon size={14} strokeWidth={2} aria-hidden />
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
