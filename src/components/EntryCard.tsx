import Link from 'next/link';
import type { Entry } from '@/types/entry';
import Badge, { SeverityDot } from '@/components/ui/Badge';

interface EntryCardProps {
  entry: Entry;
  featured?: boolean;
}

/*
  EntryCard — the system's primary browsable surface.

  Design decisions:
  - Background: white (#fff) against the warm parchment page, creating clear card lift
  - Border: ink-100 at rest (warm, not cool gray); transitions to coral-alpha on hover
  - Shadow: warm-tinted card shadow; deepens on hover via card-hover utility
  - Featured variant: coral ring with matching warm shadow
  - Term: Playfair Display at 1.5rem (24px); transitions to coral on hover
  - English equivalent: coral tint, lighter weight — creates a secondary hierarchy tier
  - Franchise label: truncated with dot; ink-500 (muted but warm)
  - Footer badges: flush left, gap-1.5, no excess padding
*/
export default function EntryCard({ entry, featured = false }: EntryCardProps) {
  return (
    <Link
      href={`/entry/${entry.slug}`}
      className={[
        'group block rounded-[1.25rem] bg-white p-5',
        'border transition-all duration-200 ease-out',
        featured
          ? 'border-[rgba(245,93,53,0.25)] shadow-[0_0_0_2px_rgba(245,93,53,0.12),0_2px_8px_rgba(26,18,16,0.07)]'
          : 'border-[#F2EDEA] shadow-[0_1px_3px_rgba(26,18,16,0.06)]',
        'hover:border-[rgba(245,93,53,0.35)] hover:shadow-[0_8px_24px_rgba(26,18,16,0.10),0_2px_6px_rgba(26,18,16,0.06)]',
        'hover:-translate-y-0.5',
      ].join(' ')}
      aria-label={`${entry.term} — ${entry.shortDescription}`}
    >
      {/* Header row: severity dot + franchise + medium badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <SeverityDot severity={entry.severity} />
          {/* Franchise: small, muted, truncated — subordinate to the term */}
          <span className="text-xs text-[#8C807A] font-medium truncate leading-none">
            {entry.franchise}
          </span>
        </div>
        <Badge label={entry.medium} variant="medium" size="sm" />
      </div>

      {/* Term — the hero text of the card */}
      <h3 className="font-display text-2xl font-extrabold text-[#1A1210] mb-1 leading-tight tracking-tight group-hover:text-[#F55D35] transition-colors duration-150">
        {entry.term}
      </h3>

      {/* Pronunciation + part of speech — small, muted, editorial register */}
      <p className="text-xs text-[#8C807A] mb-2 font-mono leading-none">
        /{entry.phoneticPronunciation}/
        <span className="font-sans italic ml-1 not-italic" style={{ fontStyle: 'italic' }}>
          {entry.partOfSpeech}
        </span>
      </p>

      {/* English equivalent — coral accent, medium weight, slightly prominent */}
      <p className="text-sm font-semibold text-[#F55D35] mb-3 leading-snug">
        &#8776; &ldquo;{entry.englishEquivalent}&rdquo;
      </p>

      {/* Short description — body copy register, clamped at 3 lines */}
      <p className="text-sm text-[#4A3F3A] leading-relaxed line-clamp-3 mb-4">
        {entry.shortDescription}
      </p>

      {/* Footer: severity + category badges */}
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        <Badge label={entry.severity} variant="severity" size="sm" />
        <Badge label={entry.category} variant="category" size="sm" />
      </div>
    </Link>
  );
}
