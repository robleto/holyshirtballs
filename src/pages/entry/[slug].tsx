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

/*
  Section block — used throughout the detail page for each named content group.

  Design decisions:
  - Section heading: uppercase tracked label style — subordinate to the term
  - Flanking rule: ink-200, short (1rem) — typographic detail that breaks the visual monotony
    of repeated section labels without drawing eye away from content
*/
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2
        className="text-xs font-bold uppercase flex items-center gap-2 mb-3"
        style={{ color: '#B0A49E', letterSpacing: '0.09em' }}
      >
        {/* Short rule bar — a signature detail: gives each section a bookend */}
        <span
          className="inline-block flex-shrink-0"
          style={{ width: '1rem', height: '1px', background: '#D4CCC8' }}
        />
        {title}
      </h2>
      <div style={{ color: '#4A3F3A', lineHeight: '1.7' }}>{children}</div>
    </div>
  );
}

/*
  Semantic drift timeline — visual timeline with coral dots.
*/
function SemanticTimeline({ data }: { data: SemanticDriftEntry[] | string }) {
  if (typeof data === 'string') {
    return <p style={{ color: '#4A3F3A', lineHeight: '1.7' }}>{data}</p>;
  }
  return (
    <ol className="relative space-y-4 pl-5" style={{ borderLeft: '2px solid #F2EDEA' }}>
      {data.map((item, i) => (
        <li key={i} className="relative">
          {/* Coral dot — the timeline's visual backbone */}
          <span
            className="absolute rounded-full"
            style={{
              left: '-1.375rem',
              top: '0.25rem',
              width: '0.75rem',
              height: '0.75rem',
              background: '#F55D35',
              border: '2px solid #FFFCF9',   /* matches body bg for clean separation */
              boxShadow: '0 0 0 1px rgba(245, 93, 53, 0.2)',
            }}
          />
          <p
            className="text-xs font-bold uppercase mb-0.5"
            style={{ color: '#B0A49E', letterSpacing: '0.08em' }}
          >
            {item.period}
          </p>
          <p className="text-sm" style={{ color: '#4A3F3A' }}>{item.meaning}</p>
        </li>
      ))}
    </ol>
  );
}

/*
  Copy/share button — inline action.
*/
function ShareButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border bg-white transition-all duration-150"
      style={{ borderColor: '#D4CCC8', color: '#4A3F3A' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#F55D35';
        (e.currentTarget as HTMLElement).style.color = '#F55D35';
        (e.currentTarget as HTMLElement).style.background = '#FFF4EE';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#D4CCC8';
        (e.currentTarget as HTMLElement).style.color = '#4A3F3A';
        (e.currentTarget as HTMLElement).style.background = 'white';
      }}
      title="Copy link"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" style={{ color: '#059669' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span style={{ color: '#059669' }}>Copied!</span>
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

/* ── Main page ─────────────────────────────────────────────────────────── */
const EntryPage: NextPage<EntryPageProps> = ({ entry, related }) => {
  const pageUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://holyshirtballs.fyi/entry/${entry.slug}`;

  return (
    <>
      <Head>
        <title>{entry.term} &mdash; HolyShirtBalls</title>
        <meta name="description" content={entry.shortDescription} />
        <meta property="og:title" content={`${entry.term} — HolyShirtBalls`} />
        <meta property="og:description" content={entry.shortDescription} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Breadcrumb — warm muted text, coral hover */}
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
            Browse
          </Link>
          <span style={{ color: '#D4CCC8' }}>/</span>
          <span style={{ color: '#4A3F3A' }}>{entry.term}</span>
        </nav>

        {/* Entry header */}
        <header className="mb-10">
          {/* Franchise + media context */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Link
              href={`/browse?franchise=${encodeURIComponent(entry.franchise)}`}
              className="text-sm font-medium transition-colors duration-150"
              style={{ color: '#8C807A' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8C807A'; }}
            >
              {entry.franchise}
            </Link>
            <span style={{ color: '#D4CCC8' }}>&middot;</span>
            <Badge label={entry.medium} variant="medium" size="sm" />
            <Badge label={entry.category} variant="category" size="sm" />
            <Badge label={entry.severity} variant="severity" size="sm" />
          </div>

          {/* Term — the hero display type */}
          <h1
            className="font-display font-extrabold leading-none mb-4"
            style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: '#1A1210',
              letterSpacing: '-0.03em',
            }}
          >
            {entry.term}
          </h1>

          {/* Pronunciation + POS */}
          <p className="mb-3" style={{ color: '#8C807A', fontSize: '1.05rem' }}>
            <span className="font-mono text-base">/{entry.phoneticPronunciation}/</span>
            {' '}
            <span className="italic" style={{ color: '#B0A49E', fontSize: '1rem' }}>{entry.partOfSpeech}</span>
          </p>

          {/* English equivalent — coral accent, editorial register */}
          <p
            className="font-semibold mb-5"
            style={{ fontSize: '1.375rem', color: '#4A3F3A' }}
          >
            &#8776; &ldquo;<span style={{ color: '#F55D35' }}>{entry.englishEquivalent}</span>&rdquo;
          </p>

          {/* Short description — lead paragraph */}
          <p
            className="leading-relaxed max-w-2xl mb-6"
            style={{ fontSize: '1.0625rem', color: '#2D2420' }}
          >
            {entry.shortDescription}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <ShareButton url={pageUrl} />
            <Link
              href={`/browse?franchise=${encodeURIComponent(entry.franchise)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border bg-white transition-all duration-150"
              style={{ borderColor: '#D4CCC8', color: '#4A3F3A' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#F55D35';
                (e.currentTarget as HTMLElement).style.color = '#F55D35';
                (e.currentTarget as HTMLElement).style.background = '#FFF4EE';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#D4CCC8';
                (e.currentTarget as HTMLElement).style.color = '#4A3F3A';
                (e.currentTarget as HTMLElement).style.background = 'white';
              }}
            >
              More from {entry.franchise.split(' ').slice(0, 2).join(' ')} &rarr;
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-0">

            {/* Example quote — warm tinted blockquote */}
            {entry.exampleQuote?.text && (
              <div
                className="mb-8 rounded-r-[1.25rem] px-6 py-5"
                style={{
                  background: '#FFF4EE',
                  borderLeft: '3px solid #F55D35',
                }}
              >
                <blockquote
                  className="leading-relaxed italic mb-2"
                  style={{ fontSize: '1.0625rem', color: '#2D2420' }}
                >
                  &ldquo;{entry.exampleQuote.text}&rdquo;
                </blockquote>
                <cite className="text-sm not-italic" style={{ color: '#8C807A' }}>
                  &mdash; {entry.exampleQuote.source || entry.notableSpeaker}
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
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        background: '#F5EFEB',
                        color: '#4A3F3A',
                        border: '1px solid #E8E2DE',
                      }}
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
            {/* Quick facts panel */}
            <div
              className="rounded-[1.25rem] p-5"
              style={{ background: '#F5EFEB', border: '1px solid #F2EDEA' }}
            >
              <h2
                className="text-xs font-bold uppercase mb-4"
                style={{ color: '#B0A49E', letterSpacing: '0.09em' }}
              >
                Quick Facts
              </h2>
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
                      <dt className="text-xs font-semibold" style={{ color: '#B0A49E' }}>{label}</dt>
                      <dd className="text-sm mt-0.5" style={{ color: '#2D2420' }}>{value}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            </div>

            {/* Classification panel */}
            <div
              className="rounded-[1.25rem] p-5"
              style={{ background: 'white', border: '1px solid #F2EDEA' }}
            >
              <h2
                className="text-xs font-bold uppercase mb-4"
                style={{ color: '#B0A49E', letterSpacing: '0.09em' }}
              >
                Classification
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge label={entry.severity} variant="severity" size="md" />
                <Badge label={entry.category} variant="category" size="md" />
                <Badge label={entry.medium} variant="medium" size="md" />
              </div>
            </div>

            {/* Related entries */}
            {related.length > 0 && <RelatedEntries entries={related} />}

            {/* Back to browse */}
            <div className="text-center">
              <Link
                href="/browse"
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: '#F55D35' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
              >
                &larr; Back to Browse
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
