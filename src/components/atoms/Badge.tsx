interface BadgeProps {
  label: string;
  variant?: "default" | "accent" | "outline";
  size?: "sm" | "md";
}

export default function Badge({ label, variant = "default", size = "sm" }: BadgeProps) {
  return (
    <span className={`badge badge--${variant} badge--${size}`}>
      {label}
    </span>
  );
}
