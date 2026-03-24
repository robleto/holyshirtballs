import Link from 'next/link';
import type { Entry } from '@/types/entry';
import Badge from '@/components/ui/Badge';

interface RelatedEntriesProps {
  entries: Entry[];
}

/*
  RelatedEntries — sidebar component on entry detail pages.

  Design decisions:
  - Title: display font, 18px, ink-900 — subordinate to the main entry term but present
  - Cards: white background with warm border, coral border on hover — matches main card system
  - Term: display font, bold, ink-900 -> coral on hover
  - Franchise: ink-500, 12px, truncated
  - Severity badge: right-aligned, sm size
  - No shadow on rest state — these are compact list items, not featured cards
*/
export default function RelatedEntries({ entries }: RelatedEntriesProps) {
  if (!entries.length) return null;

  return (
    <section aria-label="Related entries">
      <h2
        className="font-sans text-xs font-bold uppercase mb-4"
        style={{ color: '#F55D35', letterSpacing: '0.09em' }}
      >
        Related Entries
      </h2>
      <div className="flex flex-col gap-2">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/entry/${entry.slug}`}
            className="group flex items-start gap-3 rounded-xl bg-white p-3.5 border transition-all duration-150"
            style={{ borderColor: '#F2EDEA' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245, 93, 53, 0.3)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(26, 18, 16, 0.07)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#F2EDEA';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div className="flex-1 min-w-0">
              <p
                className="font-display font-bold truncate transition-colors duration-150 group-hover:text-[#F55D35]"
                style={{ color: '#1A1210', fontSize: '0.9375rem' }}
              >
                {entry.term}
              </p>
              <p className="text-xs truncate mt-0.5" style={{ color: '#8C807A' }}>
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
