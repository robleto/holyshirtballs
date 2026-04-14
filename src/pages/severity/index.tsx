import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SEVERITIES, getEntriesBySeverity } from '@/lib/entries';
import SeverityIcon from '@/components/ui/SeverityIcon';

interface SeverityIndexProps {
  severities: { name: string; count: number }[];
}

const SEVERITY_FRAMES: Record<string, string> = {
  Mild:     'The words you can say in front of your parents. Fictional mild language tends toward creative substitution — the writers had to work harder to make something that felt like swearing without crossing a line.',
  Moderate: 'The middle register. Strong enough to carry weight in a scene, acceptable enough to air before the watershed.',
  Strong:   'Words with genuine edge. Strong fictional profanity usually carries cultural or social freight within its world — they land hard on characters and audiences both.',
  Extreme:  'The words a fictional world reserves for its worst moments. Extreme entries carry the most worldbuilding weight — they reveal what a society considers truly unspeakable.',
};

const severityColors: Record<string, string> = {
  Mild:     '#065F46',
  Moderate: '#92400E',
  Strong:   '#C2410C',
  Extreme:  '#991B1B',
};

const SeverityIndexPage: NextPage<SeverityIndexProps> = ({ severities }) => {
  return (
    <>
      <Head>
        <title>Browse by Severity &mdash; HolyShirtBalls</title>
        <meta name="description" content="Explore fictional profanity by severity — from Mild to Extreme." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
          <Link href="/" className="text-ink-400 hover:text-brand-coral transition-colors duration-150">
            Home
          </Link>
          <span className="text-ink-200">/</span>
          <span className="text-ink-700">Severity</span>
        </nav>

        <header className="pb-10 mb-10 border-b border-ink-100 max-w-3xl">
          <p className="eyebrow mb-4">Browse by</p>
          <h1
            className="font-display font-extrabold leading-none mb-4 text-ink-900"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', letterSpacing: '-0.02em' }}
          >
            Severity
          </h1>
          <p className="leading-relaxed text-ink-800" style={{ fontSize: '1.125rem', maxWidth: '52ch' }}>
            Every entry is rated on a four-point scale from Mild to Extreme — based on how the word functions within its fictional world.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {severities.map(({ name, count }) => (
            <Link
              key={name}
              href={`/severity/${name.toLowerCase()}`}
              className="card block p-6"
            >
              {/* Severity accent color is intentional semantic distinction — not a token */}
              <div
                className="flex items-center gap-2 mb-3"
                style={{ color: severityColors[name] ?? '#1A1210' }}
              >
                <SeverityIcon severity={name} size={20} />
                <h2 className="font-display font-extrabold text-xl">{name}</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4 text-ink-600">
                {SEVERITY_FRAMES[name]}
              </p>
              <p className="text-xs font-semibold text-ink-400">
                {count} {count === 1 ? 'entry' : 'entries'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<SeverityIndexProps> = () => {
  const severities = SEVERITIES.map((name) => ({
    name,
    count: getEntriesBySeverity(name).length,
  }));
  return { props: { severities } };
};

export default SeverityIndexPage;
