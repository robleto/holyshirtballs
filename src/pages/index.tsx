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
        <title>HolyShirtBalls — The Fictional Profanity Dictionary</title>
        <meta
          name="description"
          content={`${entryCount} made-up swear words, curses, insults, and taboo expressions from ${franchiseCount} franchises. The internet's most studied archive of fictional profanity.`}
        />
      </Head>

      <Hero entryCount={entryCount} franchiseCount={franchiseCount} />

      <div className="max-w-6xl mx-auto px-4">
        <FeaturedSection
          title="Most Iconic"
          subtitle="The fictional swear words that escaped the screen and entered real life."
          entries={mostIconic}
          browseLink="/browse"
          browseLinkLabel="Browse all entries"
          accent="text-brand-coral"
        />

        <div className="border-t border-gray-100" />

        <FeaturedSection
          title="Mildest of the Mild"
          subtitle="Family-friendly cursing for when you need to express yourself without consequences."
          entries={mildest}
          browseLink="/browse?severity=Mild"
          browseLinkLabel="See all mild entries"
          accent="text-emerald-600"
        />

        <div className="border-t border-gray-100" />

        <FeaturedSection
          title="Most Inventive"
          subtitle="The entries that went above and beyond the call of profanity."
          entries={mostInventive}
          browseLink="/browse"
          browseLinkLabel="Explore the archive"
          accent="text-brand-purple"
        />

        <div className="border-t border-gray-100" />

        <FeaturedSection
          title="From Sci-Fi & Fantasy"
          subtitle="Where creativity in profanity reaches its highest density."
          entries={fromSciFi}
          browseLink="/browse?medium=TV"
          browseLinkLabel="Browse TV entries"
          accent="text-blue-600"
        />

        {/* CTA banner */}
        <section className="my-16 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 p-8 sm:p-12 text-center">
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Know a fictional swear we&rsquo;re missing?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            The archive grows through community contributions. If you&rsquo;ve spotted a fictional expletive
            not yet catalogued here, we want to hear from you.
          </p>
          <a
            href="/contribute"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-coral text-white font-semibold rounded-xl
              hover:bg-orange-600 transition-colors shadow-sm"
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
      mostIconic: sections.mostIconic,
      mildest: sections.mildest,
      mostInventive: sections.mostInventive,
      fromSciFi: sections.fromSciFi,
    },
  };
};

export default Home;
