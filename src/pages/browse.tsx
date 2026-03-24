import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import type { Entry, BrowseFilters, Medium, Category, Severity } from '@/types/entry';
import {
  allEntries,
  filterEntries,
  getAllFranchises,
  MEDIUMS,
  CATEGORIES,
  SEVERITIES,
  getEntriesByMedium,
  getEntriesByCategory,
  getEntriesBySeverity,
} from '@/lib/entries';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import EntryCard from '@/components/EntryCard';
import EmptyState from '@/components/EmptyState';
import TaxCard, { MEDIUM_DESC, CATEGORY_DESC, SEVERITY_DESC, CATEGORY_COLORS, SEVERITY_COLORS } from '@/components/TaxCard';

interface TaxonomyItem { name: string; count: number; }

interface BrowseProps {
  allEntries: Entry[];
  franchises: string[];
  mediums: TaxonomyItem[];
  categories: TaxonomyItem[];
  severities: TaxonomyItem[];
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
    search:    str('search'),
    medium:    str('medium') as Medium | '',
    category:  str('category') as Category | '',
    severity:  str('severity') as Severity | '',
    franchise: str('franchise'),
    sort:      (str('sort') || 'alpha') as BrowseFilters['sort'],
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

function hasActiveFilters(f: BrowseFilters) {
  return !!(f.search || f.medium || f.category || f.severity || f.franchise);
}

/* ── Taxonomy section header ─────────────────────────────────────────────── */

function TaxonomySection({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-display font-extrabold text-2xl" style={{ color: '#1A1210', letterSpacing: '-0.01em' }}>
          {title}
        </h2>
        <Link
          href={href}
          className="text-sm font-medium transition-colors duration-150"
          style={{ color: '#B0A49E' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#B0A49E'; }}
        >
          See all &rarr;
        </Link>
      </div>
      {children}
    </section>
  );
}

/* ── Main page ───────────────────────────────────────────────────────────── */

const Browse: NextPage<BrowseProps> = ({ allEntries: entries, franchises, mediums, categories, severities }) => {
  const router = useRouter();
  const [filters, setFilters] = useState<BrowseFilters>(defaultFilters);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<'explore' | 'search'>('explore');

  useEffect(() => {
    if (!router.isReady) return;
    const f = filtersFromQuery(router.query);
    setFilters(f);
    // Auto-switch to search view if URL already has active filters
    if (hasActiveFilters(f)) setView('search');
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

        {/* View toggle tabs */}
        <div
          className="inline-flex rounded-xl p-1 mb-8"
          style={{ background: '#F2EDEA' }}
          role="tablist"
        >
          {(['explore', 'search'] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150"
              style={
                view === v
                  ? { background: 'white', color: '#1A1210', boxShadow: '0 1px 3px rgba(26,18,16,0.10)' }
                  : { background: 'transparent', color: '#8C807A' }
              }
            >
              {v === 'explore' ? 'Explore' : 'Search & Filter'}
            </button>
          ))}
        </div>

        {/* ── Explore view ── */}
        {view === 'explore' && (
          <>
            <TaxonomySection title="By Medium" href="/medium">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediums.map(({ name, count }) => (
                  <TaxCard key={name} type="medium" href={`/medium/${name.toLowerCase()}`} name={name} description={MEDIUM_DESC[name] ?? ''} count={count} />
                ))}
              </div>
            </TaxonomySection>

            <TaxonomySection title="By Category" href="/category">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(({ name, count }) => (
                  <TaxCard key={name} type="category" href={`/category/${name.toLowerCase()}`} name={name} description={CATEGORY_DESC[name] ?? ''} count={count} />
                ))}
              </div>
            </TaxonomySection>

            <TaxonomySection title="By Severity" href="/severity">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {severities.map(({ name, count }) => (
                  <TaxCard key={name} type="severity" href={`/severity/${name.toLowerCase()}`} name={name} description={SEVERITY_DESC[name] ?? ''} count={count} />
                ))}
              </div>
            </TaxonomySection>
          </>
        )}

        {/* ── Search & Filter view ── */}
        {view === 'search' && (
          <>
            <div className="mb-4">
              <SearchBar
                value={filters.search}
                onChange={(v) => handleFilterChange({ ...filters, search: v })}
                onSubmit={handleSearch}
              />
            </div>

            <div className="mb-8">
              <FilterBar
                filters={filters}
                franchises={franchises}
                onFilterChange={handleFilterChange}
                resultCount={results.length}
              />
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                {results.map((entry) => (
                  <EntryCard key={entry.slug} entry={entry} />
                ))}
              </div>
            ) : (
              <EmptyState search={filters.search} onClear={clearAll} />
            )}
          </>
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
      mediums:    MEDIUMS.map((name) => ({ name, count: getEntriesByMedium(name).length })),
      categories: CATEGORIES.map((name) => ({ name, count: getEntriesByCategory(name).length })),
      severities: SEVERITIES.map((name) => ({ name, count: getEntriesBySeverity(name).length })),
    },
  };
};

export default Browse;
