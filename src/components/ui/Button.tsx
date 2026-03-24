import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

/*
  Button system — radius unified to rounded-xl (16px) to match card/input scale.
  Previously used rounded-lg (12px) which felt slightly too tight for the site's
  editorial warmth. All shadows use warm-tinted values from the CSS custom properties.

  Hover states are 10% darker than base — intentional, not just Tailwind -600 default.
*/

const base = [
  'inline-flex items-center justify-center gap-2',
  'font-semibold rounded-xl',                        // Unified radius — matches card family
  'transition-all duration-150',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed',
].join(' ');

const variants = {
  // Primary — coral brand color, warm shadow
  primary: [
    'bg-[#F55D35] text-white',
    'hover:bg-[#D94A22]',
    'focus:ring-[#F55D35]',
    'shadow-sm hover:shadow-md',
  ].join(' '),

  // Secondary — deep violet, clean
  secondary: [
    'bg-[#6D28D9] text-white',
    'hover:bg-[#5B21B6]',
    'focus:ring-[#6D28D9]',
    'shadow-sm',
  ].join(' '),

  // Ghost — transparent, no border, for navigation-adjacent actions
  ghost: [
    'text-[#4A3F3A]',
    'hover:bg-[#FFF4EE] hover:text-[#F55D35]',
    'focus:ring-[#D4CCC8]',
  ].join(' '),

  // Outline — warm border, no fill
  outline: [
    'border border-[#D4CCC8] bg-white text-[#4A3F3A]',
    'hover:border-[#F55D35] hover:text-[#F55D35] hover:bg-[#FFF4EE]',
    'focus:ring-[#D4CCC8]',
  ].join(' '),
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2 text-sm',      // Slightly more horizontal padding than before
  lg: 'px-7 py-3 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
