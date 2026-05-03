---
title: "Week 2 — API Gateway Research"
date: "2026-01-24"
excerpt: "Deep-dive into microservice API gateway patterns — compared Kong, AWS API Gateway, and Express middleware."
tags: ["api", "research", "microservices", "node.js"]
week: 2
---

## Overview

This week was dedicated to researching API gateway architectures to inform the team's migration from a monolithic backend.

### Key Activities

- **Literature Review** — Read Martin Fowler's *Microservices* guide and the Kong whitepaper on API lifecycle management.
- **Benchmarking** — Set up Docker containers for Kong and a custom Express proxy; ran Postman load tests at 500 RPS.
- **Presentation** — Delivered a 15-minute presentation to the team with a comparison matrix and recommendation.

### Findings

| Gateway          | Latency (p99) | Throughput  | Ease of Config |
|------------------|---------------|-------------|----------------|
| Kong             | 12 ms         | 4,200 RPS   | Medium         |
| AWS API Gateway  | 18 ms         | 3,800 RPS   | High           |
| Custom Express   | 8 ms          | 5,100 RPS   | Low            |

### Takeaways

> Custom solutions win on raw performance but lose on observability and plugin ecosystems. For our scale, Kong offered the best balance.
