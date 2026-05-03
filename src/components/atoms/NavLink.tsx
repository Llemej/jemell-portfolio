"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink as NavLinkType } from "@/types";

interface NavLinkProps extends NavLinkType {
  onClick?: () => void;
}

export default function NavLink({ label, href, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link ${isActive ? "nav-link--active" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      <span className="nav-link__indicator" />
    </Link>
  );
}
