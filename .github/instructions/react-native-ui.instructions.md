---
applyTo: "app/**/*.tsx,components/**/*.tsx,context/**/*.tsx,constants/**/*.ts"
description: "Use when editing Expo Router screens, React Native UI components, and theme-related files in this repository."
---

UI and screen rules:

- Use `useTheme`/`useThemeColors` and theme tokens from `theme` for colors, spacing, border radius, and shadows.
- Prefer existing themed components such as `ThemedText`, `ThemedCard`, `ThemedButton`, and `ThemedTextInput`.
- Do not introduce raw `Text` when `ThemedText` is appropriate.
- Keep styles in a `createStyles(theme)` factory at file bottom for screens and reusable components that depend on theme.

Screen composition rules:

- Follow existing Expo Router screen conventions in `app/` and nearby files.
- Keep screen structure consistent with established patterns in the same feature folder.
- Prefer additive, minimal UI changes over large visual rewrites unless requested.

Design consistency:

- Reuse existing spacing scale and typography variants.
- Reuse shared components before creating new ones.
- Keep naming and file casing aligned with current project conventions.
