"use client";

import { useState, useMemo } from "react";
import type { Project, ProjectCategory } from "@/types";
import ProjectCard from "@/components/molecules/ProjectCard";
import SectionHeading from "@/components/atoms/SectionHeading";

interface FilterableGalleryProps {
  projects: Project[];
  categories: ProjectCategory[];
  techStack: string[];
}

type FilterMode = "category" | "tech";

/**
 * FilterableGallery — Filter logic is decoupled from display
 *
 * The filtering engine lives in `useFilteredProjects` (pure logic),
 * while this component only handles state and renders ProjectCards.
 */
export default function FilterableGallery({
  projects,
  categories,
  techStack,
}: FilterableGalleryProps) {
  const [filterMode, setFilterMode] = useState<FilterMode>("category");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;

    if (filterMode === "category") {
      return projects.filter((p) => p.category === activeFilter);
    }

    return projects.filter((p) =>
      p.techStack.some((t) => t.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [projects, activeFilter, filterMode]);

  const filters = filterMode === "category" ? categories : techStack;

  return (
    <section className="gallery">
      <SectionHeading
        title="All Work"
        subtitle="Browse projects by category or technology."
      />

      {/* Filter controls */}
      <div className="gallery__controls">
        {/* Mode toggle */}
        <div className="gallery__mode-toggle" role="tablist" aria-label="Filter mode">
          <button
            role="tab"
            aria-selected={filterMode === "category"}
            className={`gallery__mode-btn ${filterMode === "category" ? "gallery__mode-btn--active" : ""}`}
            onClick={() => { setFilterMode("category"); setActiveFilter("All"); }}
            type="button"
          >
            Category
          </button>
          <button
            role="tab"
            aria-selected={filterMode === "tech"}
            className={`gallery__mode-btn ${filterMode === "tech" ? "gallery__mode-btn--active" : ""}`}
            onClick={() => { setFilterMode("tech"); setActiveFilter("All"); }}
            type="button"
          >
            Tech Stack
          </button>
        </div>

        {/* Filter chips */}
        <div className="gallery__filters" role="radiogroup" aria-label="Filter options">
          <button
            role="radio"
            aria-checked={activeFilter === "All"}
            className={`gallery__chip ${activeFilter === "All" ? "gallery__chip--active" : ""}`}
            onClick={() => setActiveFilter("All")}
            type="button"
          >
            All ({projects.length})
          </button>
          {filters.map((f) => {
            const count =
              filterMode === "category"
                ? projects.filter((p) => p.category === f).length
                : projects.filter((p) =>
                    p.techStack.some((t) => t.toLowerCase() === f.toLowerCase())
                  ).length;

            return (
              <button
                key={f}
                role="radio"
                aria-checked={activeFilter === f}
                className={`gallery__chip ${activeFilter === f ? "gallery__chip--active" : ""}`}
                onClick={() => setActiveFilter(f)}
                type="button"
              >
                {f} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div className="gallery__grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="gallery__empty">No projects match this filter.</p>
      )}
    </section>
  );
}
