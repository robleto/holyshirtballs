import type { Severity, Medium, Category } from '@/types/entry';

type BadgeVariant = 'severity' | 'medium' | 'category' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const severityColors: Record<Severity, string> = {
  Mild:     'bg-emerald-100 text-emerald-800 border-emerald-200',
  Moderate: 'bg-amber-100 text-amber-800 border-amber-200',
  Strong:   'bg-orange-100 text-orange-800 border-orange-200',
  Extreme:  'bg-red-100 text-red-800 border-red-200',
};

const mediumColors: Record<Medium, string> = {
  TV:        'bg-blue-100 text-blue-800 border-blue-200',
  Film:      'bg-purple-100 text-purple-800 border-purple-200',
  Book:      'bg-amber-100 text-amber-800 border-amber-200',
  Comic:     'bg-pink-100 text-pink-800 border-pink-200',
  Game:      'bg-emerald-100 text-emerald-800 border-emerald-200',
  Animation: 'bg-orange-100 text-orange-800 border-orange-200',
};

const categoryColors: Record<Category, string> = {
  Expletive: 'bg-red-50 text-red-700 border-red-200',
  Insult:    'bg-purple-50 text-purple-700 border-purple-200',
  Euphemism: 'bg-sky-50 text-sky-700 border-sky-200',
  Curse:     'bg-rose-50 text-rose-700 border-rose-200',
  Oath:      'bg-indigo-50 text-indigo-700 border-indigo-200',
  Slang:     'bg-teal-50 text-teal-700 border-teal-200',
};

export default function Badge({ label, variant = 'neutral', size = 'sm' }: BadgeProps) {
  let colorClass = 'bg-gray-100 text-gray-700 border-gray-200';

  if (variant === 'severity') {
    colorClass = severityColors[label as Severity] ?? colorClass;
  } else if (variant === 'medium') {
    colorClass = mediumColors[label as Medium] ?? colorClass;
  } else if (variant === 'category') {
    colorClass = categoryColors[label as Category] ?? colorClass;
  }

  const sizeClass = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${colorClass} ${sizeClass}`}
    >
      {label}
    </span>
  );
}

// Convenience severity dot indicator
export function SeverityDot({ severity }: { severity: Severity }) {
  const dotColors: Record<Severity, string> = {
    Mild:     'bg-emerald-400',
    Moderate: 'bg-amber-400',
    Strong:   'bg-orange-500',
    Extreme:  'bg-red-500',
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${dotColors[severity]}`}
      title={severity}
    />
  );
}
