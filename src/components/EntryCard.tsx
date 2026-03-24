import Link from 'next/link';
import type { Entry } from '@/types/entry';
import Badge, { SeverityDot } from '@/components/ui/Badge';

interface EntryCardProps {
  entry: Entry;
  featured?: boolean;
}

export default function EntryCard({ entry, featured = false }: EntryCardProps) {
  return (
    <Link
      href={`/entry/${entry.slug}`}
      className={`group block rounded-2xl border border-gray-100 bg-white p-5 card-hover shadow-sm
        hover:border-brand-coral/30 ${featured ? 'ring-2 ring-brand-coral/20' : ''}`}
      aria-label={`${entry.term} — ${entry.shortDescription}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <SeverityDot severity={entry.severity} />
          <span className="text-xs text-gray-400 font-medium truncate">{entry.franchise}</span>
        </div>
        <Badge label={entry.medium} variant="medium" />
      </div>

      {/* Term */}
      <h3
        className="font-display text-2xl font-bold text-gray-900 mb-1 group-hover:text-brand-coral transition-colors"
        style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
      >
        {entry.term}
      </h3>

      {/* Pronunciation & POS */}
      <p className="text-xs text-gray-500 mb-2">
        /{entry.phoneticPronunciation}/ · <em>{entry.partOfSpeech}</em>
      </p>

      {/* English equivalent */}
      <p className="text-sm font-semibold text-gray-500 mb-3">
        ≈ &ldquo;{entry.englishEquivalent}&rdquo;
      </p>

      {/* Short description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
        {entry.shortDescription}
      </p>

      {/* Footer badges */}
      <div className="flex flex-wrap gap-1.5">
        <Badge label={entry.severity} variant="severity" />
        <Badge label={entry.category} variant="category" />
      </div>
    </Link>
  );
}
