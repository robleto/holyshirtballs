import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import type { Entry, BrowseFilters, Medium, Category, Severity } from '@/types/entry';
import { allEntries, filterEntries, getAllFranchises } from '@/lib/entries';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import EntryCard from '@/components/EntryCard';
import EmptyState from '@/components/EmptyState';

interface BrowseProps {
  allEntries: Entry[];
  franchises: string[];
}

const defaultFilters: BrowseFilters = {
  search: '',
  medium: '',
  category: '',
  severity: '',
  franchise: '',
  sort: 'alpha',
};

function filtersFromQuery(query: Record<string, string | string[] | undefined>): BrowseFilters {
  const str = (key: string) => (typeof query[key] === 'string' ? (query[key] as string) : '');
  return {
    search:   str('search'),
    medium:   str('medium') as Medium | '',
    category: str('category') as Category | '',
    severity: str('severity') as Severity | '',
    franchise: str('franchise'),
    sort:     (str('sort') || 'alpha') as BrowseFilters['sort'],
  };
}

function filtersToQuery(filters: BrowseFilters): Record<string, string> {
  const q: Record<string, string> = {};
  if (filters.search)    q.search    = filters.search;
  if (filters.medium)    q.medium    = filters.medium;
  if (filters.category)  q.category  = filters.category;
  if (filters.severity)  q.severity  = filters.severity;
  if (filters.franchise) q.franchise = filters.franchise;
  if (filters.sort && filters.sort !== 'alpha') q.sort = filters.sort;
  return q;
}

const Browse: NextPage<BrowseProps> = ({ allEntries: entries, franchises }) => {
  const router = useRouter();
  const [filters, setFilters] = useState<BrowseFilters>(defaultFilters);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    setFilters(filtersFromQuery(router.query));
    setReady(true);
  }, [router.isReady, router.query]);

  const handleFilterChange = useCallback(
    (newFilters: BrowseFilters) => {
      setFilters(newFilters);
      const query = filtersToQuery(newFilters);
      router.replace({ pathname: '/browse', query }, undefined, { shallow: true });
    },
    [router]
  );

  const handleSearch = (value: string) => {
    handleFilterChange({ ...filters, search: value });
  };

  const clearAll = () => handleFilterChange(defaultFilters);

  const results = ready ? filterEntries(entries, filters) : entries;

  return (
    <>
      <Head>
        <title>Browse &mdash; HolyShirtBalls</title>
        <meta
          name="description"
          content={`${entries.length} fictional profanity entries across ${franchises.length} franchises. Filter by medium, category, severity, or franchise.`}
        />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Page header */}
        <div className="mb-8">
          {/* Eyebrow */}
          <p className="eyebrow mb-2">The Archive</p>
          <h1
            className="font-display font-bold text-3xl sm:text-4xl mb-2"
            style={{ color: '#1A1210', letterSpacing: '-0.02em' }}
          >
            Browse the Archive
          </h1>
          <p className="text-sm" style={{ color: '#8C807A' }}>
            {entries.length} entries across {franchises.length} franchises.
          </p>
        </div>

        {/* Search */}
        <div className="mb-4">
          <SearchBar
            value={filters.search}
            onChange={(v) => handleFilterChange({ ...filters, search: v })}
            onSubmit={handleSearch}
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            filters={filters}
            franchises={franchises}
            onFilterChange={handleFilterChange}
            resultCount={results.length}
          />
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {results.map((entry) => (
              <EntryCard key={entry.slug} entry={entry} />
            ))}
          </div>
        ) : (
          <EmptyState search={filters.search} onClear={clearAll} />
        )}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<BrowseProps> = () => {
  return {
    props: {
      allEntries,
      franchises: getAllFranchises(),
    },
  };
};

export default Browse;
