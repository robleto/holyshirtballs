/*
  MediumIcon — icon for each medium type using Lucide React.
  Color inherits from parent via currentColor.
*/

import { Tv, Clapperboard, BookOpen, VenetianMask, Gamepad2, Play } from 'lucide-react';

type Medium = 'TV' | 'Film' | 'Book' | 'Comic' | 'Game' | 'Animation';

interface MediumIconProps {
  medium: Medium | string;
  size?: number;
  className?: string;
}

const icons: Record<Medium, React.ElementType> = {
  TV: Tv,
  Film: Clapperboard,
  Book: BookOpen,
  Comic: VenetianMask,
  Game: Gamepad2,
  Animation: Play,
};

export default function MediumIcon({ medium, size = 14, className = '' }: MediumIconProps) {
  const Icon = icons[medium as Medium];
  if (!Icon) return null;
  return (
    <Icon
      size={size}
      className={`inline-block flex-shrink-0 ${className}`}
      aria-label={medium}
      strokeWidth={1.5}
    />
  );
}
