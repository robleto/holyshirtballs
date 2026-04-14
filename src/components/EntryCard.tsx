import Link from 'next/link';
import type { Entry } from '@/types/entry';
import Badge from '@/components/ui/Badge';
import MediumIcon from '@/components/ui/MediumIcon';

interface EntryCardProps {
  entry: Entry;
  featured?: boolean;
  hideContext?: 'medium' | 'category' | 'severity';
}

/*
  EntryCard — the system's primary browsable surface.

  Design decisions (post-polish pass 2026-03-23):
  - Background: white (#fff) against the warm parchment page, creating clear card lift
  - Border: ink-100 at rest (warm, not cool gray); transitions to coral-alpha on hover
  - Shadow: warm-tinted card shadow; deepens on hover via card-hover utility
  - Featured variant: coral ring with matching warm shadow

  Typographic hierarchy — 3 explicit tiers:
  - Tier 1: Term — ink-900, 26px, extrabold. Stable — does NOT change color on hover.
    The card lift + border shift is enough hover feedback; color change would compete.
  - Tier 2: English equivalent — ink-700, 13px, medium weight. Coral is reserved for
    accent actions; the equivalent is context, not a call-to-action. Smaller and lighter
    so it reads clearly as a subline beneath the term.
  - Tier 3: Phonetic + franchise — ink-500, 11px. Font-mono retained for phonetic but
    the whole line is reduced to the same small size as franchise. These are metadata.

  Header: medium icon + franchise name. Two pieces of metadata — icon provides instant
  medium recognition, franchise name provides context. Clean and readable.

  Footer: medium + category + severity badges — one or more suppressed based on page context
  to avoid redundant information on filtered taxonomy pages.
*/
export default function EntryCard({ entry, featured = false, hideContext }: EntryCardProps) {
  return (
    <Link
      href={`/entry/${entry.slug}`}
      className={[
        'group relative block rounded-[1.25rem] bg-white p-5 speech-bubble',
        'border transition-[border-color,box-shadow,transform] duration-200 ease-in-out motion-reduce:hover:translate-y-0',
        featured
          ? 'border-[rgba(245,93,53,0.25)] shadow-[0_0_0_2px_rgba(245,93,53,0.12),0_2px_8px_rgba(26,18,16,0.07)]'
          : 'border-ink-100 shadow-card',
        'hover:border-[rgba(245,93,53,0.35)] hover:shadow-card-hover',
        'hover:-translate-y-0.5',
      ].join(' ')}
      aria-label={`${entry.term} — ${entry.shortDescription}`}
    >
      {/* Header row: medium icon · franchise */}
      <div className="flex items-center min-w-0 gap-0 mb-3">
        <MediumIcon medium={entry.medium} size={16} className="text-ink-400 mr-1 shrink-0" />
        <span className="text-sm text-ink-500 font-medium truncate leading-none">
          {entry.franchise}
        </span>
      </div>

      {/* Tier 1 — Term: the dominant anchor. Stays ink-900 on hover; card lift is the hover signal. */}
      <h3 className="font-display text-[1.625rem] font-extrabold text-ink-900 mb-1 leading-tight tracking-tight">
        {entry.term}
      </h3>

      {/* Tier 2 — English equivalent: context subline. ink-700, not coral — it's not a CTA. */}
      <p className="text-[13px] font-medium text-ink-700 mb-2 leading-snug">
        &#8776; &ldquo;{entry.englishEquivalent}&rdquo;
      </p>

      {/* Tier 3 — Phonetic + POS: metadata register. Mono retained but same size as franchise. */}
      <p className="text-[11px] text-ink-500 mb-3 leading-none">
        <span className="font-mono">/{entry.phoneticPronunciation}/</span>
        <span className="ml-1 italic">{entry.partOfSpeech}</span>
      </p>

      {/* Short description — body copy register, clamped at 3 lines */}
      <p className="text-sm text-ink-700 leading-relaxed line-clamp-3 mb-4">
        {entry.shortDescription}
      </p>

      {/* Footer: medium + category + severity badges — suppress whichever matches current page context */}
      <div className="flex items-center flex-wrap gap-1.5 pt-0.5">
        {hideContext !== 'medium'   && <Badge label={entry.medium}   variant="medium"   size="sm" />}
        {hideContext !== 'category' && <Badge label={entry.category} variant="category" size="sm" />}
        {hideContext !== 'severity' && <Badge label={entry.severity} variant="severity" size="sm" />}
      </div>
    </Link>
  );
}
