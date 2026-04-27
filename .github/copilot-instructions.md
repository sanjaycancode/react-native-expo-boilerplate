# English Charlie Copilot Baseline Instructions

These are always-on rules for Copilot in this repository.

Primary source of truth:

- Follow AGENTS.md as the canonical project guidance.
- If AGENTS.md conflicts with the current codebase structure, prefer the existing code patterns in nearby files and keep changes consistent.

General constraints:

- Use TypeScript strict-safe patterns; avoid any.
- Use @/ absolute imports instead of relative ../../ paths.
- Keep edits minimal and avoid broad refactors unless requested.
- Reuse existing components and patterns before introducing new abstractions.

React Native and UI constraints:

- Do not hardcode colors, spacing, radius, or typography values when theme tokens exist.
- Prefer Themed\* components and ThemeContext hooks for UI consistency.
- Follow existing screen structure and Expo Router conventions used in app/.

Data and API constraints:

- Keep api/services pure (no React imports).
- Use typed Axios calls and return response.data.
- Use React Query hooks in hooks/api for server state access from UI.
- Invalidate relevant query keys in mutation onSuccess handlers.

Review behavior:

- When asked to review, prioritize project-constraint violations, regressions, and missing tests.
- Report findings by severity with file and line references.
- If no issues are found, explicitly state that and mention residual risk.
