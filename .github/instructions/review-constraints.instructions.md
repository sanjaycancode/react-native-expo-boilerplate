---
description: "Use when asked to review code in this repository for correctness, regressions, and project-constraint compliance."
---

Review scope and priorities:

- Prioritize bugs, behavior regressions, and violations of AGENTS.md and project instruction files.
- Then report missing tests for changed behavior.
- Keep summaries brief; findings come first.

Required output format:

- Group findings by severity: Critical, High, Medium, Low.
- For each finding, include file path and line reference.
- Explain impact and the minimal fix direction.
- If no findings exist, explicitly state: "No findings" and mention residual risks or untested areas.

Constraint audit checklist:

- UI/theming: theme tokens, themed components, and existing screen patterns are respected.
- API/services: typed Axios usage, response.data returns, no React imports in services.
- React Query: query keys and mutation invalidation are correct.
- Types/config: domain types live in types/, env access goes through validated config.
