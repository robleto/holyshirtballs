import type { Severity, Medium, Category } from '@/types/entry';

type BadgeVariant = 'severity' | 'medium' | 'category' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

/*
  Badge color system — each semantic group uses a distinct hue family.
  Backgrounds are very light tints; borders add a subtle mid-tone ring;
  text is a deeper shade for contrast (WCAG AA on white/parchment).

  Shape: pill (rounded-full) — consistent across all variants.
  Weight: font-semibold at sm, font-medium at md.
*/

const severityColors: Record<Severity, string> = {
  // Mild   — emerald: safe, gentle
  Mild:     'bg-emerald-50 text-emerald-800 border-emerald-200 ring-1 ring-emerald-100',
  // Moderate — amber: warm caution
  Moderate: 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-100',
  // Strong — brand coral-orange family (cohesion with primary)
  Strong:   'bg-orange-50 text-orange-800 border-orange-200 ring-1 ring-orange-100',
  // Extreme — clear red signal
  Extreme:  'bg-red-50 text-red-800 border-red-200 ring-1 ring-red-100',
};

const mediumColors: Record<Medium, string> = {
  // Each medium has its own distinct hue — clear at-a-glance scanning
  TV:        'bg-blue-50 text-blue-800 border-blue-200 ring-1 ring-blue-100',
  Film:      'bg-violet-50 text-violet-800 border-violet-200 ring-1 ring-violet-100',
  Book:      'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-100',
  Comic:     'bg-pink-50 text-pink-800 border-pink-200 ring-1 ring-pink-100',
  Game:      'bg-emerald-50 text-emerald-800 border-emerald-200 ring-1 ring-emerald-100',
  Animation: 'bg-orange-50 text-orange-800 border-orange-200 ring-1 ring-orange-100',
};

const categoryColors: Record<Category, string> = {
  // Categories use slightly more muted backgrounds than mediums — they're secondary metadata
  Expletive: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-100',
  Insult:    'bg-purple-50 text-purple-700 border-purple-200 ring-1 ring-purple-100',
  Euphemism: 'bg-sky-50 text-sky-700 border-sky-200 ring-1 ring-sky-100',
  Curse:     'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-100',
  Oath:      'bg-indigo-50 text-indigo-700 border-indigo-200 ring-1 ring-indigo-100',
  Slang:     'bg-teal-50 text-teal-700 border-teal-200 ring-1 ring-teal-100',
};

export default function Badge({ label, variant = 'neutral', size = 'sm' }: BadgeProps) {
  // Neutral fallback — warm ink tint, not cool gray
  let colorClass = 'bg-[#F2EDEA] text-[#4A3F3A] border-[#D4CCC8] ring-1 ring-[#EAE4E0]';

  if (variant === 'severity') {
    colorClass = severityColors[label as Severity] ?? colorClass;
  } else if (variant === 'medium') {
    colorClass = mediumColors[label as Medium] ?? colorClass;
  } else if (variant === 'category') {
    colorClass = categoryColors[label as Category] ?? colorClass;
  }

  // sm = compact inline badge; md = classification panel badge
  const sizeClass = size === 'sm'
    ? 'px-2 py-0.5 text-xs font-semibold'
    : 'px-3 py-1 text-sm font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-full border ${colorClass} ${sizeClass} leading-none`}
    >
      {label}
    </span>
  );
}

/*
  SeverityDot — compact status indicator used in card headers.
  Slightly richer colors than default Tailwind to pop on warm parchment.
*/
export function SeverityDot({ severity }: { severity: Severity }) {
  const dotColors: Record<Severity, string> = {
    Mild:     'bg-emerald-500',
    Moderate: 'bg-amber-500',
    Strong:   'bg-orange-500',
    Extreme:  'bg-red-500',
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${dotColors[severity]}`}
      title={`Severity: ${severity}`}
      aria-label={`Severity: ${severity}`}
    />
  );
}
