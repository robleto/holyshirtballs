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
      <h2
        className="font-sans text-xs font-bold uppercase pb-3 mb-4 border-b"
        style={{ color: '#F55D35', letterSpacing: '0.09em', borderColor: '#F2EDEA' }}
      >
        {title}
      </h2>
      <div style={{ color: '#4A3F3A', lineHeight: '1.7' }}>{children}</div>
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
    return <p style={{ color: '#4A3F3A', lineHeight: '1.7' }}>{data}</p>;
  }
  return (
    <ol className="relative space-y-4 pl-5" style={{ borderLeft: '2px solid #F2EDEA' }}>
      {data.map((item, i) => (
        <li key={i} className="relative">
          {/* Coral dot — solid only, no glow ring */}
          <span
            className="absolute rounded-full"
            style={{
              left: '-1.375rem',
              top: '0.25rem',
              width: '0.75rem',
              height: '0.75rem',
              background: '#F55D35',
              border: '2px solid #FFFCF9',   /* matches body bg for clean dot separation */
            }}
          />
          <p
            className="text-xs font-bold uppercase mb-0.5"
            style={{ color: '#8C807A', letterSpacing: '0.08em' }}
          >
            {item.period}
          </p>
          <p className="text-sm" style={{ color: '#4A3F3A' }}>{item.meaning}</p>
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

  const btnBase = {
    borderColor: '#E8E2DE', color: '#8C807A', background: 'white',
  };
  const btnHover = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = '#F55D35';
    (e.currentTarget as HTMLElement).style.color = '#F55D35';
    (e.currentTarget as HTMLElement).style.background = '#FFF4EE';
  };
  const btnLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.borderColor = '#E8E2DE';
    (e.currentTarget as HTMLElement).style.color = '#8C807A';
    (e.currentTarget as HTMLElement).style.background = 'white';
  };

  return (
    <div className="rounded-[1.25rem] p-5" style={{ background: 'white', border: '1px solid #F2EDEA' }}>
      <h2 className="font-sans text-xs font-bold uppercase mb-4" style={{ color: '#F55D35', letterSpacing: '0.09em' }}>
        Share
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${label}`}
            className="inline-flex items-center justify-center h-9 rounded-xl border transition-all duration-150"
            style={btnBase}
            onMouseEnter={btnHover}
            onMouseLeave={btnLeave}
          >
            <Icon size={16} aria-hidden />
            <span className="sr-only">{label}</span>
          </a>
        ))}

        {/* Instagram — native share sheet on mobile, clipboard fallback on desktop */}
        <button
          onClick={handleInstagram}
          title={copied ? 'Copied!' : 'Share on Instagram'}
          className="inline-flex items-center justify-center h-9 rounded-xl border transition-all duration-150"
          style={copied ? { borderColor: '#059669', color: '#059669', background: 'white' } : btnBase}
          onMouseEnter={copied ? undefined : btnHover}
          onMouseLeave={copied ? undefined : btnLeave}
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

/* ── Main page ─────────────────────────────────────────────────────────── */
const EntryPage: NextPage<EntryPageProps> = ({ entry, related, franchiseCount }) => {

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
            Explore
          </Link>
          <span style={{ color: '#D4CCC8' }}>/</span>
          <span style={{ color: '#4A3F3A' }}>{entry.term}</span>
        </nav>

        {/* Entry header */}
        <header className="mb-10">
          {/* Franchise + medium icon */}
          <div className="flex items-center gap-1.5 mb-4">
            <MediumIcon medium={entry.medium} size={14} className="text-[#B0A49E]" />
            <Link
              href={`/franchise/${franchiseToSlug(entry.franchise)}`}
              className="text-sm font-medium transition-colors duration-150"
              style={{ color: '#8C807A' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#8C807A'; }}
            >
              {entry.franchise}
            </Link>
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
                  className="leading-relaxed italic mb-2"
                  style={{ fontSize: '1.0625rem', color: '#4A3F3A' }}
                >
                  &ldquo;{entry.exampleQuote.text}&rdquo;
                </blockquote>
                <cite className="text-sm not-italic" style={{ color: '#8C807A' }}>
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
                className="font-sans text-xs font-bold uppercase mb-4"
                style={{ color: '#F55D35', letterSpacing: '0.09em' }}
              >
                At a Glance
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
                className="font-sans text-xs font-bold uppercase mb-4"
                style={{ color: '#F55D35', letterSpacing: '0.09em' }}
              >
                Classification
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge label={entry.severity} variant="severity" size="md" href={`/severity/${entry.severity.toLowerCase()}`} />
                <Badge label={entry.category} variant="category" size="md" href={`/category/${entry.category.toLowerCase()}`} />
                <Badge label={entry.medium} variant="medium" size="md" href={`/medium/${entry.medium.toLowerCase()}`} icon={<MediumIcon medium={entry.medium} size={14} />} />
              </div>
            </div>

            {/* Related entries */}
            {related.length > 0 && <RelatedEntries entries={related} />}

            {/* Share panel */}
            <SharePanel entry={entry} />

            {/* Back to browse */}
            <div className="text-center">
              <Link
                href="/browse"
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: '#F55D35' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
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

  return {
    props: { entry, related, franchiseCount },
  };
};

export default EntryPage;
