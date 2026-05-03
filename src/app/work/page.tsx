import type { Metadata } from "next";
import FilterableGallery from "@/components/molecules/FilterableGallery";
import { getAllProjects, getCategories, getAllTechStack } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Browse all internship projects filtered by category or tech stack.",
};

export default function WorkPage() {
  const projects = getAllProjects();
  const categories = getCategories();
  const techStack = getAllTechStack();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="section-heading__title" style={{ marginBottom: "0.4rem" }}>
          Work
        </h1>
        <p className="section-heading__subtitle">
          Every project, audit, and experiment from the internship — filterable
          by category or technology.
        </p>
      </div>

      <FilterableGallery
        projects={projects}
        categories={categories}
        techStack={techStack}
      />
    </div>
  );
}
