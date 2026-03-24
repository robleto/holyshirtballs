import type { BrowseFilters, Medium, Category, Severity } from '@/types/entry';
import { MEDIUMS, CATEGORIES, SEVERITIES } from '@/lib/entries';

interface FilterBarProps {
  filters: BrowseFilters;
  franchises: string[];
  onFilterChange: (filters: BrowseFilters) => void;
  resultCount: number;
}

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: T | ''; label: string }[];
  onChange: (v: T | '') => void;
}) {
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T | '')}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700
          focus:outline-none focus:ring-2 focus:ring-brand-coral focus:border-transparent
          min-w-[140px]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FilterBar({ filters, franchises, onFilterChange, resultCount }: FilterBarProps) {
  const set = (patch: Partial<BrowseFilters>) => onFilterChange({ ...filters, ...patch });

  const hasActiveFilters =
    filters.medium || filters.category || filters.severity || filters.franchise;

  return (
    <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
      <div className="flex flex-wrap gap-4 items-end">
        <Select<Medium>
          label="Medium"
          value={filters.medium}
          options={[
            { value: '', label: 'All Media' },
            ...MEDIUMS.map((m) => ({ value: m, label: m })),
          ]}
          onChange={(v) => set({ medium: v as Medium | '' })}
        />

        <Select<Category>
          label="Category"
          value={filters.category}
          options={[
            { value: '', label: 'All Categories' },
            ...CATEGORIES.map((c) => ({ value: c, label: c })),
          ]}
          onChange={(v) => set({ category: v as Category | '' })}
        />

        <Select<Severity>
          label="Severity"
          value={filters.severity}
          options={[
            { value: '', label: 'All Severities' },
            ...SEVERITIES.map((s) => ({ value: s, label: s })),
          ]}
          onChange={(v) => set({ severity: v as Severity | '' })}
        />

        <div className="flex flex-col gap-1 min-w-0">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Franchise</label>
          <select
            value={filters.franchise}
            onChange={(e) => set({ franchise: e.target.value })}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700
              focus:outline-none focus:ring-2 focus:ring-brand-coral focus:border-transparent
              min-w-[180px]"
          >
            <option value="">All Franchises</option>
            {franchises.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Sort</label>
          <select
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value as BrowseFilters['sort'] })}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700
              focus:outline-none focus:ring-2 focus:ring-brand-coral focus:border-transparent
              min-w-[140px]"
          >
            <option value="alpha">A → Z</option>
            <option value="franchise">Franchise</option>
            <option value="severity">Most Extreme</option>
          </select>
        </div>

        <div className="flex flex-col justify-end gap-1 ml-auto">
          {hasActiveFilters && (
            <button
              onClick={() =>
                onFilterChange({ search: filters.search, medium: '', category: '', severity: '', franchise: '', sort: 'alpha' })
              }
              className="text-xs text-brand-coral hover:underline"
            >
              Clear filters
            </button>
          )}
          <p className="text-sm text-gray-500 text-right">
            {resultCount} {resultCount === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </div>
    </div>
  );
}
