interface EmptyStateProps {
  search?: string;
  onClear?: () => void;
}

/*
  EmptyState — shown when browse filters return no results.

  Design decisions:
  - Replaced the 🤐 emoji with a typographic glyph — "?!@#" in display font at low opacity.
    This stays on-brand (the site's visual language uses typographic glyphs, not emoji)
    while preserving the playful moment.
  - Title: display font, ink-700 (slightly lighter than main headings — this is a no-content state)
  - Body: ink-500, centered, max-w-sm
  - Button: coral primary style, rounded-xl — consistent with Button component
*/
export default function EmptyState({ search, onClear }: EmptyStateProps) {
  return (
    <div className="py-24 text-center">
      {/* Typographic glyph instead of emoji — stays in the site's editorial register */}
      <div
        className="font-display font-extrabold leading-none mb-6 select-none"
        style={{
          fontSize: '5rem',
          color: 'rgba(245, 93, 53, 0.15)',
          letterSpacing: '-0.05em',
        }}
        aria-hidden
      >
        ?!@#
      </div>

      <h3
        className="font-display font-bold text-2xl mb-2"
        style={{ color: '#4A3F3A', letterSpacing: '-0.01em' }}
      >
        {search ? `No results for \u201c${search}\u201d` : 'Nothing found'}
      </h3>

      <p className="text-sm mb-6 max-w-sm mx-auto leading-relaxed" style={{ color: '#8C807A' }}>
        {search
          ? 'Try a different term, franchise, or quote. The archive is vast \u2014 but not infinite.'
          : 'Adjust your filters to find what you\u2019re looking for.'}
      </p>

      {onClear && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors duration-150"
          style={{ background: '#F55D35' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#D94A22'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#F55D35'; }}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
