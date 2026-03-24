import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { Entry } from '@/types/entry';
import { CATEGORIES, getEntriesByCategory } from '@/lib/entries';
import EntryCard from '@/components/EntryCard';

interface CategoryPageProps {
  category: string;
  entries: Entry[];
}

/*
  One sentence per category — what this word type is doing and why it's interesting.
  Not a dictionary definition. A point of view.
*/
const CATEGORY_FRAMES: Record<string, string> = {
  Expletive: 'Pure emotional discharge. The expletive exists to carry force, not meaning — and the best fictional ones land immediately, before a reader even knows what they signify.',
  Insult: 'Targeted and personal. Fictional insults reveal social hierarchies: who can be degraded, in what terms, and what the choice of words says about the insulter as much as the target.',
  Euphemism: 'The polite route around something impolite. Euphemisms are often the most culturally revealing words in a fiction — they show what a society acknowledges but can\'t bring itself to say directly.',
  Curse: 'Invocations with intent. Curses carry structure and weight, and usually a mythology behind them. The fictional curse tells you what a world fears.',
  Oath: 'The solemn register. Oaths are what characters swear by, which tells you what they hold sacred. A fiction\'s oaths are a shortcut to its cosmology.',
  Slang: 'The informal layer — words that signal in-group membership and generational identity. Slang ages the fastest and dates a work most precisely. It\'s also the category most likely to escape into the real world.',
};

const CategoryPage: NextPage<CategoryPageProps> = ({ category, entries }) => {
  const frame = CATEGORY_FRAMES[category];

  return (
    <>
      <Head>
        <title>{category} &mdash; HolyShirtBalls</title>
        <meta name="description" content={frame ?? `${entries.length} fictional ${category.toLowerCase()} words and expressions.`} />
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
            href="/browse"
            className="transition-colors duration-150"
            style={{ color: '#B0A49E' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#F55D35'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#B0A49E'; }}
          >
            Archive
          </Link>
          <span style={{ color: '#D4CCC8' }}>/</span>
          <span style={{ color: '#4A3F3A' }}>{category}</span>
        </nav>

        {/* Page header */}
        <header className="pb-10 mb-10 border-b max-w-3xl" style={{ borderColor: '#F2EDEA' }}>
          <p
            className="text-xs font-bold uppercase mb-4"
            style={{ color: '#F55D35', letterSpacing: '0.15em' }}
          >
            Category
          </p>
          <h1
            className="font-display font-extrabold leading-none mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              color: '#1A1210',
              letterSpacing: '-0.02em',
            }}
          >
            {category}
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
            <EntryCard key={entry.slug} entry={entry} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: CATEGORIES.map((c) => ({ params: { category: c.toLowerCase() } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = ({ params }) => {
  const categoryParam = params?.category as string;
  const category = CATEGORIES.find((c) => c.toLowerCase() === categoryParam);

  if (!category) {
    return { notFound: true };
  }

  const entries = getEntriesByCategory(category);

  return {
    props: { category, entries },
  };
};

export default CategoryPage;
