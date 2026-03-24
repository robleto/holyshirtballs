import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FeaturedSection from '@/components/FeaturedSection';
import TaxCard, { MEDIUM_DESC, CATEGORY_DESC, SEVERITY_DESC } from '@/components/TaxCard';
import type { Entry } from '@/types/entry';
import {
  allEntries, getFeaturedSections, getAllFranchises,
  MEDIUMS, CATEGORIES, SEVERITIES,
  getEntriesByMedium, getEntriesByCategory, getEntriesBySeverity,
} from '@/lib/entries';

interface TaxItem { name: string; count: number; }

interface HomeProps {
  entryCount: number;
  franchiseCount: number;
  randomSlug: string;
  mostIconic: Entry[];
  mildest: Entry[];
  mostInventive: Entry[];
  fromSciFi: Entry[];
  mediums: TaxItem[];
  categories: TaxItem[];
  severities: TaxItem[];
}

const Home: NextPage<HomeProps> = ({
  entryCount,
  franchiseCount,
  randomSlug,
  mostIconic,
  mildest,
  mostInventive,
  fromSciFi,
  mediums,
  categories,
  severities,
}) => {
  return (
    <>
      <Head>
        <title>HolyShirtBalls &mdash; The Fictional Profanity Dictionary</title>
        <meta
          name="description"
          content={`${entryCount} made-up swear words, curses, insults, and taboo expressions from ${franchiseCount} franchises. The internet's most studied archive of fictional profanity.`}
        />
      </Head>

      <Hero entryCount={entryCount} franchiseCount={franchiseCount} randomSlug={randomSlug} />

      {/*
        Homepage content sections.
        Section dividers use section-divider utility (ink-100 border) — warmer than border-gray-100.
        FeaturedSection titles are now consistently ink-900 (not varying Tailwind accent classes).
      */}
      <div className="max-w-6xl mx-auto px-4">
        <FeaturedSection
          title="Most Iconic"
          subtitle="The fictional swear words that escaped the screen and entered real life."
          entries={mostIconic}
          browseLink="/browse"
          browseLinkLabel="Browse the archive"
        />

        <div className="section-divider" />

        <FeaturedSection
          title="Mildest of the Mild"
          subtitle="When you need to swear but the situation requires plausible deniability."
          entries={mildest}
          browseLink="/browse?severity=Mild"
          browseLinkLabel="Browse mild entries"
        />

        <div className="section-divider" />

        <FeaturedSection
          title="Most Inventive"
          subtitle="The entries that went above and beyond the call of profanity."
          entries={mostInventive}
          browseLink="/browse"
          browseLinkLabel="Explore the archive"
        />

        <div className="section-divider" />

        <FeaturedSection
          title="From Sci-Fi &amp; Fantasy"
          subtitle="Sci-fi and fantasy writers have always had the best swear words. Here's the proof."
          entries={fromSciFi}
          browseLink="/medium/tv"
          browseLinkLabel="Browse TV entries"
        />

        {/*
          CTA banner — warm cream surface, coral CTA button.
          Rounded-3xl matches the larger radius used for prominent container blocks.
          Border is coral-alpha (not orange-100) for consistency with the token system.
        */}
        <section
          className="my-16 rounded-3xl p-8 sm:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, #FFF4EE 0%, #FFF8F4 100%)',
            border: '1px solid rgba(245, 93, 53, 0.15)',
          }}
        >
          <h2
            className="font-display font-bold text-2xl sm:text-3xl mb-3"
            style={{ color: '#1A1210', letterSpacing: '-0.015em' }}
          >
            Know a fictional swear we&rsquo;re missing?
          </h2>
          <p className="mb-6 max-w-lg mx-auto text-sm leading-relaxed" style={{ color: '#6B5E58' }}>
            The archive grows one entry at a time. If you&rsquo;ve spotted a fictional expletive that isn&rsquo;t here yet, add it.
          </p>
          <a
            href="/contribute"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-150"
            style={{ background: '#F55D35' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#D94A22'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#F55D35'; }}
          >
            Add to the Archive
          </a>
        </section>

        {/* Taxonomy browse sections */}
        <div className="section-divider" />

        {(['medium', 'category', 'severity'] as const).map((type) => {
          const items = type === 'medium' ? mediums : type === 'category' ? categories : severities;
          const descs = type === 'medium' ? MEDIUM_DESC : type === 'category' ? CATEGORY_DESC : SEVERITY_DESC;
          const title = type === 'medium' ? 'Browse by Medium' : type === 'category' ? 'Browse by Category' : 'Browse by Severity';
          const href  = `/${type}`;
          const cols  = type === 'severity' ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3';
          return (
            <section key={type} className="mb-12">
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
              <div className={`grid grid-cols-1 sm:${cols} gap-4`}>
                {items.map(({ name, count }) => (
                  <TaxCard key={name} type={type} href={`/${type}/${name.toLowerCase()}`} name={name} description={descs[name] ?? ''} count={count} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  const sections = getFeaturedSections();
  const franchiseCount = getAllFranchises().length;

  const randomSlug = allEntries[Math.floor(Math.random() * allEntries.length)]?.slug ?? '';

  return {
    props: {
      entryCount:    allEntries.length,
      franchiseCount,
      randomSlug,
      mostIconic:    sections.mostIconic,
      mildest:       sections.mildest,
      mostInventive: sections.mostInventive,
      fromSciFi:     sections.fromSciFi,
      mediums:       MEDIUMS.map((name) => ({ name, count: getEntriesByMedium(name).length })),
      categories:    CATEGORIES.map((name) => ({ name, count: getEntriesByCategory(name).length })),
      severities:    SEVERITIES.map((name) => ({ name, count: getEntriesBySeverity(name).length })),
    },
  };
};

export default Home;
