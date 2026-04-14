import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import type { Entry, SemanticDriftEntry } from '@/types/entry';
import { allEntries, getEntryBySlug, getAllSlugs, getRelatedEntries, franchiseToSlug, getEntriesByFranchise } from '@/lib/entries';
import Badge from '@/components/ui/Badge';
import MediumIcon from '@/components/ui/MediumIcon';
import RelatedEntries from '@/components/RelatedEntries';
import { SiX, SiBluesky, SiThreads, SiReddit, SiPinterest, SiInstagram } from 'react-icons/si';

interface EntryPageProps {
  entry: Entry;
  related: Entry[];
  franchiseCount: number;
  franchiseEntries: Entry[];
}

/*
  Section block — used throughout the detail page for each named content group.

  Design decisions (post-polish pass 2026-03-23):
  - Section heading was text-xs + ink-400 (#B0A49E) — too muted to serve as structural
    anchors. Reader loses sense of position on the page when all section labels are
    lighter than the body copy they introduce.
  - Upgraded to text-sm + ink-700 (#4A3F3A). Still clearly subordinate to the display-size
    term and smaller than body copy paragraph weight, but now readable as navigational markers.
  - Letter spacing retained (0.09em) — it's what makes these read as labels, not headings.
  - Rule bar: darkened from ink-300 (#D4CCC8) to ink-400 (#B0A49E) to stay proportional
    to the brighter label text.
  - Added pt-2 before each section to give the eye a beat before each new topic.
*/
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-7">
      <h2 className="section-label pb-3 mb-4 border-b border-ink-100">
        {title}
      </h2>
      <div className="text-ink-700" style={{ lineHeight: '1.7' }}>{children}</div>
    </div>
  );
}

/*
  Semantic drift timeline — visual timeline with coral dots.

  Design decisions (post-polish pass 2026-03-23):
  - Dot glow ring removed: `boxShadow: '0 0 0 1px rgba(245,93,53,0.2)'` was adding
    a faint coral halo that reads as visual noise at small sizes. The solid dot with
    a body-bg border is sufficient to separate the dot from the timeline line.
  - Period label: upgraded from ink-400 (#B0A49E) to ink-500 (#8C807A) — consistent
    with the Section header upgrade; still clearly subordinate to the meaning text.
*/
function SemanticTimeline({ data }: { data: SemanticDriftEntry[] | string }) {
  if (typeof data === 'string') {
    return <p className="text-ink-700" style={{ lineHeight: '1.7' }}>{data}</p>;
  }
  return (
    <ol className="relative space-y-4 pl-5 timeline-line">
      {data.map((item, i) => (
        <li key={i} className="relative">
          <span className="timeline-dot absolute" style={{ left: '-1.375rem', top: '0.25rem' }} />
          <p className="text-xs font-bold uppercase mb-0.5 text-ink-500" style={{ letterSpacing: '0.08em' }}>
            {item.period}
          </p>
          <p className="text-sm text-ink-700">{item.meaning}</p>
        </li>
      ))}
    </ol>
  );
}

/* ── Social share panel ─────────────────────────────────────────────────── */

function SharePanel({ entry }: { entry: Entry }) {
  const [copied, setCopied] = useState(false);
  const pageUrl = `https://holyshirtballs.fyi/entry/${entry.slug}`;
  const enc = encodeURIComponent;

  const shortText   = `"${entry.term}" (${entry.franchise}) ≈ "${entry.englishEquivalent}" — fictional ${entry.category.toLowerCase()}`;
  const postText    = `${shortText}\n${pageUrl}`;
  const pinDesc     = `"${entry.term}" ≈ "${entry.englishEquivalent}" — ${entry.category} from ${entry.franchise}. Severity: ${entry.severity}. From HolyShirtBalls: the archive of fictional profanity from film, TV, books, comics, and games.`;
  const redditTitle = `"${entry.term}" — fictional ${entry.category.toLowerCase()} from ${entry.franchise} (≈ "${entry.englishEquivalent}")`;

  const links = [
    { label: 'X',         href: `https://twitter.com/intent/tweet?text=${enc(shortText)}&url=${enc(pageUrl)}`,                          Icon: SiX },
    { label: 'Bluesky',   href: `https://bsky.app/intent/compose?text=${enc(postText)}`,                                                 Icon: SiBluesky },
    { label: 'Threads',   href: `https://www.threads.net/intent/post?text=${enc(postText)}`,                                             Icon: SiThreads },
    { label: 'Reddit',    href: `https://reddit.com/submit?url=${enc(pageUrl)}&title=${enc(redditTitle)}`,                               Icon: SiReddit },
    { label: 'Pinterest', href: `https://pinterest.com/pin/create/button/?url=${enc(pageUrl)}&description=${enc(pinDesc)}`,              Icon: SiPinterest },
  ];

  const handleInstagram = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: `"${entry.term}" — HolyShirtBalls`, text: shortText, url: pageUrl });
        return;
      } catch { /* cancelled or unsupported */ }
    }
    await navigator.clipboard.writeText(`${shortText}\n${pageUrl}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareBtnClass = 'inline-flex items-center justify-center h-11 rounded-xl border border-ink-200 text-ink-500 bg-white hover:border-brand-coral hover:text-brand-coral hover:bg-brand-warm-50 transition-all duration-150';

  return (
    <div className="rounded-2xl p-5 bg-white border border-ink-100">
      <h2 className="section-label mb-4">Share</h2>
      <div className="grid grid-cols-3 gap-2">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${label}`}
            className={shareBtnClass}
          >
            <Icon size={16} aria-hidden />
            <span className="sr-only">{label}</span>
          </a>
        ))}

        {/* Instagram — native share sheet on mobile, clipboard fallback on desktop */}
        <button
          onClick={handleInstagram}
          title={copied ? 'Copied!' : 'Share on Instagram'}
          className={copied
            ? 'inline-flex items-center justify-center h-11 rounded-xl border border-severity-mild text-severity-mild bg-white transition-all duration-150'
            : shareBtnClass
          }
        >
          {copied
            ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            : <SiInstagram size={16} aria-hidden />
          }
          <span className="sr-only">Share on Instagram</span>
        </button>
      </div>
    </div>
  );
}

/* ── Franchise panel — other entries from the same franchise ─────────── */
function FranchisePanel({ entries, franchiseName }: { entries: Entry[]; franchiseName: string }) {
  if (!entries.length) return null;
  return (
    <section aria-label={`More from ${franchiseName}`}>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="section-label">Also from</h2>
        <Link
          href={`/franchise/${franchiseToSlug(franchiseName)}`}
          className="text-xs font-medium text-brand-coral hover:underline transition-colors duration-150 truncate ml-2"
        >
          {franchiseName} →
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {entries.map((e) => (
          <Link
            key={e.slug}
            href={`/entry/${e.slug}`}
            className="group card flex items-start gap-3 p-3.5"
          >
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-[0.9375rem] truncate text-ink-900 group-hover:text-brand-coral transition-colors duration-150">
                {e.term}
              </p>
              <p className="text-xs truncate mt-0.5 text-ink-500">
                {e.category} · {e.severity}
              </p>
            </div>
            <div className="shrink-0 mt-0.5">
              <Badge label={e.severity} variant="severity" size="sm" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── Main page ─────────────────────────────────────────────────────────── */
const EntryPage: NextPage<EntryPageProps> = ({ entry, related, franchiseCount, franchiseEntries }) => {

  return (
    <>
      <Head>
        <title>{entry.term} &mdash; HolyShirtBalls</title>
        <meta name="description" content={entry.shortDescription} />
        <meta property="og:title" content={`${entry.term} — HolyShirtBalls`} />
        <meta property="og:description" content={entry.shortDescription} />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
          <Link href="/" className="text-ink-400 hover:text-brand-coral transition-colors duration-150">
            Home
          </Link>
          <span className="text-ink-300">/</span>
          <Link href="/browse" className="text-ink-400 hover:text-brand-coral transition-colors duration-150">
            Explore
          </Link>
          <span className="text-ink-300">/</span>
          <span className="text-ink-700">{entry.term}</span>
        </nav>

        {/* Entry header */}
        <header className="mb-10">
          {/* Franchise + medium icon */}
          <div className="flex items-center gap-1.5 mb-4">
            <MediumIcon medium={entry.medium} size={14} className="text-ink-400" />
            <Link
              href={`/franchise/${franchiseToSlug(entry.franchise)}`}
              className="text-sm font-medium text-ink-500 hover:text-brand-coral transition-colors duration-150"
            >
              {entry.franchise}
            </Link>
          </div>

          {/* Term — the hero display type */}
          <h1
            className="font-display font-extrabold leading-none mb-4 text-ink-900"
            style={{
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {entry.term}
          </h1>

          {/* Pronunciation + POS */}
          <p className="mb-3 text-ink-500" style={{ fontSize: '1.05rem' }}>
            <span className="font-mono text-base">/{entry.phoneticPronunciation}/</span>
            {' '}
            <span className="italic text-ink-400" style={{ fontSize: '1rem' }}>{entry.partOfSpeech}</span>
          </p>

          {/* English equivalent — coral accent, editorial register */}
          <p className="font-semibold mb-5 text-ink-700" style={{ fontSize: '1.375rem' }}>
            &#8776; &ldquo;<span className="text-brand-coral">{entry.englishEquivalent}</span>&rdquo;
          </p>

          {/* Short description — lead paragraph */}
          <p className="leading-relaxed max-w-2xl mb-6 text-ink-800" style={{ fontSize: '1.0625rem' }}>
            {entry.shortDescription}
          </p>

        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-0">

            {/* Example quote — left-bar only, no filled background.
                Previously used a warm orange-tinted fill (#FFF4EE) + strong coral border (3px).
                That combination made the quote visually heavier than the section headers that
                follow it, inverting the hierarchy. Now: no fill, thinner border (2px), slightly
                muted coral alpha — the quote is context, not the structural landmark. */}
            {entry.exampleQuote?.text && (
              <div
                className="mb-8 px-6 py-4"
                style={{
                  borderLeft: '2px solid rgba(245, 93, 53, 0.4)',
                }}
              >
                <blockquote
                  className="leading-relaxed italic mb-2 text-ink-700"
                  style={{ fontSize: '1.0625rem' }}
                >
                  &ldquo;{entry.exampleQuote.text}&rdquo;
                </blockquote>
                <cite className="text-sm not-italic text-ink-500">
                  &mdash; {entry.notableSpeaker || entry.exampleQuote.source}
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
                      className="px-3 py-1 rounded-full text-sm bg-[#F5EFEB] text-ink-700 border border-ink-200"
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
            <div className="sidebar-panel">
              <h2 className="section-label mb-4">At a Glance</h2>
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
                      <dt className="text-xs font-semibold text-ink-400">{label}</dt>
                      <dd className="text-sm mt-0.5 text-ink-800">{value}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            </div>

            {/* Classification panel */}
            <div className="rounded-2xl p-5 bg-white border border-ink-100">
              <h2 className="section-label mb-4">Classification</h2>
              <div className="flex flex-wrap gap-2">
                <Badge label={entry.severity} variant="severity" size="md" href={`/severity/${entry.severity.toLowerCase()}`} />
                <Badge label={entry.category} variant="category" size="md" href={`/category/${entry.category.toLowerCase()}`} />
                <Badge label={entry.medium} variant="medium" size="md" href={`/medium/${entry.medium.toLowerCase()}`} icon={<MediumIcon medium={entry.medium} size={14} />} />
              </div>
            </div>

            {/* More from this franchise */}
            <FranchisePanel entries={franchiseEntries} franchiseName={entry.franchise} />

            {/* Related entries */}
            {related.length > 0 && <RelatedEntries entries={related} />}

            {/* Share panel */}
            <SharePanel entry={entry} />

            {/* Back to browse */}
            <div className="text-center">
              <Link
                href="/browse"
                className="text-sm font-medium text-brand-coral hover:underline transition-colors duration-150"
              >
                &larr; Back to Explore
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
  const franchiseCount = allEntries.filter((e) => e.franchise === entry.franchise).length;
  const franchiseEntries = getEntriesByFranchise(entry.franchise)
    .filter((e) => e.slug !== slug)
    .slice(0, 4);

  return {
    props: { entry, related, franchiseCount, franchiseEntries },
  };
};

export default EntryPage;
