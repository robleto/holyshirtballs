#!/usr/bin/env node
/**
 * CSV to JSON converter for HolyShirtBalls entries.
 *
 * Usage:
 *   node scripts/csv-to-json.js [input.csv] [output.json]
 *
 * Defaults:
 *   input  → data/entries.csv
 *   output → data/entries.json
 *
 * Expected CSV columns (in any order):
 *   Term, English Equivalent, Phonetic Pronunciation, Part of Speech,
 *   Franchise, Medium, Related Words (Cross-Franchise), Real-World Euphemisms,
 *   Category, Severity, Notable Speaker, First Appearance (Episode/Chapter/Issue),
 *   Short Description, Etymology (Narrative), Semantic Drift Timeline,
 *   Usage History (Narrative), Taboo Trajectory (Narrative),
 *   Regional Notes (In-Universe), Example Quote
 */

const fs = require('fs');
const path = require('path');

// ─── helpers ──────────────────────────────────────────────────────────────────

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Parse a CSV string that may contain quoted fields with commas/newlines. */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        row.push(field);
        field = '';
      } else if (ch === '\n') {
        row.push(field);
        field = '';
        if (row.some(f => f.trim())) rows.push(row);
        row = [];
      } else if (ch === '\r') {
        // skip carriage returns
      } else {
        field += ch;
      }
    }
  }
  if (field || row.length) {
    row.push(field);
    if (row.some(f => f.trim())) rows.push(row);
  }

  return rows;
}

// ─── normalisers ──────────────────────────────────────────────────────────────

const MEDIUM_PRIORITY = ['TV', 'Film', 'Animation', 'Comic', 'Book', 'Game'];

function normalizeMedium(raw) {
  const s = raw.toUpperCase();
  if (s.includes('ANIME') || s.includes('MANGA')) return 'Animation';
  if (s.includes('TV'))      return 'TV';
  if (s.includes('FILM') || s.includes('MUSICAL')) return 'Film';
  if (s.includes('COMIC'))   return 'Comic';
  if (s.includes('GAME') || s.includes('TTRPG') || s.includes('VIDEO GAME')) return 'Game';
  if (s.includes('BOOK'))    return 'Book';
  return 'TV'; // fallback
}

function normalizeSeverity(raw) {
  const s = raw.toLowerCase();
  if (s.startsWith('extreme')) return 'Extreme';
  if (s.startsWith('strong'))  return 'Strong';
  if (s.startsWith('mild to extreme') || s.includes('context-dependent')) return 'Moderate';
  if (s.startsWith('mild to moderate') || s.includes('mild (tla)')) return 'Mild';
  if (s.startsWith('mild (in japanese)')) return 'Moderate';
  if (s.startsWith('mild'))    return 'Mild';
  if (s.startsWith('moderate')) return 'Moderate';
  if (s.includes('variable')) return 'Mild';
  return 'Moderate';
}

function normalizeCategory(raw) {
  const s = raw.toLowerCase();
  if (s.includes('slur')) return 'Insult';
  if (s.includes('insult')) return 'Insult';
  if (s.includes('blasphemy')) return 'Oath';
  if (s.includes('scatological')) return 'Expletive';
  if (s.includes('sexual')) return 'Expletive';
  if (s.includes('profanity') || s.includes('obscenity')) return 'Expletive';
  return 'Slang';
}

function splitList(str, separators = /[;,]+/) {
  return str
    .split(separators)
    .map(s => s.replace(/\s*\([^)]*\)/g, '').trim())
    .filter(Boolean);
}

// ─── main ─────────────────────────────────────────────────────────────────────

const inputPath  = process.argv[2] || path.join(__dirname, '../data/entries.csv');
const outputPath = process.argv[3] || path.join(__dirname, '../data/entries.json');

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  console.error('Usage: node scripts/csv-to-json.js [input.csv] [output.json]');
  process.exit(1);
}

const text = fs.readFileSync(inputPath, 'utf8');
const rows = parseCSV(text);
const [headerRow, ...dataRows] = rows;
const headers = headerRow.map(h => h.trim());

const colIndex = {};
headers.forEach((h, i) => { colIndex[h] = i; });

const get = (row, col) => (row[colIndex[col]] || '').trim();

// Track slugs to handle duplicates
const seenSlugs = {};

const entries = dataRows.map((row, idx) => {
  const term = get(row, 'Term');
  if (!term) return null;

  let slug = slugify(term);
  if (seenSlugs[slug]) {
    const franchise = get(row, 'Franchise');
    slug = slug + '-' + slugify(franchise).split('-')[0];
  }
  seenSlugs[slug] = true;

  const relatedRaw    = get(row, 'Related Words (Cross-Franchise)');
  const euphRaw       = get(row, 'Real-World Euphemisms');
  const exampleQuote  = get(row, 'Example Quote');
  const franchise     = get(row, 'Franchise');

  return {
    id:                     String(idx + 1),
    slug,
    term,
    englishEquivalent:      get(row, 'English Equivalent'),
    phoneticPronunciation:  get(row, 'Phonetic Pronunciation'),
    partOfSpeech:           get(row, 'Part of Speech').toLowerCase(),
    franchise,
    medium:                 normalizeMedium(get(row, 'Medium')),
    category:               normalizeCategory(get(row, 'Category')),
    severity:               normalizeSeverity(get(row, 'Severity')),
    notableSpeaker:         get(row, 'Notable Speaker'),
    firstAppearance:        get(row, 'First Appearance (Episode/Chapter/Issue)'),
    shortDescription:       get(row, 'Short Description'),
    etymologyNarrative:     get(row, 'Etymology (Narrative)'),
    semanticDriftTimeline:  get(row, 'Semantic Drift Timeline'),
    usageHistoryNarrative:  get(row, 'Usage History (Narrative)'),
    tabooTrajectoryNarrative: get(row, 'Taboo Trajectory (Narrative)'),
    regionalNotes:          get(row, 'Regional Notes (In-Universe)'),
    exampleQuote: {
      text:   exampleQuote,
      source: `${franchise}`,
    },
    relatedWords:         splitList(relatedRaw, /;+/),
    realWorldEuphemisms:  splitList(euphRaw, /[;,]+/),
  };
}).filter(Boolean);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(entries, null, 2), 'utf8');

console.log(`✓ Converted ${entries.length} entries → ${outputPath}`);
