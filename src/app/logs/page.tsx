import type { Metadata } from "next";
import SectionHeading from "@/components/atoms/SectionHeading";
import LogCard from "@/components/molecules/LogCard";
import { getAllLogs } from "@/lib/logs";

export const metadata: Metadata = {
  title: "Learning Logs",
  description:
    "Weekly internship logs documenting technical growth, challenges, and takeaways.",
};

export default function LogsPage() {
  const logs = getAllLogs();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1
          className="section-heading__title"
          style={{ marginBottom: "0.4rem" }}
        >
          Learning Logs
        </h1>
        <p className="section-heading__subtitle">
          Weekly reflections on technical challenges, research, and growth
          throughout the internship.
        </p>
      </div>

      {logs.length > 0 ? (
        <div className="logs-list">
          {logs.map((log) => (
            <LogCard key={log.slug} log={log} />
          ))}
        </div>
      ) : (
        <p style={{ color: "var(--text-dim)", textAlign: "center", padding: "3rem 0" }}>
          No logs yet. Check back soon!
        </p>
      )}
    </div>
  );
}
