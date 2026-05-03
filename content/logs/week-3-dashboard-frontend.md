---
title: "Week 3 — Building the Analytics Dashboard"
date: "2026-01-31"
excerpt: "Designed and coded a responsive analytics dashboard with Chart.js, dark mode, and accessible tables."
tags: ["react", "typescript", "tailwind", "chart.js", "frontend"]
week: 3
---

## Overview

Transitioned from research to hands-on frontend development — built the analytics dashboard from Figma mockups to production.

### Key Activities

- **Component Architecture** — Broke the dashboard into atomic components: `StatCard`, `ChartPanel`, `DataTable`, and `FilterBar`.
- **Dark Mode** — Implemented a theme toggle using CSS custom properties and `prefers-color-scheme` media query.
- **Chart.js Integration** — Rendered line, bar, and doughnut charts with responsive resizing and tooltip customisation.
- **Accessibility** — Added ARIA labels to all interactive elements; ensured 4.5:1 contrast ratios in both themes.

### Code Snippet

```tsx
// StatCard atom — displays a single KPI metric
interface StatCardProps {
  label: string;
  value: string | number;
  trend: "up" | "down" | "flat";
}

export function StatCard({ label, value, trend }: StatCardProps) {
  const trendColor = {
    up: "text-emerald-500",
    down: "text-red-500",
    flat: "text-zinc-400",
  }[trend];

  return (
    <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className={`text-3xl font-bold ${trendColor}`}>{value}</p>
    </div>
  );
}
```

### Takeaways

> Atomic design isn't just a pattern — it's a mindset. Building small, tested units made the entire dashboard composable and easy to iterate on.
