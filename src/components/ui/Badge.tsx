import Link from 'next/link';
import type { Severity, Medium, Category } from '@/types/entry';
import MediumIcon from './MediumIcon';
import SeverityIcon from './SeverityIcon';
import CategoryIcon from './CategoryIcon';

type BadgeVariant = 'severity' | 'medium' | 'category' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  href?: string;
  icon?: React.ReactNode;
}

/*
  Badge color system (post-polish pass 2026-03-23).

  Restraint principle: only one badge type should carry strong color at a time.
  - Severity (sm cards): replaced by SeverityDot in the card header — the dot is
    sufficient signal and avoids another colored pill in an already-dense footer.
  - Severity (md detail page): retains full color — it's the primary classifier
    in the Classification sidebar, where only 3 badges appear with space to breathe.
  - Medium (md detail page): now neutral — it's descriptive metadata, not a status.
    Hue differentiation (blue/violet/pink/etc) added noise without adding meaning.
  - Category (md detail page): retains color — complements severity in the sidebar.
  - Neutral: the default for card footers — warm ink tint, readable without competing.

  Shape: pill (rounded-full) — consistent across all variants.
  Weight: font-semibold at sm (space-efficient), font-medium at md (more readable).
*/

const severityColors: Record<Severity, string> = {
  // Mild   — green: safe, gentle
  Mild:     'bg-emerald-50 text-emerald-800 border-emerald-200',
  // Moderate — blue: middle tier, clear but not severe
  Moderate: 'bg-blue-50 text-blue-800 border-blue-200',
  // Strong — gray/ink family
  Strong:   'bg-zinc-100 text-zinc-800 border-zinc-300',
  // Extreme — black/ink: highest severity
  Extreme:  'bg-[#1A1210] text-white border-[#1A1210]',
};

/*
  Medium: neutral warm palette regardless of medium type.
  Previously each medium had a unique hue (blue/violet/pink/amber/emerald/orange)
  creating a rainbow of competing colors in cards. The medium is descriptive context,
  not a status — it doesn't need semantic color coding. Neutral reads cleanly.
*/
const mediumNeutral = 'bg-[#F2EDEA] text-[#4A3F3A] border-[#D4CCC8]';

const categoryColors: Record<Category, string> = {
  // Categories retain color — they're the primary semantic classifier in the sidebar
  Expletive: 'bg-orange-50 text-orange-700 border-orange-200',
  Insult:    'bg-purple-50 text-purple-700 border-purple-200',
  Euphemism: 'bg-sky-50 text-sky-700 border-sky-200',
  Curse:     'bg-red-50 text-red-700 border-red-200',
  Oath:      'bg-indigo-50 text-indigo-700 border-indigo-200',
  Slang:     'bg-teal-50 text-teal-700 border-teal-200',
};

export default function Badge({ label, variant = 'neutral', size = 'sm', href, icon }: BadgeProps) {
  // Neutral: warm ink tint — the default surface for card-footer labels
  let colorClass = 'bg-[#F2EDEA] text-[#4A3F3A] border-[#D4CCC8]';

  if (variant === 'severity') {
    colorClass = severityColors[label as Severity] ?? colorClass;
  } else if (variant === 'medium') {
    // Medium always renders neutral — hue variation added noise, not meaning
    colorClass = mediumNeutral;
  } else if (variant === 'category') {
    colorClass = categoryColors[label as Category] ?? colorClass;
  }

  // sm = compact inline badge; md = classification panel badge
  const sizeClass = size === 'sm'
    ? 'px-2 py-0.5 text-xs font-semibold'
    : 'px-3 py-1 text-sm font-medium';

  const baseClass = `inline-flex items-center rounded-full border ${colorClass} ${sizeClass} leading-none`;
  const className = href
    ? `${baseClass} transition-[filter] duration-150 hover:brightness-95 cursor-pointer`
    : baseClass;

  const iconSize = size === 'sm' ? 12 : 14;
  const inferredIcon =
    variant === 'medium' ? <MediumIcon medium={label as Medium} size={iconSize} /> :
    variant === 'severity' ? <SeverityIcon severity={label as Severity} size={iconSize} /> :
    variant === 'category' ? <CategoryIcon category={label as Category} size={iconSize} /> :
    null;

  const contentIcon = icon ?? inferredIcon;
  const content = contentIcon ? (
    <>{contentIcon}<span className="ml-1">{label}</span></>
  ) : label;

  if (href) {
    return (
      <Link href={href} className={className} style={{ textDecoration: 'none' }}>
        {content}
      </Link>
    );
  }

  return (
    <span className={className}>
      {content}
    </span>
  );
}

/*
  SeverityDot — compact status indicator used in card headers.
  Solid dot only — no glow ring (the ring added visual noise without adding meaning;
  the solid color is sufficient signal at this small size).
*/
export function SeverityDot({ severity }: { severity: Severity }) {
  const dotColors: Record<Severity, string> = {
    Mild:     'bg-emerald-500',
    Moderate: 'bg-blue-500',
    Strong:   'bg-zinc-600',
    Extreme:  'bg-[#1A1210]',
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${dotColors[severity]}`}
      title={`Severity: ${severity}`}
      aria-label={`Severity: ${severity}`}
    />
  );
}
