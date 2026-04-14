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
    <footer className="border-t border-ink-100 bg-[#F5EFEB]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand block */}
          <div>
            <p className="flex items-center gap-2 font-display font-extrabold text-lg mb-2 text-ink-900">
              <LogoIcon size={22} />
              HolyShirtBalls
            </p>
            <p className="text-sm leading-relaxed text-ink-600">
              The definitive archive of fictional profanity from film, TV, books, comics, and games.
              All entries are fictional. No real people were insulted in the making of this site.
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <p className="section-label mb-3">Explore</p>
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
                  className="text-sm text-ink-600 hover:text-brand-coral transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Community column */}
          <div>
            <p className="section-label mb-3">Community</p>
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
                  className="text-sm text-ink-600 hover:text-brand-coral transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ink-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            All fictional. All documented. None legally actionable.
          </p>
          <p className="text-xs text-ink-400">
            Open source &mdash; contributions welcome via pull request.
          </p>
        </div>
      </div>
    </footer>
  );
}
