import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/atoms/Badge";
import { getAllLogSlugs, getLogBySlug } from "@/lib/logs";
import { markdownToHtml } from "@/lib/markdown";
import { notFound } from "next/navigation";

/* ── Static params for ISR / SSG ─────────────────────────── */
export async function generateStaticParams() {
  const slugs = getAllLogSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ── Dynamic metadata for SEO ────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const log = getLogBySlug(slug);
  if (!log) return { title: "Log Not Found" };

  return {
    title: log.title,
    description: log.excerpt,
    openGraph: {
      title: log.title,
      description: log.excerpt,
      type: "article",
      publishedTime: log.date,
    },
  };
}

/* ── Page Component ──────────────────────────────────────── */
export default async function LogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const log = getLogBySlug(slug);

  if (!log) notFound();

  const htmlContent = markdownToHtml(log.content);
  const formattedDate = new Date(log.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="page-container">
      <Link href="/logs" className="back-link">
        ← Back to Logs
      </Link>

      {/* Meta header */}
      <div className="log-meta">
        <h1 className="log-meta__title">{log.title}</h1>
        <div className="log-meta__info">
          <time className="log-meta__date" dateTime={log.date}>
            {formattedDate}
          </time>
          <span style={{ color: "var(--text-dim)" }}>·</span>
          <span style={{ color: "var(--accent-light)", fontWeight: 600, fontSize: "0.85rem" }}>
            Week {log.week}
          </span>
          <div className="log-meta__tags">
            {log.tags.map((tag) => (
              <Badge key={tag} label={tag} variant="outline" size="sm" />
            ))}
          </div>
        </div>
      </div>

      {/* Rendered Markdown */}
      <article
        className="log-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
