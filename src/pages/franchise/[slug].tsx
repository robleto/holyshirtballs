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
          <Link
            href="/"
            className="transition-colors duration-150"
            style={{ color: '#B0A49E' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#B0A49E'; }}
          >
            Home
          </Link>
          <span style={{ color: '#D4CCC8' }}>/</span>
          <Link
            href="/browse"
            className="transition-colors duration-150"
            style={{ color: '#B0A49E' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#B0A49E'; }}
          >
            Archive
          </Link>
          <span style={{ color: '#D4CCC8' }}>/</span>
          <span style={{ color: '#4A3F3A' }}>{franchiseName}</span>
        </nav>

        {/* Page header */}
        <header className="pb-10 mb-10 border-b max-w-3xl" style={{ borderColor: '#F2EDEA' }}>
          <p
            className="text-xs font-bold uppercase mb-4"
            style={{ color: '#F55D35', letterSpacing: '0.15em' }}
          >
            Franchise
          </p>
          <h1
            className="font-display font-extrabold leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              color: '#1A1210',
              letterSpacing: '-0.02em',
            }}
          >
            {franchiseName}
          </h1>

          {/* Pull quote from the franchise's own entries — lets the work speak */}
          {pullQuote && (
            <div
              className="mb-6 px-6 py-4"
              style={{ borderLeft: '3px solid rgba(245, 93, 53, 0.4)' }}
            >
              <blockquote
                className="italic leading-relaxed mb-2"
                style={{ fontSize: '1.0625rem', color: '#4A3F3A' }}
              >
                &ldquo;{pullQuote.text}&rdquo;
              </blockquote>
              <cite className="text-sm not-italic" style={{ color: '#8C807A' }}>
                &mdash; {pullQuote.source}
              </cite>
            </div>
          )}

          <p className="text-sm" style={{ color: '#8C807A' }}>
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
