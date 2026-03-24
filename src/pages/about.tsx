import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { allEntries, getAllFranchises } from '@/lib/entries';

interface AboutProps {
  entryCount: number;
  franchiseCount: number;
}

const About: NextPage<AboutProps> = ({ entryCount, franchiseCount }) => {
  return (
    <>
      <Head>
        <title>About &mdash; HolyShirtBalls</title>
        <meta name="description" content="About HolyShirtBalls — the internet's most comprehensive archive of fictional profanity." />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-16">

        {/* Page header */}
        <div className="mb-12">
          <p className="eyebrow mb-3">About the Project</p>

          <h1
            className="font-display font-extrabold text-4xl sm:text-5xl mb-5 leading-tight"
            style={{ color: '#1A1210', letterSpacing: '-0.025em' }}
          >
            Why study fictional profanity?
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: '#4A3F3A' }}>
            Because the words a fictional world invents to swear by tell you everything about that world.
          </p>
        </div>

        {/* Body content */}
        <div className="prose-entry space-y-6">
          <p>
            <strong style={{ color: '#1A1210' }}>HolyShirtBalls</strong> is an open archive and reference
            site for fictional profanity &mdash; the made-up swear words, curses, insults, euphemisms, and
            taboo expressions invented by writers, game designers, and screenwriters to give their invented
            worlds texture and emotional weight.
          </p>

          <p>
            Every culture &mdash; real or imagined &mdash; reveals its deepest values through the words it
            forbids. When a worldbuilder invents profanity, they&rsquo;re encoding social hierarchies,
            religious anxieties, and political histories into a single syllable. <em>Frak</em> tells us its
            fictional society carries the same emotional voltage as ours. <em>Belgium</em> as an extreme
            obscenity (<em>Hitchhiker&rsquo;s Guide</em>) is a philosophical joke about the arbitrariness of
            all taboo. Belter Creole&rsquo;s vocabulary in <em>The Expanse</em> embeds centuries of political
            oppression into its phonology. These aren&rsquo;t incidental details &mdash; they&rsquo;re the
            craft of building believable worlds.
          </p>

          <p>
            And sometimes the invented words escape. <em>Frak</em> did. <em>Smeg</em> did. The Good
            Place&rsquo;s entire vocabulary is currently doing it. That migration &mdash; from fictional world
            to real-world usage &mdash; is its own kind of linguistic event, and we track that too.
          </p>

          <h2>The archive</h2>

          <p>
            Each entry is documented with the rigor of a scholarly dictionary: etymology, first appearance,
            usage history, semantic drift, taboo trajectory, regional and in-universe variation, and
            real-world cultural footprint. The archive currently spans{' '}
            <Link
              href="/browse"
              className="transition-colors duration-150"
              style={{ color: '#F55D35' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
            >
              {entryCount} entries across {franchiseCount} franchises
            </Link>{' '}
            in TV, film, books, comics, games, and animation.
          </p>

          <p>
            It grows through community contributions &mdash; every entry can be proposed, refined, and
            fact-checked through pull requests on GitHub.
          </p>

          <h2>The name</h2>

          <p>
            &ldquo;HolyShirtBalls&rdquo; is itself a fictional profanity &mdash; Eleanor Shellstrop&rsquo;s
            compound expletive from <em>The Good Place</em>, where the afterlife&rsquo;s architecture
            prevents anyone from articulating actual swear words. It felt like the right name for an archive
            that studies exactly this kind of creative linguistic invention.
          </p>

          <h2>Contributing</h2>

          <p>
            The archive is open source, and there are absolutely fictional expletives we haven&rsquo;t
            cataloged yet. If you know one, add it.
          </p>

          <p>
            <Link
              href="/contribute"
              className="transition-colors duration-150"
              style={{ color: '#F55D35' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
            >
              See the contribution guide &rarr;
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<AboutProps> = () => {
  return {
    props: {
      entryCount: allEntries.length,
      franchiseCount: getAllFranchises().length,
    },
  };
};

export default About;
