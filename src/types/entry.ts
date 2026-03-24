export type Medium = 'TV' | 'Film' | 'Book' | 'Comic' | 'Game' | 'Animation';
export type Category = 'Expletive' | 'Insult' | 'Euphemism' | 'Curse' | 'Oath' | 'Slang';
export type Severity = 'Mild' | 'Moderate' | 'Strong' | 'Extreme';
export type PartOfSpeech =
  | 'expletive'
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'interjection'
  | 'compound noun'
  | 'exclamation'
  | 'insult'
  | 'phrase';

export interface SemanticDriftEntry {
  period: string;
  meaning: string;
}

export interface ExampleQuote {
  text: string;
  source: string;
}

export interface Entry {
  id: string;
  slug: string;
  term: string;
  englishEquivalent: string;
  phoneticPronunciation: string;
  partOfSpeech: PartOfSpeech | string;
  franchise: string;
  medium: Medium;
  category: Category;
  severity: Severity;
  notableSpeaker: string;
  firstAppearance: string;
  shortDescription: string;
  etymologyNarrative: string;
  semanticDriftTimeline: SemanticDriftEntry[] | string;
  usageHistoryNarrative: string;
  tabooTrajectoryNarrative: string;
  regionalNotes: string;
  exampleQuote: ExampleQuote;
  relatedWords: string[]; // slugs of related entries
  realWorldEuphemisms: string[];
}

// Filters & sort options used on the browse page
export interface BrowseFilters {
  search: string;
  medium: Medium | '';
  category: Category | '';
  severity: Severity | '';
  franchise: string;
  sort: 'alpha' | 'franchise' | 'severity';
}
