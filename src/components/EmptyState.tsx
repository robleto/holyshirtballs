interface EmptyStateProps {
  search?: string;
  onClear?: () => void;
}

export default function EmptyState({ search, onClear }: EmptyStateProps) {
  return (
    <div className="py-24 text-center">
      <div className="text-6xl mb-4" aria-hidden>🤐</div>
      <h3
        className="text-2xl font-bold text-gray-700 mb-2"
        style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
      >
        {search ? `No results for "${search}"` : 'Nothing found'}
      </h3>
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        {search
          ? 'Try a different term, franchise, or quote. The archive is vast — but not infinite.'
          : 'Adjust your filters to find what you\'re looking for.'}
      </p>
      {onClear && (
        <button
          onClick={onClear}
          className="px-4 py-2 rounded-lg bg-brand-coral text-white text-sm font-medium hover:bg-orange-600 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
