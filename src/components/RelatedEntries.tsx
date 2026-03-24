import Link from 'next/link';
import type { Entry } from '@/types/entry';
import Badge from '@/components/ui/Badge';

interface RelatedEntriesProps {
  entries: Entry[];
}

export default function RelatedEntries({ entries }: RelatedEntriesProps) {
  if (!entries.length) return null;

  return (
    <section aria-label="Related entries">
      <h2
        className="text-xl font-bold text-gray-900 mb-4"
        style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
      >
        Related Entries
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.map((entry) => (
          <Link
            key={entry.slug}
            href={`/entry/${entry.slug}`}
            className="group flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4
              hover:border-brand-coral/30 hover:shadow-sm transition-all"
          >
            <div className="flex-1 min-w-0">
              <p
                className="font-bold text-gray-900 group-hover:text-brand-coral transition-colors truncate"
                style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
              >
                {entry.term}
              </p>
              <p className="text-xs text-gray-500 truncate">{entry.franchise}</p>
            </div>
            <div className="shrink-0">
              <Badge label={entry.severity} variant="severity" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
