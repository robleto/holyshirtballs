import type { BrowseFilters, Medium, Category, Severity } from '@/types/entry';
import { MEDIUMS, CATEGORIES, SEVERITIES } from '@/lib/entries';

interface FilterBarProps {
  filters: BrowseFilters;
  franchises: string[];
  onFilterChange: (filters: BrowseFilters) => void;
  resultCount: number;
}

/*
  FilterBar — browsing controls surface.

  Design decisions:
  - Surface: bg-muted (#F5EFEB) — warmer than gray-50, fits the parchment body
  - Border: ink-100 with a warm card shadow — gives it body, not just a flat container
  - Labels: coral eyebrow treatment (uppercase, tracked) — elevates the filter UX
  - Selects: white background on warm surface = clear contrast; warm border on focus
  - Focus ring: coral — consistent with site-wide interaction color
  - Result count: right-aligned, ink-500 muted text
  - Clear filters: coral underline, right-aligned above result count
*/

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
      <label
        className="text-xs font-bold uppercase"
        style={{ letterSpacing: '0.09em', color: '#F55D35' }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T | '')}
        className="rounded-xl border bg-white px-3 py-2 text-sm appearance-none
          focus:outline-none focus:ring-2 focus:ring-[#F55D35] focus:border-transparent
          transition-colors duration-150 min-w-[140px]"
        style={{
          borderColor: '#D4CCC8',
          color: '#2D2420',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C807A' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: '1rem',
          paddingRight: '2.5rem',
        }}
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
    <div
      className="rounded-[1.25rem] p-4"
      style={{
        background: '#F5EFEB',
        border: '1px solid #F2EDEA',
        boxShadow: '0 1px 4px rgba(26, 18, 16, 0.05)',
      }}
    >
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

        {/* Franchise select — slightly wider */}
        <div className="flex flex-col gap-1 min-w-0">
          <label
            className="text-xs font-bold uppercase"
            style={{ letterSpacing: '0.09em', color: '#F55D35' }}
          >
            Franchise
          </label>
          <select
            value={filters.franchise}
            onChange={(e) => set({ franchise: e.target.value })}
            className="rounded-xl border bg-white px-3 py-2 text-sm appearance-none
              focus:outline-none focus:ring-2 focus:ring-[#F55D35] focus:border-transparent
              transition-colors duration-150 min-w-[180px]"
            style={{
              borderColor: '#D4CCC8',
              color: '#2D2420',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C807A' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">All Franchises</option>
            {franchises.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-1 min-w-0">
          <label
            className="text-xs font-bold uppercase"
            style={{ letterSpacing: '0.09em', color: '#F55D35' }}
          >
            Sort
          </label>
          <select
            value={filters.sort}
            onChange={(e) => set({ sort: e.target.value as BrowseFilters['sort'] })}
            className="rounded-xl border bg-white px-3 py-2 text-sm appearance-none
              focus:outline-none focus:ring-2 focus:ring-[#F55D35] focus:border-transparent
              transition-colors duration-150 min-w-[140px]"
            style={{
              borderColor: '#D4CCC8',
              color: '#2D2420',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238C807A' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem',
              paddingRight: '2.5rem',
            }}
          >
            <option value="alpha">A &rarr; Z</option>
            <option value="franchise">Franchise</option>
            <option value="severity">Most Extreme</option>
          </select>
        </div>

        {/* Result count + clear */}
        <div className="flex flex-col justify-end gap-1 ml-auto">
          {hasActiveFilters && (
            <button
              onClick={() =>
                onFilterChange({ search: filters.search, medium: '', category: '', severity: '', franchise: '', sort: 'alpha' })
              }
              className="text-xs font-medium transition-colors duration-150 text-right"
              style={{ color: '#F55D35' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
            >
              Clear filters
            </button>
          )}
          <p className="text-sm text-right" style={{ color: '#8C807A' }}>
            <strong style={{ color: '#1A1210' }}>{resultCount}</strong>{' '}
            {resultCount === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </div>
    </div>
  );
}
