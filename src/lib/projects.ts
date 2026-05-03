/**
 * projects.ts — Data access layer for projects.json
 *
 * Single Responsibility: Only handles reading & filtering project data.
 * Open/Closed: New filter predicates can be added without modifying existing ones.
 */

import type { Project, ProjectCategory } from "@/types";
import projectsData from "@/data/projects.json";

/** All projects, typed and sorted by date (newest first) */
export function getAllProjects(): Project[] {
  return (projectsData as Project[]).sort(
    (a, b) =>
      new Date(b.completionDate).getTime() -
      new Date(a.completionDate).getTime()
  );
}

/** Only projects marked `featured: true` */
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

/** Filter by category */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getAllProjects().filter((p) => p.category === category);
}

/** Filter by tech stack (match any) */
export function getProjectsByTech(tech: string): Project[] {
  return getAllProjects().filter((p) =>
    p.techStack.some((t) => t.toLowerCase() === tech.toLowerCase())
  );
}

/** Get unique categories present in the data */
export function getCategories(): ProjectCategory[] {
  const cats = new Set(getAllProjects().map((p) => p.category));
  return Array.from(cats);
}

/** Get unique tech stack items across all projects */
export function getAllTechStack(): string[] {
  const techs = new Set(getAllProjects().flatMap((p) => p.techStack));
  return Array.from(techs).sort();
}

/** Find a single project by slug */
export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
