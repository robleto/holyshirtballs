/*
  CategoryIcon — icon for each category using Lucide React.
  Color inherits from parent via currentColor.
*/

import { Megaphone, PiggyBank, Shirt, CookingPot, Church, Flame } from 'lucide-react';

type Category = 'Expletive' | 'Insult' | 'Euphemism' | 'Curse' | 'Oath' | 'Slang';

interface CategoryIconProps {
  category: Category | string;
  size?: number;
  className?: string;
}

const icons: Record<Category, React.ElementType> = {
  Expletive: Megaphone,
  // Closest Lucide match to "pig-head".
  Insult: PiggyBank,
  // Closest Lucide match to "lingerie".
  Euphemism: Shirt,
  Curse: CookingPot,
  Oath: Church,
  // Lucide has no pepper/chilli; flame reads as “spicy” slang.
  Slang: Flame,
};

export default function CategoryIcon({ category, size = 13, className = '' }: CategoryIconProps) {
  const Icon = icons[category as Category];
  if (!Icon) return null;
  return (
    <Icon
      size={size}
      className={`inline-block flex-shrink-0 ${className}`}
      aria-label={category}
      strokeWidth={1.8}
    />
  );
}
