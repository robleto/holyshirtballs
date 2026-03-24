/**
 * Entry validation script.
 * Run: node scripts/validate-entries.js
 *
 * Checks every entry in data/entries.json against the expected schema.
 * Exits with code 1 if any errors are found.
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_STRINGS = [
  'id', 'slug', 'term', 'englishEquivalent', 'phoneticPronunciation',
  'partOfSpeech', 'franchise', 'notableSpeaker', 'firstAppearance',
  'shortDescription', 'etymologyNarrative', 'usageHistoryNarrative',
  'tabooTrajectoryNarrative', 'regionalNotes',
];

const VALID_MEDIUMS    = ['TV', 'Film', 'Book', 'Comic', 'Game', 'Animation'];
const VALID_CATEGORIES = ['Expletive', 'Insult', 'Euphemism', 'Curse', 'Oath', 'Slang'];
const VALID_SEVERITIES = ['Mild', 'Moderate', 'Strong', 'Extreme'];

const entriesPath = path.join(__dirname, '../data/entries.json');
const entries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));

let errors = 0;

entries.forEach((entry, i) => {
  const label = `Entry ${i + 1} (${entry.term || 'UNKNOWN'})`;

  for (const field of REQUIRED_STRINGS) {
    if (!entry[field] || typeof entry[field] !== 'string') {
      console.error(`${label}: missing or invalid field "${field}"`);
      errors++;
    }
  }

  if (!VALID_MEDIUMS.includes(entry.medium)) {
    console.error(`${label}: invalid medium "${entry.medium}" (valid: ${VALID_MEDIUMS.join(', ')})`);
    errors++;
  }

  if (!VALID_CATEGORIES.includes(entry.category)) {
    console.error(`${label}: invalid category "${entry.category}"`);
    errors++;
  }

  if (!VALID_SEVERITIES.includes(entry.severity)) {
    console.error(`${label}: invalid severity "${entry.severity}"`);
    errors++;
  }

  if (!entry.exampleQuote || typeof entry.exampleQuote.text !== 'string') {
    console.error(`${label}: exampleQuote.text must be a string`);
    errors++;
  }

  if (!Array.isArray(entry.relatedWords)) {
    console.error(`${label}: relatedWords must be an array`);
    errors++;
  }

  if (!Array.isArray(entry.realWorldEuphemisms)) {
    console.error(`${label}: realWorldEuphemisms must be an array`);
    errors++;
  }
});

// Check for duplicate slugs
const slugs = entries.map(e => e.slug);
const seenSlugs = {};
slugs.forEach((slug, i) => {
  if (seenSlugs[slug] !== undefined) {
    console.error(`Duplicate slug "${slug}" at entries ${seenSlugs[slug] + 1} and ${i + 1}`);
    errors++;
  }
  seenSlugs[slug] = i;
});

if (errors === 0) {
  console.log(`✓ All ${entries.length} entries are valid.`);
  process.exit(0);
} else {
  console.error(`\n✗ Found ${errors} error(s). Please fix before committing.`);
  process.exit(1);
}
