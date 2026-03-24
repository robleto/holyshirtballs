import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import type { Entry, SemanticDriftEntry } from '@/types/entry';
import { allEntries, getEntryBySlug, getAllSlugs, getRelatedEntries } from '@/lib/entries';
import Badge from '@/components/ui/Badge';
import RelatedEntries from '@/components/RelatedEntries';

interface EntryPageProps {
  entry: Entry;
  related: Entry[];
}

// ── Section block used throughout the detail page ──────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2
        className="text-base font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2"
      >
        <span className="w-4 h-px bg-gray-200" />
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </div>
  );
}

// ── Semantic drift timeline renderer ──────────────────────────────────────
function SemanticTimeline({ data }: { data: SemanticDriftEntry[] | string }) {
  if (typeof data === 'string') {
    return <p className="text-gray-700 leading-relaxed">{data}</p>;
  }
  return (
    <ol className="relative border-l-2 border-gray-100 space-y-4 pl-5">
      {data.map((item, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[1.4rem] top-1 w-3 h-3 rounded-full bg-brand-coral border-2 border-white shadow" />
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{item.period}</p>
          <p className="text-sm text-gray-700">{item.meaning}</p>
        </li>
      ))}
    </ol>
  );
}

// ── Copy share button ──────────────────────────────────────────────────────
function ShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select the url
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
        border border-gray-200 text-gray-600 hover:border-brand-coral hover:text-brand-coral
        transition-colors bg-white"
      title="Copy link"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Share
        </>
      )}
    </button>
  );
}

// ── Main page component ────────────────────────────────────────────────────
const EntryPage: NextPage<EntryPageProps> = ({ entry, related }) => {
  const pageUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://holyshirtballs.fyi/entry/${entry.slug}`;

  return (
    <>
      <Head>
        <title>{entry.term} — HolyShirtBalls</title>
        <meta name="description" content={entry.shortDescription} />
        <meta property="og:title" content={`${entry.term} — HolyShirtBalls`} />
        <meta property="og:description" content={entry.shortDescription} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-brand-coral transition-colors">Home</Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-brand-coral transition-colors">Browse</Link>
          <span>/</span>
          <span className="text-gray-600">{entry.term}</span>
        </nav>

        {/* Entry header */}
        <header className="mb-10">
          {/* Franchise + media context */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={`/browse?franchise=${encodeURIComponent(entry.franchise)}`}
              className="text-sm font-medium text-gray-500 hover:text-brand-coral transition-colors"
            >
              {entry.franchise}
            </Link>
            <span className="text-gray-300">·</span>
            <Badge label={entry.medium} variant="medium" size="sm" />
            <Badge label={entry.category} variant="category" size="sm" />
            <Badge label={entry.severity} variant="severity" size="sm" />
          </div>

          {/* Term */}
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-gray-900 leading-none mb-4"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            {entry.term}
          </h1>

          {/* Pronunciation + POS */}
          <p className="text-lg text-gray-500 mb-3">
            <span className="font-mono">/{entry.phoneticPronunciation}/</span>
            {' '}
            <span className="italic text-gray-400">{entry.partOfSpeech}</span>
          </p>

          {/* English equivalent */}
          <p className="text-2xl font-semibold text-gray-600 mb-5">
            ≈ &ldquo;<span className="text-brand-coral">{entry.englishEquivalent}</span>&rdquo;
          </p>

          {/* Short description */}
          <p className="text-base text-gray-700 leading-relaxed max-w-2xl mb-6 text-lg">
            {entry.shortDescription}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <ShareButton url={pageUrl} />
            <Link
              href={`/browse?franchise=${encodeURIComponent(entry.franchise)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                border border-gray-200 text-gray-600 hover:border-brand-coral hover:text-brand-coral
                transition-colors bg-white"
            >
              More from {entry.franchise.split(' ').slice(0, 2).join(' ')} →
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-0">

            {/* Example quote */}
            {entry.exampleQuote?.text && (
              <div className="mb-8 rounded-2xl bg-orange-50 border-l-4 border-brand-coral px-6 py-5">
                <blockquote className="text-gray-800 text-lg leading-relaxed italic mb-2">
                  &ldquo;{entry.exampleQuote.text}&rdquo;
                </blockquote>
                <cite className="text-sm text-gray-500 not-italic">
                  — {entry.exampleQuote.source || entry.notableSpeaker}
                </cite>
              </div>
            )}

            {entry.etymologyNarrative && (
              <Section title="Etymology">
                <p>{entry.etymologyNarrative}</p>
              </Section>
            )}

            {entry.usageHistoryNarrative && (
              <Section title="Usage History">
                <p>{entry.usageHistoryNarrative}</p>
              </Section>
            )}

            {entry.tabooTrajectoryNarrative && (
              <Section title="Taboo Trajectory">
                <p>{entry.tabooTrajectoryNarrative}</p>
              </Section>
            )}

            {entry.semanticDriftTimeline && (
              <Section title="Semantic Drift Timeline">
                <SemanticTimeline data={entry.semanticDriftTimeline} />
              </Section>
            )}

            {entry.regionalNotes && (
              <Section title="Regional Notes">
                <p>{entry.regionalNotes}</p>
              </Section>
            )}

            {entry.realWorldEuphemisms?.length > 0 && (
              <Section title="Real-World Euphemisms">
                <div className="flex flex-wrap gap-2">
                  {entry.realWorldEuphemisms.map((e) => (
                    <span
                      key={e}
                      className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600 border border-gray-200"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Quick facts */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Facts</h2>
              <dl className="space-y-3">
                {[
                  { label: 'Notable Speaker', value: entry.notableSpeaker },
                  { label: 'First Appearance', value: entry.firstAppearance },
                  { label: 'Franchise', value: entry.franchise },
                  { label: 'Medium', value: entry.medium },
                  { label: 'Part of Speech', value: entry.partOfSpeech },
                ].map(({ label, value }) =>
                  value ? (
                    <div key={label}>
                      <dt className="text-xs font-semibold text-gray-400">{label}</dt>
                      <dd className="text-sm text-gray-700 mt-0.5">{value}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            </div>

            {/* Badges summary */}
            <div className="rounded-2xl bg-white border border-gray-100 p-5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Classification</h2>
              <div className="flex flex-wrap gap-2">
                <Badge label={entry.severity} variant="severity" size="md" />
                <Badge label={entry.category} variant="category" size="md" />
                <Badge label={entry.medium} variant="medium" size="md" />
              </div>
            </div>

            {/* Related entries */}
            {related.length > 0 && <RelatedEntries entries={related} />}

            {/* Browse link */}
            <div className="text-center">
              <Link
                href="/browse"
                className="text-sm text-brand-coral hover:underline"
              >
                ← Back to Browse
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getAllSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EntryPageProps> = ({ params }) => {
  const slug = params?.slug as string;
  const entry = getEntryBySlug(slug);

  if (!entry) {
    return { notFound: true };
  }

  const related = getRelatedEntries(entry, 4);

  return {
    props: { entry, related },
  };
};

export default EntryPage;
