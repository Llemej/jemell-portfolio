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
        <a href="/" className="header__logo" aria-label="Home" style={{ justifySelf: "start" }}>
          <span className="header__logo-icon" aria-hidden="true">◆</span>
          <span className="header__logo-text" style={{ fontWeight: 700 }}>
            Jemell
          </span>
        </a>

        {/* Desktop nav */}
        <div style={{ justifySelf: "center", display: "flex", justifyContent: "center" }}>
          <nav className="header__nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>

        {/* Right side (Intern text + Mobile hamburger) */}
        <div style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="header__role" style={{ fontSize: "0.8rem", letterSpacing: "0.05em", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
            INTERN @MAKERSPACE INNOVHUB
          </span>
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
