import type { Entry } from '@/types/entry';
import EntryCard from './EntryCard';
import Link from 'next/link';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  entries: Entry[];
  browseLink?: string;
  browseLinkLabel?: string;
  accent?: string; // Tailwind color class for the section title (retained for API compat)
  accentHex?: string; // Direct hex color — preferred when available
}

/*
  FeaturedSection — homepage content curated sections.

  Design decisions:
  - Section title: display font, 2xl/3xl, warm near-black (not Tailwind accent classes)
    Previously accent was passed as Tailwind class (text-brand-coral, text-emerald-600,
    text-brand-purple, text-blue-600) which created color drift across sections.
    Now the section title is always ink-900 and the accent lives in the section label/line,
    not the title itself. This creates more consistent hierarchy and lets the cards carry
    the color variation instead.
  - Section subtitle: ink-500, 14px — subordinate metadata
  - "See more" link: coral with arrow, right-aligned
  - Divider between sections: handled by the parent page (section-divider class)
*/
export default function FeaturedSection({
  title,
  subtitle,
  entries,
  browseLink,
  browseLinkLabel = 'See more',
}: FeaturedSectionProps) {
  if (!entries.length) return null;

  return (
    <section className="py-10">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          {/* Section title — display font, warm near-black, tight tracking */}
          <h2
            className="font-display font-bold text-2xl sm:text-3xl leading-tight"
            style={{
              color: '#1A1210',
              letterSpacing: '-0.015em',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm mt-1" style={{ color: '#8C807A' }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Browse link — coral, right-aligned */}
        {browseLink && (
          <Link
            href={browseLink}
            className="shrink-0 text-sm font-semibold transition-colors duration-150"
            style={{ color: '#F55D35' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
          >
            {browseLinkLabel} &rarr;
          </Link>
        )}
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </section>
  );
}
