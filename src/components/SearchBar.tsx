import { ChangeEvent, FormEvent, useState } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  autoFocus?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search terms, franchises, quotes…',
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
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
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
          className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-brand-coral focus:border-transparent
            transition-shadow duration-150"
          aria-label="Search entries"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
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
