# @#$! HolyShirtBalls

**The Definitive Archive of Fictional Profanity**

HolyShirtBalls is a lovingly maintained reference site for made-up swear words, curses, insults, euphemisms, and taboo expressions from every corner of film, TV, books, comics, and games.

Every entry is documented with etymology, usage history, semantic drift over time, in-universe regional notes, and the cultural trajectory that determines whether a word stays on-screen or escapes into the real world.

> The name is itself a reference: Eleanor Shellstrop's compound expletive from *The Good Place*, where the afterlife's architecture literally prevents articulation of real swear words.

---

## Features

- **171+ entries** across dozens of franchises (and growing)
- **Full-text search** across terms, franchises, and example quotes
- **Filter by** medium, category, severity, and franchise
- **URL-based filter state** so searches can be shared
- **Entry detail pages** with etymology, timeline, usage history, and related entries
- **Static site export** — deployable to Vercel, Netlify, or any static host
- **Community-maintained** via pull requests

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/holyshirtballs.git
cd holyshirtballs
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm run start
```

### Static Export (for Netlify/Vercel)

Uncomment `output: 'export'` in `next.config.js`, then:

```bash
npm run build
```

The static site is output to the `out/` directory.

---

## Data

All entries live in [`data/entries.json`](data/entries.json). Each entry follows the schema defined in [`src/types/entry.ts`](src/types/entry.ts).

### Converting a CSV

If you have entries in CSV format (matching the expected column headers), run:

```bash
node scripts/csv-to-json.js data/entries.csv data/entries.json
```

See the script for expected column names.

### Validating entries

```bash
node scripts/validate-entries.js
```

This checks all required fields, valid enum values, and duplicate slugs. Run this before opening a PR.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contribution guide.

The short version:
1. Fork the repo
2. Add your entry to `data/entries.json`
3. Run `node scripts/validate-entries.js`
4. Open a pull request

---

## Project Structure

```
holyshirtballs/
├── data/
│   ├── entries.json       ← All entry data (source of truth)
│   └── entries.csv        ← Original CSV source (for reference)
├── scripts/
│   ├── csv-to-json.js     ← CSV → JSON converter
│   └── validate-entries.js ← Entry validator
├── src/
│   ├── types/
│   │   └── entry.ts       ← TypeScript interfaces
│   ├── lib/
│   │   └── entries.ts     ← Data access utilities
│   ├── components/
│   │   ├── layout/        ← Header, Footer
│   │   ├── ui/            ← Badge, Button primitives
│   │   └── *.tsx          ← Feature components
│   ├── pages/
│   │   ├── index.tsx      ← Homepage
│   │   ├── browse.tsx     ← Browse/filter page
│   │   ├── entry/[slug].tsx ← Entry detail
│   │   ├── about.tsx
│   │   └── contribute.tsx
│   └── styles/
│       └── globals.css
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## Tech Stack

- [Next.js 14](https://nextjs.org) (Pages Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- Local JSON data (no database required)

---

## License

MIT. All fictional profanity reproduced here belongs to its respective creators and is included for educational and archival purposes.
