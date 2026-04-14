import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FeaturedSection from '@/components/FeaturedSection';
import TaxCard, { MEDIUM_DESC, CATEGORY_DESC, SEVERITY_DESC } from '@/components/TaxCard';
import type { Entry } from '@/types/entry';
import {
  allEntries, getFeaturedSections, getAllFranchises, getAllSlugs,
  MEDIUMS, CATEGORIES, SEVERITIES,
  getEntriesByMedium, getEntriesByCategory, getEntriesBySeverity,
} from '@/lib/entries';

interface TaxItem { name: string; count: number; }

interface HomeProps {
  entryCount: number;
  franchiseCount: number;
  slugs: string[];
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
  slugs,
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

      <Hero entryCount={entryCount} franchiseCount={franchiseCount} slugs={slugs} />

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
            className="font-display font-bold text-2xl sm:text-3xl mb-3 text-ink-900"
            style={{ letterSpacing: '-0.015em' }}
          >
            Know a fictional swear we&rsquo;re missing?
          </h2>
          <p className="mb-6 max-w-lg mx-auto text-sm leading-relaxed text-ink-600">
            The archive grows one entry at a time. If you&rsquo;ve spotted a fictional expletive that isn&rsquo;t here yet, add it.
          </p>
          <Link
            href="/contribute"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-semibold bg-brand-coral hover:bg-brand-coral-hover transition-colors duration-150"
          >
            Add to the Archive
          </Link>
        </section>

        {/* Taxonomy browse sections */}
        <div className="section-divider" />

        {/* Browse by Medium — white surface, 3-col grid */}
        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display font-extrabold text-2xl text-ink-900" style={{ letterSpacing: '-0.01em' }}>
              Browse by Medium
            </h2>
            <Link href="/medium" className="text-sm font-medium text-ink-400 hover:text-brand-coral transition-colors duration-150">
              See all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediums.map(({ name, count }) => (
              <TaxCard key={name} type="medium" href={`/medium/${name.toLowerCase()}`} name={name} description={MEDIUM_DESC[name] ?? ''} count={count} />
            ))}
          </div>
        </section>

        {/* Browse by Category — muted surface band to break the rhythm */}
        <section className="-mx-4 px-4 py-10 mb-12 bg-[#F5EFEB] rounded-3xl">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display font-extrabold text-2xl text-ink-900" style={{ letterSpacing: '-0.01em' }}>
              Browse by Category
            </h2>
            <Link href="/category" className="text-sm font-medium text-ink-400 hover:text-brand-coral transition-colors duration-150">
              See all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(({ name, count }) => (
              <TaxCard key={name} type="category" href={`/category/${name.toLowerCase()}`} name={name} description={CATEGORY_DESC[name] ?? ''} count={count} />
            ))}
          </div>
        </section>

        {/* Browse by Severity — white surface, 4-col grid (distinct from above two) */}
        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="font-display font-extrabold text-2xl text-ink-900" style={{ letterSpacing: '-0.01em' }}>
              Browse by Severity
            </h2>
            <Link href="/severity" className="text-sm font-medium text-ink-400 hover:text-brand-coral transition-colors duration-150">
              See all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {severities.map(({ name, count }) => (
              <TaxCard key={name} type="severity" href={`/severity/${name.toLowerCase()}`} name={name} description={SEVERITY_DESC[name] ?? ''} count={count} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = () => {
  const sections = getFeaturedSections();
  const franchiseCount = getAllFranchises().length;

  return {
    props: {
      entryCount:    allEntries.length,
      franchiseCount,
      slugs:         getAllSlugs(),
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
