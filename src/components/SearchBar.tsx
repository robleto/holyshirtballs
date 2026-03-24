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
  - Border: ink-200 at rest; transitions to coral on focus
  - Background: white — clear contrast against parchment page
  - Shadow: warm-tinted card shadow — matches the card system
  - Search icon: ink-400 (warm muted) — visible but not competing
  - Clear button: ink-400 -> ink-700 hover
  - Placeholder: ink-400 muted text
  - No ring on focus (ring-2 replaced by border color shift + shadow deepening for subtlety)
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
        {/* Search icon */}
        <span
          className="absolute inset-y-0 left-4 flex items-center pointer-events-none"
          style={{ color: '#B0A49E' }}
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
          className="w-full rounded-2xl border bg-white py-3 pl-12 pr-4 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#F55D35] focus:border-transparent
            transition-all duration-150"
          style={{
            borderColor: '#D4CCC8',
            color: '#1A1210',
            boxShadow: '0 1px 3px rgba(26, 18, 16, 0.05)',
          }}
          aria-label="Search entries"
        />

        {/* Clear button — only shown when there's a value */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-4 flex items-center transition-colors duration-150"
            style={{ color: '#B0A49E' }}
            aria-label="Clear search"
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#4A3F3A'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#B0A49E'; }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
