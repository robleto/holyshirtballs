/*
  SeverityIcon — icon for each severity tier using Lucide React.
  Color inherits from parent via currentColor.
*/

import { Circle, Square, Diamond } from 'lucide-react';

type Severity = 'Mild' | 'Moderate' | 'Strong' | 'Extreme';

interface SeverityIconProps {
  severity: Severity | string;
  size?: number;
  className?: string;
}

const icons: Record<Severity, React.ElementType> = {
  Mild: Circle,
  Moderate: Square,
  Strong: Diamond,
  Extreme: Diamond,
};

export default function SeverityIcon({ severity, size = 13, className = '' }: SeverityIconProps) {
  const Icon = icons[severity as Severity];
  if (!Icon) return null;
  return (
    <Icon
      size={size}
      className={`inline-block flex-shrink-0 ${className}`}
      aria-label={severity}
      strokeWidth={1.8}
    />
  );
}
