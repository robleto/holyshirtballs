interface LogoIconProps {
  size?: number;
  className?: string;
}

/*
  Filled logomark — solid coral speech bubble with white exclamation mark.
  Mirrors the favicon treatment: filled silhouette, not an outline stroke icon.
  Used in Header and Footer in place of the Lucide MessageSquareWarning (outline).
*/
export default function LogoIcon({ size = 22, className }: LogoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#F55D35"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {/* Filled speech bubble with bottom-left tail */}
      <path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7.414L2 22.414V4z" />
      {/* White exclamation — body */}
      <rect x="11" y="7" width="2" height="5" rx="1" fill="white" />
      {/* White exclamation — dot */}
      <rect x="11" y="14" width="2" height="2" rx="1" fill="white" />
    </svg>
  );
}
