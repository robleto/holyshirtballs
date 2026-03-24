import type { Entry, BrowseFilters, Medium, Category, Severity } from '@/types/entry';
import rawEntries from '../../data/entries.json';

export const allEntries: Entry[] = rawEntries as unknown as Entry[];

export function getEntryBySlug(slug: string): Entry | undefined {
  return allEntries.find((e) => e.slug === slug);
}

export function getAllSlugs(): string[] {
  return allEntries.map((e) => e.slug);
}

export function getAllFranchises(): string[] {
  return Array.from(new Set(allEntries.map((e) => e.franchise))).sort();
}

export function getFeaturedEntries(count = 6): Entry[] {
  // Prefer iconic entries with strong descriptions
  const iconic = ['frak', 'fork', 'smeg', 'drokk', 'gorram', 'belgium', 'blistering-barnacles', 'motherforking-shirtballs'];
  const featured: Entry[] = [];
  for (const slug of iconic) {
    const e = getEntryBySlug(slug);
    if (e) featured.push(e);
    if (featured.length >= count) break;
  }
  // backfill if needed
  if (featured.length < count) {
    for (const e of allEntries) {
      if (!featured.includes(e)) featured.push(e);
      if (featured.length >= count) break;
    }
  }
  return featured;
}

export function getRelatedEntries(entry: Entry, limit = 4): Entry[] {
  const related = new Set<Entry>();

  // First: explicitly listed related words (match by slug or term)
  for (const ref of entry.relatedWords) {
    const normalised = ref.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const found = allEntries.find(
      (e) =>
        e.slug === normalised ||
        e.term.toLowerCase() === ref.toLowerCase()
    );
    if (found && found.slug !== entry.slug) related.add(found);
    if (related.size >= limit) break;
  }

  // Backfill: same franchise
  if (related.size < limit) {
    for (const e of allEntries) {
      if (e.slug !== entry.slug && e.franchise === entry.franchise && !related.has(e)) {
        related.add(e);
        if (related.size >= limit) break;
      }
    }
  }

  // Backfill: same category
  if (related.size < limit) {
    for (const e of allEntries) {
      if (e.slug !== entry.slug && e.category === entry.category && !related.has(e)) {
        related.add(e);
        if (related.size >= limit) break;
      }
    }
  }

  return Array.from(related).slice(0, limit);
}

export function filterEntries(entries: Entry[], filters: BrowseFilters): Entry[] {
  let result = [...entries];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.franchise.toLowerCase().includes(q) ||
        e.shortDescription.toLowerCase().includes(q) ||
        e.exampleQuote.text.toLowerCase().includes(q) ||
        e.englishEquivalent.toLowerCase().includes(q)
    );
  }

  if (filters.medium) {
    result = result.filter((e) => e.medium === filters.medium);
  }

  if (filters.category) {
    result = result.filter((e) => e.category === filters.category);
  }

  if (filters.severity) {
    result = result.filter((e) => e.severity === filters.severity);
  }

  if (filters.franchise) {
    result = result.filter((e) =>
      e.franchise.toLowerCase().includes(filters.franchise.toLowerCase())
    );
  }

  // Sorting
  if (filters.sort === 'alpha') {
    result.sort((a, b) => a.term.localeCompare(b.term));
  } else if (filters.sort === 'franchise') {
    result.sort((a, b) => a.franchise.localeCompare(b.franchise) || a.term.localeCompare(b.term));
  } else if (filters.sort === 'severity') {
    const order: Record<Severity, number> = { Mild: 0, Moderate: 1, Strong: 2, Extreme: 3 };
    result.sort((a, b) => (order[b.severity] ?? 0) - (order[a.severity] ?? 0));
  }

  return result;
}

export function getRandomEntry(): Entry {
  return allEntries[Math.floor(Math.random() * allEntries.length)];
}

// Group entries for homepage featured sections
export function getFeaturedSections() {
  return {
    mostIconic: allEntries
      .filter((e) => ['frak', 'smeg', 'fork', 'gorram', 'belgium', 'drokk'].includes(e.slug))
      .slice(0, 6),
    mildest: allEntries
      .filter((e) => e.severity === 'Mild')
      .slice(0, 6),
    mostInventive: allEntries
      .filter((e) =>
        ['motherforking-shirtballs', 'blistering-barnacles', 'son-of-a-motherless-goat',
         'belgium', 'thundering-typhoons', 'wubba-lubba-dub-dub'].includes(e.slug)
      )
      .slice(0, 6),
    fromSciFi: allEntries
      .filter((e) =>
        ['Battlestar Galactica', 'Farscape', 'Firefly / Serenity', 'Star Wars (various novels)',
         'The Expanse', 'Red Dwarf'].includes(e.franchise) ||
        e.medium === 'TV' || e.medium === 'Film'
      )
      .slice(0, 6),
  };
}

export const MEDIUMS: Medium[] = ['TV', 'Film', 'Book', 'Comic', 'Game', 'Animation'];
export const CATEGORIES: Category[] = ['Expletive', 'Insult', 'Euphemism', 'Curse', 'Oath', 'Slang'];
export const SEVERITIES: Severity[] = ['Mild', 'Moderate', 'Strong', 'Extreme'];

// Slugify a franchise name → url-safe string
export function franchiseToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[/:()]/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/^-|-$/g, '');
}

// All franchises with 2+ entries → {slug, name, count}[]
export function getAllFranchisePages(): { slug: string; name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const e of allEntries) {
    counts.set(e.franchise, (counts.get(e.franchise) ?? 0) + 1);
  }
  const result: { slug: string; name: string; count: number }[] = [];
  for (const [name, count] of counts.entries()) {
    if (count >= 2) {
      result.push({ slug: franchiseToSlug(name), name, count });
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name));
}

// Get franchise name from slug
export function getFranchiseBySlug(slug: string): string | undefined {
  return allEntries.find((e) => franchiseToSlug(e.franchise) === slug)?.franchise;
}

// Get entries for a franchise name
export function getEntriesByFranchise(franchiseName: string): Entry[] {
  return allEntries.filter((e) => e.franchise === franchiseName);
}

// Get entries by medium
export function getEntriesByMedium(medium: string): Entry[] {
  return allEntries.filter((e) => e.medium.toLowerCase() === medium.toLowerCase());
}

// Get entries by category
export function getEntriesByCategory(category: string): Entry[] {
  return allEntries.filter((e) => e.category.toLowerCase() === category.toLowerCase());
}
