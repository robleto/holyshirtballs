import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { getAllSlugs } from '@/lib/entries';

/*
  Custom 404 — on-brand dead-end handler.

  Design decisions:
  - Typographic glyph (?!@#) at low opacity as visual anchor — same treatment as EmptyState
  - Copy is dry and editorial: the word doesn't exist here. It might not exist anywhere.
  - Two escape routes: Browse the archive, or I'm Feeling Lucky (random entry)
  - No blame, no apology — just a clear next step
*/
interface NotFoundProps { slugs: string[]; }

const NotFound: NextPage<NotFoundProps> = ({ slugs }) => {
  const handleLucky = () => {
    const slug = slugs[Math.floor(Math.random() * slugs.length)];
    window.location.href = `/entry/${slug}`;
  };

  return (
    <>
      <Head>
        <title>404 &mdash; HolyShirtBalls</title>
        <meta name="description" content="That word doesn't exist here. It might not exist anywhere." />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        {/* Typographic glyph — matches EmptyState and hero decoration register */}
        <div
          className="font-display font-extrabold leading-none mb-8 select-none text-brand-coral"
          style={{
            fontSize: '6rem',
            opacity: 0.12,
            letterSpacing: '-0.05em',
          }}
          aria-hidden={true}
        >
          ?!@#
        </div>

        <p className="eyebrow mb-4">404</p>

        <h1
          className="font-display font-extrabold text-3xl sm:text-4xl mb-4 text-ink-900"
          style={{ letterSpacing: '-0.02em' }}
        >
          That word doesn&rsquo;t exist here.
        </h1>

        <p className="text-sm text-ink-600 mb-8 max-w-sm mx-auto leading-relaxed">
          It might not exist anywhere. But there are{' '}
          <Link href="/browse" className="text-brand-coral hover:underline transition-colors duration-150">
            hundreds of words that do
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold bg-brand-coral hover:bg-brand-coral-hover transition-colors duration-150"
          >
            Browse the Archive
          </Link>
          <button
            onClick={handleLucky}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-ink-700 bg-white border border-ink-200 hover:border-brand-coral hover:text-brand-coral transition-colors duration-150"
          >
            I&rsquo;m Feeling Lucky
          </button>
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<NotFoundProps> = () => ({
  props: { slugs: getAllSlugs() },
});

export default NotFound;
