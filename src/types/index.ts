// ============================================================
// Type Definitions — Single source of truth for all data shapes
// ============================================================

/** Categories that classify each project / activity */
export type ProjectCategory =
  | "SEO Audit"
  | "Frontend"
  | "Backend"
  | "Research"
  | "UI/UX"
  | "DevOps"
  | "Full-Stack";

/** A single project / internship activity */
export interface Project {
  /** URL-safe identifier (kebab-case) */
  slug: string;
  title: string;
  description: string;
  /** Technologies used */
  techStack: string[];
  /** ISO-8601 date string (YYYY-MM-DD) */
  completionDate: string;
  category: ProjectCategory;
  /** Whether to highlight on the Home page */
  featured: boolean;
  /** Optional link to live demo */
  liveUrl?: string;
  /** Optional link to source code */
  repoUrl?: string;
  /** Relative path inside /public, e.g. "/images/projects/foo.webp" */
  image?: string;
}

/** Front-matter parsed from a Markdown log file */
export interface LogFrontMatter {
  title: string;
  /** ISO-8601 date string */
  date: string;
  /** Short summary shown in the listing */
  excerpt: string;
  /** Tags for categorisation */
  tags: string[];
  /** Week number in the internship */
  week: number;
}

/** A fully resolved log entry (front-matter + rendered body) */
export interface LogEntry extends LogFrontMatter {
  /** The URL slug derived from the filename */
  slug: string;
  /** Raw Markdown body (without front-matter) */
  content: string;
}

/** Props shared by every page that receives params from the router */
export interface SlugParams {
  params: Promise<{ slug: string }>;
}

/** Nav link descriptor used by the header / footer */
export interface NavLink {
  label: string;
  href: string;
}

/** Timeline milestone for the Home page */
export interface TimelineMilestone {
  date: string;
  title: string;
  description: string;
  icon?: string;
}
