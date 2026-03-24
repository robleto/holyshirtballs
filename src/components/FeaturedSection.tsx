import type { Entry } from '@/types/entry';
import EntryCard from './EntryCard';
import Link from 'next/link';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  entries: Entry[];
  browseLink?: string;
  browseLinkLabel?: string;
  accent?: string; // Tailwind color class for the section title accent
}

export default function FeaturedSection({
  title,
  subtitle,
  entries,
  browseLink,
  browseLinkLabel = 'See more',
  accent = 'text-brand-coral',
}: FeaturedSectionProps) {
  if (!entries.length) return null;

  return (
    <section className="py-10">
      <div className="flex items-end justify-between mb-6 gap-4">
        <div>
          <h2
            className={`text-2xl sm:text-3xl font-bold ${accent}`}
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            {title}
          </h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {browseLink && (
          <Link
            href={browseLink}
            className="shrink-0 text-sm font-medium text-brand-coral hover:underline"
          >
            {browseLinkLabel} →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entry) => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </section>
  );
}
