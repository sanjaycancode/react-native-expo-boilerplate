## Summary

<!-- What does this PR do? -->

## Changes

<!-- List key files changed and why. -->

---

## Project Constraint Checklist

> Same checklist used by Copilot review. All items must be checked or explicitly justified before merge.

### General

- [ ] TypeScript strict — no `any`, no unsafe casts
- [ ] All imports use `@/` alias — no relative `../../` paths
- [ ] No broad refactors included beyond the stated scope

### UI / Theming

- [ ] No hardcoded colors, spacing, radius, or typography values
- [ ] `ThemedText` used for all text — no raw `<Text>`
- [ ] Styles defined in `createStyles(theme)` factory at file bottom
- [ ] Screen anatomy: `<>`, `Stack.Screen` first, container `View` with `flex:1 / padding:lg / gap:md`
- [ ] `ThemedSafeAreaView` used only when explicit safe-area handling is needed (not by default)

### API / Data

- [ ] `api/services` files have no React imports
- [ ] All Axios calls are typed: `get<T>`, `post<T>`, etc.
- [ ] Service functions return `response.data` — not the full response
- [ ] Server state accessed only via React Query hooks in `hooks/api/`
- [ ] All mutations invalidate affected query keys in `onSuccess`
- [ ] Types imported from `@/types` — not from service files

### Architecture

- [ ] New screens placed in `app/(auth)/` following Expo Router conventions
- [ ] New reusable components added to `components/`
- [ ] New API domains follow the triple: `[domain]Service.ts` + `use[Domain]Api.ts` + `[domain].ts`
- [ ] Every new folder with exports has an `index.ts` barrel

### Env config

- [ ] No direct `process.env` reads in feature code — uses `env.*` from `@/lib/config/env`
- [ ] New env vars added to `RequiredEnvVar` type and `env` object

---

## Test Coverage

<!-- Were any tests added or updated? If not, explain why. -->

## Residual Risks

<!-- Any known edge cases, known gaps, or follow-up work? -->
