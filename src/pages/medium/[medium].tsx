import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { Entry } from '@/types/entry';
import { MEDIUMS, getEntriesByMedium } from '@/lib/entries';
import EntryCard from '@/components/EntryCard';

interface MediumPageProps {
  medium: string;
  entries: Entry[];
}

/*
  One sentence per medium — not marketing copy, not Wikipedia.
  The sentence should say something true and specific about this medium's
  relationship to fictional profanity.
*/
const MEDIUM_FRAMES: Record<string, string> = {
  TV: 'Television invented the censorship-workaround. Writers who needed emotional authenticity without network clearance built their own vocabulary — and in doing so, created some of the most memorable invented language in fiction.',
  Film: 'Film has no content standards to dodge, which changes the calculus entirely. Fictional profanity in film tends toward worldbuilding: the invented word earns its place by making a world feel real, not by substituting for a bleeped one.',
  Book: 'Prose fiction has the longest tradition of constructed profanity. Without an actor\'s delivery to carry weight, the invented word has to earn its power on the page alone — and the best of them do.',
  Comic: 'Comics navigate invented language with a visual constraint: the word has to fit in a balloon and still land. The vocabulary tends toward the punchy, the typographically distinctive, and the memorably brief.',
  Game: 'Games build profanity into lore. An invented curse in a game world is a flag that says this civilization has history, hierarchy, and transgression. The word often tells you more about the world than the quest log does.',
  Animation: 'Animation spans every age demographic simultaneously. The best animated profanity works on two levels — safe for the room it\'s watched in, loaded with meaning for anyone paying closer attention.',
};

const MediumPage: NextPage<MediumPageProps> = ({ medium, entries }) => {
  const frame = MEDIUM_FRAMES[medium];

  return (
    <>
      <Head>
        <title>{medium} &mdash; HolyShirtBalls</title>
        <meta name="description" content={frame ?? `${entries.length} fictional swear words and expletives from ${medium}.`} />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
          <Link href="/" className="text-ink-400 hover:text-brand-coral transition-colors duration-150">
            Home
          </Link>
          <span className="text-ink-200">/</span>
          <Link href="/medium" className="text-ink-400 hover:text-brand-coral transition-colors duration-150">
            Medium
          </Link>
          <span className="text-ink-200">/</span>
          <span className="text-ink-700">{medium}</span>
        </nav>

        {/* Page header */}
        <header className="pb-10 mb-10 border-b border-ink-100 max-w-3xl">
          <p className="eyebrow mb-4">Medium</p>
          <h1
            className="font-display font-extrabold leading-none mb-6 text-ink-900"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {medium}
          </h1>
          {frame && (
            <p className="leading-relaxed mb-6 text-ink-800" style={{ fontSize: '1.125rem', maxWidth: '52ch' }}>
              {frame}
            </p>
          )}
          <p className="text-sm text-ink-500">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} in the archive
          </p>
        </header>

        {/* Entry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <EntryCard key={entry.slug} entry={entry} hideContext="medium" />
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: MEDIUMS.map((m) => ({ params: { medium: m.toLowerCase() } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<MediumPageProps> = ({ params }) => {
  const mediumParam = params?.medium as string;
  const medium = MEDIUMS.find((m) => m.toLowerCase() === mediumParam);

  if (!medium) {
    return { notFound: true };
  }

  const entries = getEntriesByMedium(medium);

  return {
    props: { medium, entries },
  };
};

export default MediumPage;
