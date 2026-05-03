/**
 * logs.ts — Data access layer for Markdown learning logs
 *
 * Reads .md files from /content/logs, parses front-matter,
 * and returns typed LogEntry objects.
 */

import fs from "fs";
import path from "path";
import type { LogEntry, LogFrontMatter } from "@/types";

const LOGS_DIR = path.join(process.cwd(), "content", "logs");

/**
 * Minimal front-matter parser — avoids adding a dependency.
 * Expects YAML-style `key: "value"` or `key: value` between `---` fences.
 */
function parseFrontMatter(raw: string): {
  data: Record<string, string | string[] | number>;
  content: string;
} {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = raw.match(fmRegex);

  if (!match) {
    return { data: {}, content: raw };
  }

  const yamlBlock = match[1];
  const content = raw.slice(match[0].length).trim();
  const data: Record<string, string | string[] | number> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Remove surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Parse arrays like ["a", "b"]
    if (value.startsWith("[") && value.endsWith("]")) {
      const inner = value.slice(1, -1);
      data[key] = inner
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    // Parse numbers
    if (!isNaN(Number(value)) && value !== "") {
      data[key] = Number(value);
      continue;
    }

    data[key] = value;
  }

  return { data, content };
}

/** Read a single Markdown file and return a typed LogEntry */
function parseLogFile(filename: string): LogEntry {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(LOGS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontMatter(raw);

  const frontMatter: LogFrontMatter = {
    title: (data.title as string) || slug,
    date: (data.date as string) || "",
    excerpt: (data.excerpt as string) || "",
    tags: (data.tags as string[]) || [],
    week: (data.week as number) || 0,
  };

  return { ...frontMatter, slug, content };
}

/** Get all logs sorted by week (ascending) */
export function getAllLogs(): LogEntry[] {
  if (!fs.existsSync(LOGS_DIR)) return [];

  const files = fs.readdirSync(LOGS_DIR).filter((f) => f.endsWith(".md"));
  return files.map(parseLogFile).sort((a, b) => a.week - b.week);
}

/** Get all slugs — used by generateStaticParams */
export function getAllLogSlugs(): string[] {
  if (!fs.existsSync(LOGS_DIR)) return [];
  return fs
    .readdirSync(LOGS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

/** Get a single log by slug */
export function getLogBySlug(slug: string): LogEntry | undefined {
  const filename = `${slug}.md`;
  const filePath = path.join(LOGS_DIR, filename);
  if (!fs.existsSync(filePath)) return undefined;
  return parseLogFile(filename);
}
