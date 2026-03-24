import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { Entry } from '@/types/entry';
import { SEVERITIES, getEntriesBySeverity } from '@/lib/entries';
import EntryCard from '@/components/EntryCard';

interface SeverityPageProps {
  severity: string;
  entries: Entry[];
}

const SEVERITY_FRAMES: Record<string, string> = {
  Mild:     'The words you can say in front of your parents. Fictional mild language tends toward creative substitution — the writers had to work harder to make something that felt like swearing without crossing a line.',
  Moderate: 'The middle register. Moderate fictional profanity is the workhorse of invented language — strong enough to carry weight in a scene, acceptable enough to air before the watershed.',
  Strong:   'Words with genuine edge. Strong fictional profanity usually carries cultural or social freight within its world — they land hard on characters and audiences both.',
  Extreme:  'The words a fictional world reserves for its worst moments. Extreme entries are the ones that carry the most worldbuilding weight — they reveal what a society considers truly unspeakable.',
};

const SeverityPage: NextPage<SeverityPageProps> = ({ severity, entries }) => {
  const frame = SEVERITY_FRAMES[severity];

  return (
    <>
      <Head>
        <title>{severity} &mdash; HolyShirtBalls</title>
        <meta name="description" content={frame ?? `${entries.length} fictional words rated ${severity.toLowerCase()} severity.`} />
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
            href="/severity"
            className="transition-colors duration-150"
            style={{ color: '#B0A49E' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#B0A49E'; }}
          >
            Severity
          </Link>
          <span style={{ color: '#D4CCC8' }}>/</span>
          <span style={{ color: '#4A3F3A' }}>{severity}</span>
        </nav>

        {/* Page header */}
        <header className="pb-10 mb-10 border-b max-w-3xl" style={{ borderColor: '#F2EDEA' }}>
          <p
            className="text-xs font-bold uppercase mb-4"
            style={{ color: '#F55D35', letterSpacing: '0.15em' }}
          >
            Severity
          </p>
          <h1
            className="font-display font-extrabold leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              color: '#1A1210',
              letterSpacing: '-0.02em',
            }}
          >
            {severity}
          </h1>
          {frame && (
            <p className="leading-relaxed mb-6" style={{ fontSize: '1.125rem', color: '#2D2420', maxWidth: '52ch' }}>
              {frame}
            </p>
          )}
          <p className="text-sm" style={{ color: '#8C807A' }}>
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} in the archive
          </p>
        </header>

        {/* Entry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} hideContext="severity" />
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: SEVERITIES.map((s) => ({ params: { severity: s.toLowerCase() } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SeverityPageProps> = ({ params }) => {
  const severityParam = params?.severity as string;
  const severity = SEVERITIES.find((s) => s.toLowerCase() === severityParam);

  if (!severity) {
    return { notFound: true };
  }

  const entries = getEntriesBySeverity(severity);

  return {
    props: { severity, entries },
  };
};

export default SeverityPage;
