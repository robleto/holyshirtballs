import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Contribute: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contribute — HolyShirtBalls</title>
        <meta name="description" content="Add a fictional swear word to the HolyShirtBalls archive via GitHub pull request." />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-coral mb-3">Contribute</p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-display, Georgia, serif)' }}
          >
            Add an Entry
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            The archive grows through the community. Here&rsquo;s how to add a fictional expletive you&rsquo;ve spotted.
          </p>
        </div>

        <div className="prose-entry space-y-6 text-gray-700">

          <div className="rounded-2xl bg-orange-50 border border-orange-100 p-5">
            <p className="text-sm font-bold text-orange-800 mb-1">Before you contribute</p>
            <p className="text-sm text-orange-700">
              Check the{' '}
              <Link href="/browse" className="underline hover:text-brand-coral">browse page</Link>{' '}
              first to make sure the entry doesn&rsquo;t already exist. Use the search bar — we may have it under a
              slightly different spelling or franchise name.
            </p>
          </div>

          <h2>How to contribute</h2>
          <p>
            Contributions are made via GitHub pull request to the main repository.
            Fork the repo, add your entry to <code className="bg-gray-100 px-1 rounded">data/entries.json</code>,
            and open a PR. A maintainer will review it for completeness and accuracy.
          </p>

          <h2>Required fields</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700">Field</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['term', 'string', 'The fictional word or phrase, as it appears in source material.'],
                  ['slug', 'string', 'URL-safe version of the term: lowercase, hyphens, no special chars.'],
                  ['englishEquivalent', 'string', 'The closest real-world profanity equivalent.'],
                  ['phoneticPronunciation', 'string', 'How it\'s pronounced, e.g. "FRAK" or "FREL".'],
                  ['partOfSpeech', 'string', 'e.g. expletive, noun, verb, adjective, phrase.'],
                  ['franchise', 'string', 'The franchise where it originates. Match existing names exactly.'],
                  ['medium', 'enum', 'TV | Film | Book | Comic | Game | Animation'],
                  ['category', 'enum', 'Expletive | Insult | Euphemism | Curse | Oath | Slang'],
                  ['severity', 'enum', 'Mild | Moderate | Strong | Extreme'],
                  ['notableSpeaker', 'string', 'The character most associated with the word.'],
                  ['firstAppearance', 'string', 'Episode, chapter, issue, or film where it first appeared.'],
                  ['shortDescription', 'string', 'A 1–2 sentence description. Tone: playful, precise, editorial.'],
                  ['etymologyNarrative', 'string', 'How the word was invented; in-universe and/or real-world origin.'],
                  ['usageHistoryNarrative', 'string', 'How and by whom it was used across the source material.'],
                  ['tabooTrajectoryNarrative', 'string', 'How its transgressive status evolved over time.'],
                  ['regionalNotes', 'string', 'In-universe regional variations, if any.'],
                  ['exampleQuote', 'object', '{ text: "...", source: "Speaker, Episode/Chapter" }'],
                  ['relatedWords', 'string[]', 'Slugs of related entries in this archive.'],
                  ['realWorldEuphemisms', 'string[]', 'Real words that serve a similar function.'],
                ].map(([field, type, desc]) => (
                  <tr key={field} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-brand-coral">{field}</td>
                    <td className="px-4 py-3 text-xs text-purple-700 font-medium">{type}</td>
                    <td className="px-4 py-3 text-gray-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Validate your entry</h2>
          <p>
            Run the validation script before opening your PR:
          </p>
          <pre className="bg-gray-900 text-green-300 rounded-xl p-4 text-sm overflow-x-auto">
{`node scripts/validate-entries.js`}
          </pre>
          <p>
            This checks all required fields, valid enum values, and duplicate slugs. PRs that fail
            validation will not be merged.
          </p>

          <h2>Style guide</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Write in the present tense for in-universe descriptions.</li>
            <li>Keep <code className="bg-gray-100 px-1 rounded">shortDescription</code> under 200 characters when possible.</li>
            <li>Narrative fields should be engaging — this is a reference archive, not a Wikipedia article.</li>
            <li>Be precise about first appearances. &ldquo;Season 1&rdquo; is acceptable; &ldquo;Episode 3&rdquo; is better.</li>
            <li>Don&rsquo;t add entries for real-world profanity, only fictional coinages.</li>
            <li>The <code className="bg-gray-100 px-1 rounded">id</code> field should be the next available integer as a string.</li>
          </ul>

          <div className="mt-8 p-5 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row gap-4 items-start">
            <div className="text-3xl" aria-hidden>🎉</div>
            <div>
              <p className="font-bold text-gray-900 mb-1">Ready to contribute?</p>
              <p className="text-sm text-gray-600 mb-3">
                Fork the repository on GitHub, add your entry following this guide, and open a pull request.
                All contributions are reviewed by a maintainer before merging.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg
                  hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Open GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contribute;
