import type { Project } from "@/types";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.completionDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short" }
  );

  return (
    <article className="project-card" id={`project-${project.slug}`}>
      {/* Gradient accent bar */}
      <div className="project-card__accent" aria-hidden="true" />

      {/* Project Image */}
      {project.image && (
        <div className="project-card__image-container">
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={340}
            className="project-card__image"
          />
        </div>
      )}

      <div className="project-card__body">
        {/* Header */}
        <div className="project-card__header">
          <Badge label={project.category} variant="accent" />
          <time className="project-card__date" dateTime={project.completionDate}>
            {formattedDate}
          </time>
        </div>

        {/* Content */}
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        {/* Tech stack */}
        <div className="project-card__tags">
          {project.techStack.map((tech) => (
            <Badge key={tech} label={tech} variant="outline" />
          ))}
        </div>

        {/* Actions */}
        <div className="project-card__actions">
          {project.liveUrl && (
            <Button href={project.liveUrl} external variant="primary" size="sm">
              Live Demo ↗
            </Button>
          )}
          {project.repoUrl && (
            <Button href={project.repoUrl} external variant="ghost" size="sm">
              Source Code
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

