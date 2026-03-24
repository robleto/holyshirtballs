import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Hero from '@/components/Hero';
import FeaturedSection from '@/components/FeaturedSection';
import type { Entry } from '@/types/entry';
import { allEntries, getFeaturedSections, getAllFranchises } from '@/lib/entries';

interface HomeProps {
  entryCount: number;
  franchiseCount: number;
  mostIconic: Entry[];
  mildest: Entry[];
  mostInventive: Entry[];
  fromSciFi: Entry[];
}

const Home: NextPage<HomeProps> = ({
  entryCount,
  franchiseCount,
  mostIconic,
  mildest,
  mostInventive,
  fromSciFi,
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

      <Hero entryCount={entryCount} franchiseCount={franchiseCount} />

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
          browseLinkLabel="Browse all entries"
        />

        <div className="section-divider" />

        <FeaturedSection
          title="Mildest of the Mild"
          subtitle="Family-friendly cursing for when you need to express yourself without consequences."
          entries={mildest}
          browseLink="/browse?severity=Mild"
          browseLinkLabel="See all mild entries"
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
          subtitle="Where creativity in profanity reaches its highest density."
          entries={fromSciFi}
          browseLink="/browse?medium=TV"
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
            The archive grows through community contributions. If you&rsquo;ve spotted a fictional expletive
            not yet catalogued here, we want to hear from you.
          </p>
          <a
            href="/contribute"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-semibold transition-colors duration-150"
            style={{ background: '#F55D35' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#D94A22'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#F55D35'; }}
          >
            Contribute an Entry
          </a>
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
      entryCount: allEntries.length,
      franchiseCount,
      mostIconic:    sections.mostIconic,
      mildest:       sections.mildest,
      mostInventive: sections.mostInventive,
      fromSciFi:     sections.fromSciFi,
    },
  };
};

export default Home;
