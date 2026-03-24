import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <p
              className="font-extrabold text-lg text-gray-900 mb-2"
              style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
            >
              <span className="text-brand-coral">@#$!</span> HolyShirtBalls
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              The definitive archive of fictional profanity from film, TV, books, comics, and games.
              All entries are fictional. No real people were insulted in the making of this site.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Explore</p>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/browse', label: 'Browse All' },
                { href: '/browse?medium=TV', label: 'TV' },
                { href: '/browse?medium=Film', label: 'Film' },
                { href: '/browse?medium=Comic', label: 'Comics' },
                { href: '/browse?medium=Book', label: 'Books' },
                { href: '/browse?medium=Game', label: 'Games' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm text-gray-600 hover:text-brand-coral transition-colors">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Community */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Community</p>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/about', label: 'About the Project' },
                { href: '/contribute', label: 'Contribute an Entry' },
                { href: 'https://github.com', label: 'GitHub ↗', external: true },
              ].map(({ href, label, external }) => (
                <Link
                  key={href}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-sm text-gray-600 hover:text-brand-coral transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            All fictional. All documented. None legally actionable.
          </p>
          <p className="text-xs text-gray-400">
            Open source — contributions welcome via pull request.
          </p>
        </div>
      </div>
    </footer>
  );
}
