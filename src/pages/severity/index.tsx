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
          <span style={{ color: '#4A3F3A' }}>Severity</span>
        </nav>

        <header className="pb-10 mb-10 border-b max-w-3xl" style={{ borderColor: '#F2EDEA' }}>
          <p className="text-xs font-bold uppercase mb-4" style={{ color: '#F55D35', letterSpacing: '0.15em' }}>
            Browse by
          </p>
          <h1
            className="font-display font-extrabold leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', color: '#1A1210', letterSpacing: '-0.02em' }}
          >
            Severity
          </h1>
          <p className="leading-relaxed" style={{ fontSize: '1.125rem', color: '#2D2420', maxWidth: '52ch' }}>
            Every entry is rated on a four-point scale from Mild to Extreme — based on how the word functions within its fictional world.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {severities.map(({ name, count }) => (
            <Link
              key={name}
              href={`/severity/${name.toLowerCase()}`}
              className="group block rounded-[1.25rem] bg-white p-6 border transition-[border-color,box-shadow,transform] duration-200 ease-in-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
              style={{ borderColor: '#F2EDEA', boxShadow: '0 1px 3px rgba(26,18,16,0.06)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,93,53,0.35)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(26,18,16,0.10)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#F2EDEA';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(26,18,16,0.06)';
              }}
            >
              <div
                className="flex items-center gap-2 mb-3"
                style={{ color: severityColors[name] ?? '#1A1210' }}
              >
                <SeverityIcon severity={name} size={20} />
                <h2 className="font-display font-extrabold text-xl">{name}</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B5E58' }}>
                {SEVERITY_FRAMES[name]}
              </p>
              <p className="text-xs font-semibold" style={{ color: '#B0A49E' }}>
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
