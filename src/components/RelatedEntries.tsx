import Link from 'next/link';
import type { Entry } from '@/types/entry';
import Badge from '@/components/ui/Badge';

interface RelatedEntriesProps {
  entries: Entry[];
}

/*
  RelatedEntries — sidebar component on entry detail pages.

  Design decisions:
  - Title: section-label utility (coral, uppercase, tracked) — consistent with other sidebar panels
  - Cards: white background with warm border; use .card utility for CSS hover (was JS style mutation)
  - Term: display font, bold, ink-900 -> coral on hover via group-hover
  - Franchise: ink-500, text-xs, truncated — metadata register
  - Severity badge: right-aligned, sm size
  - No shadow on rest state — compact list items, not featured cards
*/
export default function RelatedEntries({ entries }: RelatedEntriesProps) {
  if (!entries.length) return null;

  return (
    <section aria-label="Related entries">
      <h2 className="section-label mb-4">Related Entries</h2>
      <div className="flex flex-col gap-2">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/entry/${entry.slug}`}
            className="group card flex items-start gap-3 p-3.5"
          >
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[0.9375rem] truncate text-ink-900 group-hover:text-brand-coral transition-colors duration-150">
                {entry.term}
              </p>
              <p className="text-xs truncate mt-0.5 text-ink-500">
                {entry.franchise}
              </p>
            </div>
            <div className="shrink-0 mt-0.5">
              <Badge label={entry.severity} variant="severity" size="sm" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
