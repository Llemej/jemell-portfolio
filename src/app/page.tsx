import Button from "@/components/atoms/Button";
import SectionHeading from "@/components/atoms/SectionHeading";
import ProjectCard from "@/components/molecules/ProjectCard";
import Timeline from "@/components/molecules/Timeline";
import { getFeaturedProjects } from "@/lib/projects";
import timelineData from "@/data/timeline.json";
import type { TimelineMilestone } from "@/types";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const milestones = timelineData as TimelineMilestone[];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__content">
          <span className="hero__greeting">👋 Hello, I&apos;m Jemell</span>
          <h1 className="hero__title">
            I build things for the{" "}
            <span className="hero__title-accent">modern web.</span>
          </h1>
          <p className="hero__subtitle">
            Frontend engineer &amp; intern documenting every sprint, audit, and
            deploy. Explore my work or read the weekly logs.
          </p>
          <div className="hero__actions">
            <Button href="/work" variant="primary" size="lg">
              View Work
            </Button>
            <Button href="/logs" variant="secondary" size="lg">
              Read Logs
            </Button>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ──────────────────────────── */}
      <section className="page-container" id="featured">
        <SectionHeading
          title="Featured Work"
          subtitle="Highlights from recent projects and internship activities."
        />
        <div className="featured-grid">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* ── Internship Timeline ────────────────────────── */}
      <section className="page-container" id="timeline">
        <SectionHeading
          title="Internship Timeline"
          subtitle="A chronological view of key milestones."
          align="center"
        />
        <Timeline milestones={milestones} />
      </section>
    </>
  );
}
