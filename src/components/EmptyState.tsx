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
  - Body: ink-600 — passes WCAG AA (was ink-500 at ~3.6:1, bumped for contrast)
  - Button: coral primary style, rounded-xl — consistent with Button component
*/
export default function EmptyState({ search, onClear }: EmptyStateProps) {
  return (
    <div className="py-24 text-center empty-state-appear">
      {/* Typographic glyph instead of emoji — stays in the site's editorial register */}
      <div
        className="font-display font-extrabold leading-none mb-6 select-none text-brand-coral"
        style={{
          fontSize: '5rem',
          opacity: 0.15,
          letterSpacing: '-0.05em',
        }}
        aria-hidden={true}
      >
        ?!@#
      </div>

      <h3
        className="font-display font-bold text-2xl mb-2 text-ink-700"
        style={{ letterSpacing: '-0.01em' }}
      >
        {search ? `No results for \u201c${search}\u201d` : 'Nothing matched those filters.'}
      </h3>

      <p className="text-sm mb-6 max-w-sm mx-auto leading-relaxed text-ink-600">
        {search
          ? 'Try a different term, franchise, or quote. The archive is vast \u2014 but not infinite.'
          : 'Try loosening a filter or two. The archive is bigger than it looks.'}
      </p>

      {onClear && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand-coral hover:bg-brand-coral-hover transition-colors duration-150"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
