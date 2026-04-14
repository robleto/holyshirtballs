import { ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  autoFocus?: boolean;
}

/*
  SearchBar — primary search input.

  Design decisions:
  - Radius: rounded-2xl (20px) — wider than a typical input, matches the site's card scale
  - Border: ink-300 at rest; transitions to coral on focus
  - Background: white — clear contrast against parchment page
  - Shadow: warm-tinted card shadow — matches the card system
  - Search icon: ink-400 (warm muted) — visible but not competing
  - Clear button: ink-400 -> ink-700 hover
  - Placeholder: ink-400 muted text
  - pr-10 when clear button visible (was pr-4) — prevents long text overlapping the ×
*/
export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search by word, franchise, or quote\u2026',
  onSubmit,
  autoFocus,
}: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      <div className="relative">
        {/* Search icon — decorative, input already has aria-label */}
        <span
          className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-ink-400"
          aria-hidden={true}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
          </svg>
        </span>

        <input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={[
            'w-full rounded-2xl border border-ink-300 bg-white py-3 pl-12 text-sm text-ink-900',
            'focus:outline-none focus:ring-2 focus:ring-brand-coral focus:border-transparent',
            'transition-all duration-150 shadow-[0_1px_3px_rgba(26,18,16,0.05)]',
            // Reserve right padding for clear button when value is present
            value ? 'pr-10' : 'pr-4',
          ].join(' ')}
          aria-label="Search entries"
        />

        {/* Clear button — only shown when there's a value */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-4 flex items-center text-ink-400 hover:text-ink-700 transition-colors duration-150"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden={true}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
