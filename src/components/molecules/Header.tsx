"use client";

import { useState } from "react";
import NavLink from "@/components/atoms/NavLink";
import type { NavLink as NavLinkType } from "@/types";

const NAV_LINKS: NavLinkType[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Logs", href: "/logs" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        {/* Logo */}
        <a href="/" className="header__logo" aria-label="Jemell — Home">
          <span className="header__logo-icon" aria-hidden="true">◆</span>
          <span className="header__logo-text">Jemell</span>
        </a>

        {/* Desktop nav */}
        <nav className="header__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="header__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          type="button"
        >
          <span className={`header__burger-line ${menuOpen ? "header__burger-line--open" : ""}`} />
          <span className={`header__burger-line ${menuOpen ? "header__burger-line--open" : ""}`} />
          <span className={`header__burger-line ${menuOpen ? "header__burger-line--open" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`header__mobile-menu ${menuOpen ? "header__mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} onClick={() => setMenuOpen(false)} />
          ))}
        </nav>
      </div>
    </header>
  );
}
