---
applyTo: "api/**/*.ts,hooks/api/**/*.ts,types/**/*.ts,lib/react-query/**/*.ts,lib/config/**/*.ts"
description: "Use when editing API client/services, React Query hooks, domain types, and related config."
---

API layer rules:

- Keep `api/services` files framework-agnostic: no React imports and no UI logic.
- Type Axios requests/responses explicitly.
- Return `response.data` from services.
- Keep error normalization in API client/utilities, not duplicated in each service.

React Query rules:

- Define and use stable query key factories (for example `todoKeys`).
- Place server-state hooks in `hooks/api`.
- Mutations must invalidate affected queries in `onSuccess`.
- When both list and detail are affected, invalidate both.

Types and config rules:

- Keep domain types in `types/` and import from there.
- Keep update payloads partial/optional where appropriate.
- Access environment variables through validated config in `lib/config/env.ts`.
