import Link from 'next/link';
import LogoIcon from '@/components/ui/LogoIcon';

/*
  Footer — grounded, editorial.

  Design decisions:
  - Background: bg-muted (#F5EFEB) — slightly warmer and more distinct than gray-50
  - Border: ink-100 (#F2EDEA) — warm, not cool
  - Logo repeats the header treatment (coral glyph + display font)
  - Section labels: coral eyebrow treatment (uppercase, tracked)
  - Links: ink-600 at rest, coral on hover — consistent with site's link convention
  - Bottom row: legal note + attribution, ink-400 (muted), centered on mobile
  - Removed mt-20 gap from page content — footer connects to content via the border,
    not a floating gap. Pages handle their own bottom padding.
*/
export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: '#F5EFEB',
        borderTopColor: '#F2EDEA',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand block */}
          <div>
            <p className="flex items-center gap-2 font-display font-extrabold text-lg mb-2" style={{ color: '#1A1210' }}>
              <LogoIcon size={22} />
              HolyShirtBalls
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#6B5E58' }}>
              The definitive archive of fictional profanity from film, TV, books, comics, and games.
              All entries are fictional. No real people were insulted in the making of this site.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p
              className="text-xs font-bold uppercase mb-3"
              style={{ letterSpacing: '0.09em', color: '#F55D35' }}
            >
              Explore
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/browse',          label: 'Explore All' },
                { href: '/medium/tv',       label: 'TV' },
                { href: '/medium/film',     label: 'Film' },
                { href: '/medium/comic',    label: 'Comics' },
                { href: '/medium/book',     label: 'Books' },
                { href: '/medium/game',     label: 'Games' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm transition-colors duration-150"
                  style={{ color: '#6B5E58' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B5E58'; }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Community column */}
          <div>
            <p
              className="text-xs font-bold uppercase mb-3"
              style={{ letterSpacing: '0.09em', color: '#F55D35' }}
            >
              Community
            </p>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/about',          label: 'About the Project' },
                { href: '/contribute',     label: 'Contribute an Entry' },
                { href: 'https://github.com', label: 'GitHub \u2197', external: true },
              ].map(({ href, label, external }) => (
                <Link
                  key={href}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-sm transition-colors duration-150"
                  style={{ color: '#6B5E58' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B5E58'; }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTopColor: '#E8E2DE' }}
        >
          <p className="text-xs" style={{ color: '#B0A49E' }}>
            All fictional. All documented. None legally actionable.
          </p>
          <p className="text-xs" style={{ color: '#B0A49E' }}>
            Open source &mdash; contributions welcome via pull request.
          </p>
        </div>
      </div>
    </footer>
  );
}
