import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  external = false,
  className = "",
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} aria-label={ariaLabel} type="button">
      {children}
    </button>
  );
}
