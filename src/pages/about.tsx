import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About — HolyShirtBalls</title>
        <meta name="description" content="About HolyShirtBalls — the internet's most comprehensive archive of fictional profanity." />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-coral mb-3">About the Project</p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Why study fictional profanity?
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Because the words a fictional world invents to swear by tell you everything about that world.
          </p>
        </div>

        {/* Body content */}
        <div className="prose-entry space-y-6 text-gray-700 leading-relaxed">
          <p>
            <strong>HolyShirtBalls</strong> is an open archive and reference site for fictional profanity —
            the made-up swear words, curses, insults, euphemisms, and taboo expressions invented by writers,
            game designers, and screenwriters to give their invented worlds authentic emotional texture.
          </p>

          <p>
            Every entry in this archive is meticulously documented: etymology, first appearance, semantic drift
            over time, regional and in-universe variations, and the cultural trajectory that determines whether
            a word stays safely on the fringe or escapes into the real world (as <em>frak</em> did, as{' '}
            <em>smeg</em> did, as The Good Place&rsquo;s vocabulary is currently doing).
          </p>

          <h2>Why does this matter?</h2>

          <p>
            Profanity is one of the most socially loaded and linguistically revealing features of any language.
            The words a culture forbids or contextualizes as taboo reveal its deepest values, fears, and social
            hierarchies. When a worldbuilder invents fictional profanity, they&rsquo;re doing the same work —
            but with the benefit of intentional design.
          </p>

          <p>
            <em>Frak</em>&rsquo;s construction tells us that its fictional society has the same emotional intensity
            as ours. <em>Belgium</em>&rsquo;s fictional extreme taboo (from Hitchhiker&rsquo;s Guide) is
            a philosophical joke about the arbitrariness of all taboo. Belter Creole&rsquo;s vocabulary in
            The Expanse embeds centuries of political oppression into its phonology. These aren&rsquo;t incidental
            details — they&rsquo;re the craft of building believable worlds.
          </p>

          <h2>The archive</h2>

          <p>
            Each entry is documented with the same rigor as a scholarly dictionary: etymology, usage history,
            taboo trajectory, regional variation, and semantic drift over time. We document both the in-universe
            meaning and the real-world cultural footprint.
          </p>

          <p>
            The archive currently covers{' '}
            <Link href="/browse" className="text-brand-coral hover:underline">
              entries from dozens of franchises
            </Link>{' '}
            across TV, film, books, comics, games, and animation. It grows through community contributions —
            every entry can be proposed, refined, and fact-checked through pull requests on GitHub.
          </p>

          <h2>The name</h2>

          <p>
            &ldquo;HolyShirtBalls&rdquo; is itself a fictional profanity — Eleanor Shellstrop&rsquo;s compound
            expletive from The Good Place, where the afterlife&rsquo;s mystical architecture prevents the
            articulation of actual swear words. It felt like the right name for an archive that studies
            exactly this kind of creative linguistic invention.
          </p>

          <h2>Contributing</h2>

          <p>
            The archive is open source and community-maintained. If you know a fictional expletive not yet
            in the archive, we want to hear from you.{' '}
            <Link href="/contribute" className="text-brand-coral hover:underline">
              See the contribution guide →
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
