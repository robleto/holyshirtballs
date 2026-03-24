import Link from 'next/link';
import MediumIcon from '@/components/ui/MediumIcon';
import CategoryIcon from '@/components/ui/CategoryIcon';
import SeverityIcon from '@/components/ui/SeverityIcon';

/* ── Shared description copy ─────────────────────────────────────────────── */

export const MEDIUM_DESC: Record<string, string> = {
  TV:        'Writers who needed authenticity without network clearance built their own vocabulary.',
  Film:      'Fictional profanity in film earns its place by making a world feel real.',
  Book:      "Without an actor's delivery, the invented word has to earn its power on the page alone.",
  Comic:     'The vocabulary tends toward the punchy, typographically distinctive, and memorably brief.',
  Game:      'An invented curse in a game world is a flag that says this civilization has history.',
  Animation: 'Safe for the room, loaded with meaning for anyone paying closer attention.',
};

export const CATEGORY_DESC: Record<string, string> = {
  Expletive: 'Pure emotional discharge — lands before a reader even knows what it signifies.',
  Insult:    'Reveals social hierarchies: who can be degraded, and in what terms.',
  Euphemism: "Shows what a society acknowledges but can't bring itself to say directly.",
  Curse:     'Carries structure, weight, and usually a mythology. Tells you what a world fears.',
  Oath:      "What characters swear by — a shortcut to a fiction's cosmology.",
  Slang:     'Signals in-group membership. Ages fastest. Most likely to escape into real life.',
};

export const SEVERITY_DESC: Record<string, string> = {
  Mild:     'The words you can say in front of your parents.',
  Moderate: 'Strong enough to carry weight, acceptable enough to air before the watershed.',
  Strong:   'Words with genuine edge — they land hard on characters and audiences both.',
  Extreme:  'Reserved for the worst moments. Reveals what a society considers truly unspeakable.',
};

export const CATEGORY_COLORS: Record<string, string> = {
  Expletive: '#C2410C',
  Insult:    '#7E22CE',
  Euphemism: '#0369A1',
  Curse:     '#B91C1C',
  Oath:      '#3730A3',
  Slang:     '#0F766E',
};

export const SEVERITY_COLORS: Record<string, string> = {
  Mild:     '#065F46',
  Moderate: '#92400E',
  Strong:   '#C2410C',
  Extreme:  '#991B1B',
};

/* ── TaxCard ─────────────────────────────────────────────────────────────── */

interface TaxCardProps {
  href: string;
  type: 'medium' | 'category' | 'severity';
  name: string;
  description: string;
  count: number;
}

export default function TaxCard({ href, type, name, description, count }: TaxCardProps) {
  const accentColor =
    type === 'category' ? (CATEGORY_COLORS[name] ?? '#F55D35') :
    type === 'severity' ? (SEVERITY_COLORS[name] ?? '#F55D35') :
    '#F55D35';

  const icon =
    type === 'medium'   ? <MediumIcon medium={name} size={18} /> :
    type === 'category' ? <CategoryIcon category={name} size={18} /> :
    <SeverityIcon severity={name} size={18} />;

  return (
    <Link
      href={href}
      className="group block rounded-[1.25rem] bg-white p-5 border transition-[border-color,box-shadow,transform] duration-200 ease-in-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
      style={{ borderColor: '#F2EDEA', boxShadow: '0 1px 3px rgba(26,18,16,0.06)' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(245,93,53,0.35)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(26,18,16,0.10)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '#F2EDEA';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(26,18,16,0.06)';
      }}
    >
      <div className="flex items-center gap-2 mb-2" style={{ color: accentColor }}>
        {icon}
        <span className="font-display font-extrabold text-lg leading-none">{name}</span>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: '#6B5E58' }}>
        {description}
      </p>
      <p className="text-xs font-semibold" style={{ color: '#B0A49E' }}>
        {count} {count === 1 ? 'entry' : 'entries'}
      </p>
    </Link>
  );
}
