import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { Entry } from '@/types/entry';
import {
  getAllFranchisePages,
  getFranchiseBySlug,
  getEntriesByFranchise,
} from '@/lib/entries';
import EntryCard from '@/components/EntryCard';

interface FranchisePageProps {
  franchiseName: string;
  entries: Entry[];
  pullQuote: { text: string; source: string } | null;
}

const FranchisePage: NextPage<FranchisePageProps> = ({ franchiseName, entries, pullQuote }) => {
  return (
    <>
      <Head>
        <title>{franchiseName} &mdash; HolyShirtBalls</title>
        <meta
          name="description"
          content={`${entries.length} fictional swear words and expletives from ${franchiseName}, documented in the HolyShirtBalls archive.`}
        />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
          <Link href="/" className="text-ink-400 hover:text-brand-coral transition-colors duration-150">
            Home
          </Link>
          <span className="text-ink-200">/</span>
          <Link href="/browse" className="text-ink-400 hover:text-brand-coral transition-colors duration-150">
            Franchise
          </Link>
          <span className="text-ink-200">/</span>
          <span className="text-ink-700">{franchiseName}</span>
        </nav>

        {/* Page header */}
        <header className="pb-10 mb-10 border-b border-ink-100 max-w-3xl">
          <p className="eyebrow mb-4">Franchise</p>
          <h1
            className="font-display font-extrabold leading-none mb-6 text-ink-900"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {franchiseName}
          </h1>

          {/* Pull quote from the franchise's own entries — lets the work speak */}
          {pullQuote && (
            <div className="mb-6 px-6 py-4" style={{ borderLeft: '2px solid rgba(245, 93, 53, 0.4)' }}>
              <blockquote className="italic leading-relaxed mb-2 text-ink-700" style={{ fontSize: '1.0625rem' }}>
                &ldquo;{pullQuote.text}&rdquo;
              </blockquote>
              <cite className="text-sm not-italic text-ink-500">
                &mdash; {pullQuote.source}
              </cite>
            </div>
          )}

          <p className="text-sm text-ink-500">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} in the archive
          </p>
        </header>

        {/* Entry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const franchisePages = getAllFranchisePages();
  return {
    paths: franchisePages.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<FranchisePageProps> = ({ params }) => {
  const slug = params?.slug as string;
  const franchiseName = getFranchiseBySlug(slug);

  if (!franchiseName) {
    return { notFound: true };
  }

  const entries = getEntriesByFranchise(franchiseName);

  // Surface the first entry that has a quote — lets the franchise speak for itself
  const quotedEntry = entries.find(
    (e) => e.exampleQuote?.text && e.exampleQuote?.source
  );
  const pullQuote = quotedEntry
    ? { text: quotedEntry.exampleQuote.text, source: quotedEntry.exampleQuote.source }
    : null;

  return {
    props: { franchiseName, entries, pullQuote },
  };
};

export default FranchisePage;
