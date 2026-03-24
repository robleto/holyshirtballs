import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { MEDIUMS, getEntriesByMedium } from '@/lib/entries';
import MediumIcon from '@/components/ui/MediumIcon';

interface MediumIndexProps {
  mediums: { name: string; count: number }[];
}

const MEDIUM_FRAMES: Record<string, string> = {
  TV:        'Television invented the censorship-workaround. Writers who needed emotional authenticity without network clearance built their own vocabulary.',
  Film:      'Film has no content standards to dodge. Fictional profanity in film tends toward worldbuilding — the invented word earns its place by making a world feel real.',
  Book:      'Prose fiction has the longest tradition of constructed profanity. Without an actor\'s delivery to carry weight, the invented word has to earn its power on the page alone.',
  Comic:     'Comics navigate invented language with a visual constraint: the word has to fit in a balloon and still land. The vocabulary tends toward the punchy and memorably brief.',
  Game:      'Games build profanity into lore. An invented curse in a game world is a flag that says this civilization has history, hierarchy, and transgression.',
  Animation: 'Animation spans every age demographic simultaneously. The best animated profanity works on two levels — safe for the room, loaded with meaning for anyone paying closer attention.',
};

const MediumIndexPage: NextPage<MediumIndexProps> = ({ mediums }) => {
  return (
    <>
      <Head>
        <title>Browse by Medium &mdash; HolyShirtBalls</title>
        <meta name="description" content="Explore fictional profanity by medium — TV, Film, Book, Comic, Game, and Animation." />
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
          <span style={{ color: '#4A3F3A' }}>Medium</span>
        </nav>

        <header className="pb-10 mb-10 border-b max-w-3xl" style={{ borderColor: '#F2EDEA' }}>
          <p className="text-xs font-bold uppercase mb-4" style={{ color: '#F55D35', letterSpacing: '0.15em' }}>
            Browse by
          </p>
          <h1
            className="font-display font-extrabold leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', color: '#1A1210', letterSpacing: '-0.02em' }}
          >
            Medium
          </h1>
          <p className="leading-relaxed" style={{ fontSize: '1.125rem', color: '#2D2420', maxWidth: '52ch' }}>
            The archive spans six mediums. Each one has a different relationship to invented language.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediums.map(({ name, count }) => (
            <Link
              key={name}
              href={`/medium/${name.toLowerCase()}`}
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
              <div className="flex items-center gap-2 mb-3">
                <MediumIcon medium={name} size={20} className="text-[#F55D35]" />
                <h2 className="font-display font-extrabold text-xl" style={{ color: '#1A1210' }}>{name}</h2>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: '#6B5E58' }}>
                {MEDIUM_FRAMES[name]}
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

export const getStaticProps: GetStaticProps<MediumIndexProps> = () => {
  const mediums = MEDIUMS.map((name) => ({
    name,
    count: getEntriesByMedium(name).length,
  }));
  return { props: { mediums } };
};

export default MediumIndexPage;
