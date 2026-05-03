import Link from "next/link";
import type { LogEntry } from "@/types";
import Badge from "@/components/atoms/Badge";

interface LogCardProps {
  log: LogEntry;
}

export default function LogCard({ log }: LogCardProps) {
  const formattedDate = new Date(log.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/logs/${log.slug}`} className="log-card" id={`log-${log.slug}`}>
      <div className="log-card__week">
        <span className="log-card__week-label">Week</span>
        <span className="log-card__week-number">{log.week}</span>
      </div>

      <div className="log-card__body">
        <time className="log-card__date" dateTime={log.date}>
          {formattedDate}
        </time>
        <h3 className="log-card__title">{log.title}</h3>
        <p className="log-card__excerpt">{log.excerpt}</p>
        <div className="log-card__tags">
          {log.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} label={tag} variant="outline" size="sm" />
          ))}
        </div>
      </div>

      <div className="log-card__arrow" aria-hidden="true">
        →
      </div>
    </Link>
  );
}
