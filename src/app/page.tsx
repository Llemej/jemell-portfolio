import Button from "@/components/atoms/Button";
import SectionHeading from "@/components/atoms/SectionHeading";
import ProjectCard from "@/components/molecules/ProjectCard";
import Timeline from "@/components/molecules/Timeline";
import { getFeaturedProjects } from "@/lib/projects";
import timelineData from "@/data/timeline.json";
import type { TimelineMilestone } from "@/types";
import Image from "next/image";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const milestones = timelineData as TimelineMilestone[];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="hero__content hero__content--split">

          {/* LEFT — Profile Image */}
          <div className="hero__image-wrapper">
            <Image
              src="/images/pfp2.jpg"
              alt="Jemell — Frontend Engineer"
              width={300}
              height={300}
              priority
              className="hero__image"
            />
          </div>

          {/* RIGHT — Text */}
          <div className="hero__text">
            <span className="hero__greeting">👋 Hello, I&apos;m Jemell S. Presto
              
            </span>

            <div className="hero__subtitle" style={{ color: "var(--text)", fontWeight: 400, lineHeight: 1.6, textAlign: "left", maxWidth: "600px", margin: "0 auto 2rem" }}>
              <p style={{ marginBottom: "1rem", fontSize: "1.1rem", color: "white", fontWeight: 500 }}>
                I am a dedicated <strong>Frontend Engineer</strong> with a passion for turning ideas into reality through intuitive, dynamic, and visually striking web applications.
              </p>
              <p style={{ marginBottom: "1rem" }}>
                Over the course of my intensive internship, I&apos;ve had the opportunity to work on various real-world projects—ranging from developing comprehensive administrative dashboards for events like <strong>Ginoong Mapandan</strong> and <strong>PandanFest</strong>, to integrating complex AI Chatbot functionalities and Web3 features in <strong>Pandanchain</strong>.
              </p>
              <p>
                I thrive on tackling complex UI/UX challenges, implementing scalable design systems, and writing clean, maintainable code. My experience spans modern frameworks like React and Next.js, alongside integrations with Node.js and MongoDB. This portfolio serves as a living documentation of my technical growth, weekly milestones, and the solutions I&apos;ve engineered.
              </p>
            </div>
            <div className="hero__actions">
              <Button href="/work" variant="primary" size="lg">
                View Work
              </Button>
              <Button href="/logs" variant="secondary" size="lg">
                Read Logs
              </Button>
            </div>
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