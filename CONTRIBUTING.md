# Contributing to HolyShirtBalls

Thank you for helping grow the archive! This guide covers everything you need to add a new entry.

---

## Before You Start

1. Check [`/browse`](https://holyshirtballs.fyi/browse) or search `data/entries.json` to confirm the entry doesn't already exist.
2. Entries must be **fictional profanity** — words invented by writers for fictional universes. Real-world slang, however colourful, is out of scope.
3. The entry must have a **documented source** (specific episode, chapter, issue number, etc.).

---

## Adding an Entry

### 1. Fork and clone

```bash
git clone https://github.com/your-username/holyshirtballs.git
cd holyshirtballs
npm install
```

### 2. Add your entry to `data/entries.json`

Append a new object to the JSON array. Set `id` to the next integer after the last entry (as a string).

```json
{
  "id": "172",
  "slug": "your-term",
  "term": "YourTerm",
  "englishEquivalent": "Fuck / Shit / Damn",
  "phoneticPronunciation": "YOUR-term",
  "partOfSpeech": "expletive",
  "franchise": "Franchise Name",
  "medium": "TV",
  "category": "Expletive",
  "severity": "Moderate",
  "notableSpeaker": "Character Name",
  "firstAppearance": "S01E03 'Episode Title' (Year)",
  "shortDescription": "One to two sentences: what it means, who uses it, and why it matters. Tone: playful and precise.",
  "etymologyNarrative": "How the word was invented. In-universe logic and/or real-world creative decision.",
  "semanticDriftTimeline": "How the word's meaning or intensity shifted over the run of the property.",
  "usageHistoryNarrative": "Who uses it, how frequently, in what emotional registers.",
  "tabooTrajectoryNarrative": "How transgressive is it, and has that changed over time?",
  "regionalNotes": "Any in-universe regional or species-based variations.",
  "exampleQuote": {
    "text": "The exact quote from the source material.",
    "source": "Character Name, Franchise S01E03"
  },
  "relatedWords": ["slug-of-related-entry"],
  "realWorldEuphemisms": ["fudge", "shoot"]
}
```

### 3. Validate

```bash
node scripts/validate-entries.js
```

Fix any errors before proceeding.

### 4. Run the dev server

```bash
npm run dev
```

Navigate to `http://localhost:3000/entry/your-term` to preview your entry.

### 5. Open a pull request

Push your branch and open a PR against `main`. Include:
- The franchise and medium
- A brief note on why this entry deserves a place in the archive

---

## Field Reference

| Field | Required | Type | Notes |
|-------|----------|------|-------|
| `id` | ✓ | string | Next integer after the last entry |
| `slug` | ✓ | string | Lowercase, hyphens only, URL-safe |
| `term` | ✓ | string | Canonical spelling from source material |
| `englishEquivalent` | ✓ | string | Closest real-world equivalent |
| `phoneticPronunciation` | ✓ | string | Stressed syllables in caps, e.g. `FRAK` |
| `partOfSpeech` | ✓ | string | expletive, noun, verb, adjective, phrase, etc. |
| `franchise` | ✓ | string | Match existing franchise names exactly where possible |
| `medium` | ✓ | enum | `TV` \| `Film` \| `Book` \| `Comic` \| `Game` \| `Animation` |
| `category` | ✓ | enum | `Expletive` \| `Insult` \| `Euphemism` \| `Curse` \| `Oath` \| `Slang` |
| `severity` | ✓ | enum | `Mild` \| `Moderate` \| `Strong` \| `Extreme` |
| `notableSpeaker` | ✓ | string | The character most associated with the word |
| `firstAppearance` | ✓ | string | As specific as possible: episode, chapter, issue |
| `shortDescription` | ✓ | string | ≤ 200 chars; punchy, editorial tone |
| `etymologyNarrative` | ✓ | string | Full paragraph; in-universe and/or real-world origin |
| `semanticDriftTimeline` | ✓ | string | How the word's meaning/intensity changed over time |
| `usageHistoryNarrative` | ✓ | string | Usage patterns across the source material |
| `tabooTrajectoryNarrative` | ✓ | string | Its transgressive arc |
| `regionalNotes` | ✓ | string | In-universe dialect/regional variations (use "None documented" if none) |
| `exampleQuote.text` | ✓ | string | Direct quote from source material |
| `exampleQuote.source` | ✓ | string | Attribution: character and episode/chapter |
| `relatedWords` | ✓ | string[] | Slugs of related archive entries (can be `[]`) |
| `realWorldEuphemisms` | ✓ | string[] | Real words serving similar function (can be `[]`) |

---

## Style Guide

- **Tone:** Playful, precise, and earnest. Think: scholarly reference guide written by someone who genuinely loves this material.
- **Present tense** for in-universe descriptions: "Frak functions as..." not "Frak functioned as..."
- **Avoid Wikipedia-ism:** Don't write "The word frak is a fictional expletive that appears in..." — just say "The most versatile swear word in the Twelve Colonies."
- **Be specific:** "Season 1" is okay; "S01E03 'Water'" is better.
- **Narrative fields** should read like engaging encyclopedia entries, not bullet lists.
- **No real-world profanity** in example quotes unless it's the established in-universe form.

---

## Review Criteria

PRs will be reviewed for:
- Completeness (all required fields populated)
- Accuracy (correct franchise, first appearance, speaker)
- Tone consistency with existing entries
- Passing validation script

Questions? Open a discussion on the GitHub repository.
