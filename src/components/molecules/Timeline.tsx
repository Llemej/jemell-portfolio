import type { TimelineMilestone } from "@/types";

interface TimelineProps {
  milestones: TimelineMilestone[];
}

export default function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="timeline" role="list" aria-label="Internship timeline">
      <div className="timeline__line" aria-hidden="true" />

      {milestones.map((item, idx) => {
        const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return (
          <div
            key={item.date}
            className={`timeline__item ${idx % 2 === 0 ? "timeline__item--left" : "timeline__item--right"}`}
            role="listitem"
            style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}
          >
            <div className="timeline__dot" aria-hidden="true">
              {item.icon || "●"}
            </div>
            <div className="timeline__card">
              <time className="timeline__date" dateTime={item.date}>
                {formattedDate}
              </time>
              <h3 className="timeline__title">{item.title}</h3>
              <p className="timeline__desc">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
