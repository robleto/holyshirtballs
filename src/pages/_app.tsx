import type { AppProps } from 'next/app';
import { Inter, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { allEntries } from '@/lib/entries';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

// Pick a random slug once per page load for the "Random" button
function getRandomSlug(): string {
  return allEntries[Math.floor(Math.random() * allEntries.length)].slug;
}

export default function App({ Component, pageProps }: AppProps) {
  // Safe for SSR — only called on client-side renders after hydration
  const randomSlug = getRandomSlug();

  return (
    <div className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col`}>
      <Header randomSlug={randomSlug} />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
