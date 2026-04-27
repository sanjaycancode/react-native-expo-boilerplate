# English Charlie — AI Agent Coding Instructions

This document is the canonical reference for AI coding agents working in this repository. Follow every pattern here to produce code that is consistent, idiomatic, and immediately mergeable.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Folder Structure](#folder-structure)
3. [Theme System](#theme-system)
4. [Component Patterns](#component-patterns)
5. [Screen / Page Patterns](#screen--page-patterns)
6. [Navigation Patterns](#navigation-patterns)
7. [Nested Screen Structure](#nested-screen-structure)
8. [API Layer](#api-layer)
9. [React Query Hooks](#react-query-hooks)
10. [Form Integration](#form-integration)
11. [Error Handling Patterns](#error-handling-patterns)
12. [TypeScript Types](#typescript-types)
13. [Environment Config](#environment-config)
14. [Custom Hooks](#custom-hooks)
15. [Scroll Detection](#scroll-detection)
16. [Naming Conventions](#naming-conventions)
17. [Rules — Do / Don't](#rules--do--dont)

---

## Tech Stack

| Layer        | Technology                                             |
| ------------ | ------------------------------------------------------ |
| Framework    | React Native via [Expo SDK](https://docs.expo.dev/)    |
| Language     | TypeScript (strict)                                    |
| Routing      | Expo Router v3 (file-based)                            |
| Server state | TanStack React Query v5 + AsyncStorage persistence     |
| HTTP client  | Axios                                                  |
| Styling      | React Native `StyleSheet` + custom design token system |
| Theme        | Custom `ThemeContext` (light/dark, system-aware)       |
| Icons        | `@expo/vector-icons` FontAwesome                       |
| Fonts        | Lexend (Regular / Medium / SemiBold / Bold), SpaceMono |

**Provider nesting order** (defined in `app/_layout.tsx`):

```
ReactQueryProvider
  └── ThemeProvider
        └── Stack (Expo Router)
```

All providers must be nested in this exact order. Never add a new provider outside `ReactQueryProvider`.

---

## Folder Structure

```
english_charlie_mobile_app/
├── app/                          # Expo Router — file-based routes only
│   ├── _layout.tsx               # Root layout: fonts, providers, splash screen
│   ├── +html.tsx                 # Web-only HTML shell
│   ├── +not-found.tsx            # 404 fallback screen
│   ├── index.tsx                 # Root entry / redirect
│   ├── login.tsx                 # Login screen
│   ├── modal.tsx                 # Global modal screen
│   └── (auth)/                   # Authenticated area
│       ├── _layout.tsx
│       ├── appearance.tsx        # Appearance settings screen
│       ├── (tabs)/               # Bottom tab navigator
│       │   ├── _layout.tsx
│       │   ├── index.tsx         # Redirect tab entry
│       │   ├── dashboard/
│       │   ├── practice/
│       │   ├── learn/
│       │   ├── coaching/
│       │   └── me/
│       ├── todos/                # Nested section
│       │   ├── _layout.tsx
│       │   ├── index.tsx
│       │   └── create.tsx
│       ├── courses/              # Nested section with dynamic route
│       │   ├── _layout.tsx
│       │   ├── index.tsx
│       │   └── [id]/detail.tsx
│       ├── classes/              # Nested section with dynamic route
│       │   ├── _layout.tsx
│       │   ├── index.tsx
│       │   └── [id]/detail.tsx
│       ├── book_coach/           # Nested section with dynamic route
│       │   ├── index.tsx
│       │   └── [id]/detail.tsx
│       ├── manual_practice/
│       ├── mock_test/
│       ├── smart_practice/
│       └── my_bookings/
│           ├── index.tsx
│           └── [id]/details.tsx
│
├── api/                          # API layer — no React, no hooks
│   ├── client.ts                 # Axios instance, error types, normalizeApiError
│   ├── index.ts                  # Barrel: re-exports client + services
│   └── services/
│       ├── index.ts              # Barrel: re-exports all service files
│       └── [domain]Service.ts    # One file per API domain (e.g. todoService.ts)
│
├── hooks/                        # Custom React hooks
│   └── api/
│       ├── index.ts              # Barrel
│       └── use[Domain]Api.ts     # React Query hooks — one file per domain
│
├── components/                   # Reusable UI components
│   ├── ThemedText.tsx            # Text with semantic color & typography
│   ├── ThemedCard.tsx            # Card container (outlined/elevated/default)
│   ├── ThemedButton.tsx          # Button (primary/secondary/danger)
│   ├── ThemedTextInput.tsx       # Text input with validation & helpers
│   ├── ThemedFAB.tsx             # Floating action button
│   ├── TaskItem.tsx              # Task row with tone-based icons
│   ├── ProgressBadge.tsx         # Circular progress indicator
│   ├── ProgressTrack.tsx         # Linear progress indicator
│   ├── ActivityContributionGraph.tsx # Data visualization
│   ├── HeaderBackButton.tsx      # Custom back button
│   └── ...                       # Other shared components
│
├── context/                      # React Context providers
│   └── ThemeContext.tsx          # Theme state, hooks, NavigationThemeProvider
│
├── constants/                    # Design tokens
│   ├── Themes.ts                 # PRIMARY: Colors, Typography, Spacing, BorderRadius, Shadows
│   └── Colors.ts                 # Legacy minimal color map (do not extend)
│
├── types/                        # TypeScript domain types only
│   ├── index.ts                  # Barrel: re-exports all domain type files
│   └── [domain].ts               # e.g. todo.ts, course.ts
│
├── lib/                          # Third-party library configuration
│   ├── config/
│   │   └── env.ts                # Environment variable validation
│   └── react-query/
│       ├── queryClient.ts        # QueryClient instance + retry/stale config
│       └── ReactQueryProvider.tsx # PersistQueryClientProvider wrapper
│
├── utils/                        # Utility functions
│   ├── formHook.ts               # Form helper utilities
│   └── index.ts
│
└── assets/
    ├── fonts/                    # Lexend & SpaceMono TTF files
    └── images/
```

**Rules:**

- New screens go in `app/` using Expo Router file conventions.
- New reusable UI blocks go in `components/`.
- New API domains: add `[domain]Service.ts` in `api/services/`, `use[Domain]Api.ts` in `hooks/api/`, `[domain].ts` in `types/`.
- Every folder that exports code must have an `index.ts` barrel file.

---

## Theme System

### Design Tokens (`constants/Themes.ts`)

All design decisions are expressed as tokens. Never use magic numbers or hardcoded hex values.

#### Colors

```
theme.colors.primary          // Lavender #8B7CF6 (light) / #A78BFA (dark)
theme.colors.primaryLight     // #C4B5FD
theme.colors.primaryDark      // #6D5AE6 (light) / #8B7CF6 (dark)

theme.colors.background       // Page background
theme.colors.surface          // Card / sheet surface
theme.colors.backgroundAlt    // Alternative surface (white in light mode)
theme.colors.border           // Dividers and outlines

theme.colors.text             // Primary body text
theme.colors.textSecondary    // Subdued / helper text
theme.colors.textTertiary     // Placeholder / disabled labels
theme.colors.textOnPrimary    // Text on primary-colored backgrounds

theme.colors.accent           // Blue accent #60A5FA
theme.colors.success          // #22C55E / #4ADE80
theme.colors.warning          // #F59E0B / #FBBF24
theme.colors.error            // #EF4444 / #F87171
theme.colors.info             // #3B82F6 / #60A5FA
theme.colors.disabled         // Disabled state color

theme.colors.tint             // Tab bar tint (= primary)
theme.colors.tabIconDefault   // Inactive tab icon
theme.colors.tabIconSelected  // Active tab icon (= primary)
```

#### Typography (`theme.typography.*`)

| Variant     | Size | Weight | Font           |
| ----------- | ---- | ------ | -------------- |
| `heading1`  | 32   | 700    | LexendBold     |
| `heading2`  | 28   | 700    | LexendBold     |
| `heading3`  | 24   | 600    | LexendSemiBold |
| `heading4`  | 20   | 600    | LexendSemiBold |
| `heading5`  | 18   | 600    | LexendSemiBold |
| `heading6`  | 16   | 600    | LexendSemiBold |
| `body`      | 16   | 400    | Lexend         |
| `bodySmall` | 14   | 400    | Lexend         |
| `caption`   | 12   | 400    | Lexend         |
| `mono`      | 14   | 400    | SpaceMono      |

#### Spacing (`theme.spacing.*`)

| Token | Value |
| ----- | ----- |
| `xs`  | 3     |
| `sm`  | 6     |
| `md`  | 12    |
| `lg`  | 18    |
| `xl`  | 24    |

Use `lg` for screen padding, `md` for gap between elements, `sm` for tight internal gaps.

#### Border Radius (`theme.borderRadius.*`)

| Token    | Value |
| -------- | ----- |
| `small`  | 4     |
| `medium` | 8     |
| `large`  | 12    |
| `xl`     | 16    |
| `full`   | 9999  |

#### Shadows (`theme.shadows.*`)

| Token    | Elevation |
| -------- | --------- |
| `light`  | 2         |
| `medium` | 4         |
| `heavy`  | 8         |

### Consuming the Theme

```typescript
// Full theme object
const { theme } = useTheme();

// Colors shortcut (most common)
const colors = useThemeColors();

// Theme mode + toggle
const { mode, toggleTheme, setTheme } = useThemeMode();
```

All three hooks are exported from `@/context/ThemeContext`.

### `createStyles` Pattern

Define a `createStyles` factory at the **bottom** of every screen or component file. Call it at the **top** of the component function body.

```typescript
export default function MyScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ThemedSafeAreaView>
      <View style={styles.container}>
        {/* ... */}
      </View>
    </ThemedSafeAreaView>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
  });
```

---

## Component Patterns

### `ThemedText`

Use for **all** text in the app. Never use React Native's `<Text>` directly.

```tsx
// variant controls typography scale
// semantic controls color intent
<ThemedText variant="heading2">Dashboard</ThemedText>
<ThemedText variant="body" semantic="muted">Helper text</ThemedText>
<ThemedText variant="bodySmall" semantic="error">Validation error</ThemedText>
<ThemedText variant="caption" semantic="primary">Tag label</ThemedText>
```

**`variant` options:** `heading1` | `heading2` | `heading3` | `heading4` | `heading5` | `heading6` | `body` | `bodySmall` | `caption` | `mono`

**`semantic` options:** `default` | `muted` | `primary` | `success` | `warning` | `error` | `info` | `disabled`

Use `lightColor` / `darkColor` props only when you need a one-off color that has no semantic equivalent.

---

### `ThemedCard`

Container for grouped content sections.

```tsx
<ThemedCard variant="outlined">       {/* default — bordered card */}
<ThemedCard variant="elevated">       {/* shadow card, no border */}
<ThemedCard variant="default">        {/* flat, no border, no shadow */}
```

Default `variant` is `"outlined"`. Pass `style` prop to override layout.

---

### `ThemedButton`

```tsx
<ThemedButton
  title="Start Practice"
  onPress={handlePress}
  variant="primary" // primary | secondary | danger
  size="medium" // small | medium | large
  disabled={false}
/>
```

- `primary` — lavender background, white text
- `secondary` — surface background, body text color
- `danger` — error color background, white text

---

### Additional UI Components

#### `ThemedTextInput`

Advanced text input with validation, error display, and helper text:

```tsx
<ThemedTextInput
  label="Email"
  placeholder="Enter your email"
  keyboardType="email-address"
  editable={!isLoading}
  value={value}
  onChangeText={setValue}
  error={errorMessage}
  helperText="We'll never share your email"
/>
```

Use with `react-hook-form`'s `Controller` via the `formTextInputHelper` utility.

#### `ThemedFAB`

Floating action button for primary actions:

```tsx
<ThemedFAB onPress={handleAddTodo} />
```

Automatically positions and applies theme colors.

#### `TaskItem`

Reusable task row component with tone-based semantic icons:

```tsx
<TaskItem
  title="Complete practice"
  description="10 minutes remaining"
  tone="default" // default | success | warning | error
  onPress={handleSelectTask}
/>
```

#### `ProgressBadge`

Circular progress indicator for showing completion percentage:

```tsx
<ProgressBadge percentage={65} radius={30} />
```

#### `ProgressTrack`

Linear progress indicator for showing progress in a sequence:

```tsx
<ProgressTrack percentage={65} />
```

#### `HeaderBackButton`

Custom back button component for navigation:

```tsx
import { HeaderBackButton } from "@/components/HeaderBackButton";

<HeaderBackButton onPress={() => router.back()} />;
```

---

### `ThemedSafeAreaView`

Wrap full-screen components with `ThemedSafeAreaView` to apply theme background color and safe area padding. Use when you need explicit safe area handling.

```tsx
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

<ThemedSafeAreaView>{/* content */}</ThemedSafeAreaView>;
```

**Note:** Most screens use bare `<View>` with explicit padding instead. Use `ThemedSafeAreaView` only when safe area context is needed.

---

## Screen / Page Patterns

Every screen file follows this exact anatomy:

```tsx
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";

export default function ExampleScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <>
      <Stack.Screen options={{ title: "Example" }} />
      <View style={styles.container}>
        <View>
          <ThemedText variant="heading2">Screen Title</ThemedText>
          <ThemedText variant="body" semantic="muted">
            Subtitle or description.
          </ThemedText>
        </View>

        {/* content sections */}
      </View>
    </>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>["theme"]) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.spacing.lg,
      gap: theme.spacing.md,
    },
  });
```

**Key rules:**

- `Stack.Screen` must be the first element (before content, inside a fragment).
- Top-level `View` always has `flex: 1`, `padding: theme.spacing.lg`, `gap: theme.spacing.md`.
- Screen title section (`heading2` + `body muted`) is always the first child of the container.
- `createStyles` is always at the bottom of the file.
- Return fragments (`<>...</>`) at the root level — no `ThemedSafeAreaView` wrapper needed.

---

## Navigation Patterns

### Tab Navigation

Tabs are defined in `app/(auth)/(tabs)/_layout.tsx`. Tab configuration:

- **5 tabs:** Dashboard, Practice, Learn, Coaching, Me
- **Initial tab:** `dashboard`
- `index` tab is hidden (`href: null`) and redirects to `/dashboard`
- Tab bar active color: `colors.primary`
- All tab screens set `headerShown: false` (screens manage their own headers via `Stack.Screen`)

### Linking to Screens

Use `Link` with `asChild` + `Pressable` as the tap target:

```tsx
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { ThemedCard } from "@/components/ThemedCard";
import { ThemedText } from "@/components/ThemedText";

<Link href="/mock_test" asChild>
  <Pressable>
    <ThemedCard variant="outlined">
      <ThemedText variant="heading5">Mock Test</ThemedText>
      <ThemedText variant="bodySmall" semantic="muted">
        Description text.
      </ThemedText>
    </ThemedCard>
  </Pressable>
</Link>;
```

### Programmatic Navigation

Use `useRouter` for programmatic navigation:

```tsx
import { useRouter } from "expo-router";

export default function MyScreen() {
  const router = useRouter();

  // Navigate to a new screen
  const handleNavigate = () => router.push("/todos/create");

  // Replace current screen in stack (prevents back navigation)
  const handleReplace = () => router.replace("../todos");

  // Go back to previous screen
  const handleBack = () => router.back();

  return <ThemedButton title="Create" onPress={handleNavigate} />;
}
```

### Dynamic Routes

Use `useLocalSearchParams` to access URL parameters in dynamic routes:

```tsx
// Screen: app/(auth)/courses/[id]/detail.tsx
import { useLocalSearchParams } from "expo-router";

export default function CourseDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Use `id` to fetch course data
  return <ThemedText>Course ID: {id}</ThemedText>;
}

// Navigating to it:
// router.push(`/courses/${courseId}/detail`)
// or <Link href={`/courses/${courseId}/detail`} />
```

### Back Button

Use `HeaderBackButton` from `@/components/HeaderBackButton` for custom back button styling:

```tsx
import { Stack } from "expo-router";
import { HeaderBackButton } from "@/components/HeaderBackButton";

<Stack.Screen
  options={{
    headerLeft: (props) => <HeaderBackButton {...props} />,
  }}
/>;
```

---

## Nested Screen Structure

Beyond the main `(auth)/(tabs)` group, the app has several nested screen sections that follow the same patterns:

### `todos` Section

Todos feature accessible outside tabs. Structure: `app/(auth)/todos/`

- `index.tsx` — List of todos (with React Query integration)
- `create.tsx` — Form to create a new todo

**Navigation:**

```tsx
// Navigate to todos list
<Link href="/todos" asChild>
  <Pressable>...</Pressable>
</Link>;

// Navigate to create form
const router = useRouter();
router.push("/todos/create");

// After create, redirect back
router.replace("../todos"); // or router.back()
```

### `courses` Section with Dynamic Routes

Courses section with dynamic course details. Structure: `app/(auth)/courses/`

- `index.tsx` — List of courses
- `[id]/detail.tsx` — Dynamic course detail page

**Dynamic route usage:**

```tsx
// In list screen, navigate to course detail:
const courseId = course.id;
router.push(`/courses/${courseId}/detail`);

// In detail screen, access the parameter:
const { id } = useLocalSearchParams<{ id?: string }>();
```

### `classes` Section

Classes section (similar to courses). Structure: `app/(auth)/classes/`

- `index.tsx` — List of classes
- `_layout.tsx` — Layout configuration

### `appearance` Screen

Settings screen for theme/appearance preferences at `app/(auth)/appearance.tsx`.

**Navigation:**

```tsx
// From any screen:
router.push("/appearance");
```

---

## API Layer

### Client (`api/client.ts`)

```typescript
// Axios instance — always import from @/api not axios directly
import { apiClient } from "@/api";

// Normalized error type
interface ApiError {
  message: string;
  statusCode?: number;
  code?: string;
  details?: unknown;
}
```

- Base URL comes from `env.apiBaseUrl` (validated at startup).
- Timeout: 15 seconds.
- Request interceptor: reserved for auth token injection — add bearer token here when auth is implemented.
- Response interceptor: normalizes all errors to `ApiError` via `normalizeApiError`.

### Service Files (`api/services/[domain]Service.ts`)

One file per API domain. Functions only — no classes, no React.

```typescript
// Naming: get[Domain](s), create[Domain], update[Domain], delete[Domain]
export async function getPosts(): Promise<Post[]> {
  const response = await apiClient.get<Post[]>("/posts");
  return response.data;
}

export async function getPostById(id: number): Promise<Post> {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const response = await apiClient.post<Post>("/posts", payload);
  return response.data;
}

export async function updatePost(
  id: number,
  payload: UpdatePostPayload,
): Promise<Post> {
  const response = await apiClient.put<Post>(`/posts/${id}`, payload);
  return response.data;
}

export async function deletePost(id: number): Promise<void> {
  await apiClient.delete(`/posts/${id}`);
}
```

**Rules:**

- Always return `response.data` — never return the full Axios response.
- No try/catch in services. Error handling belongs in React Query hooks or components.
- Always type the generic on Axios methods: `get<Post[]>`, `post<Post>`, etc.
- After adding a service file, export it from `api/services/index.ts`.

### Barrel Exports

```
api/services/[domain]Service.ts  →  api/services/index.ts  →  api/index.ts
```

---

## React Query Hooks

Location: `hooks/api/use[Domain]Api.ts`

### Query Key Factory

Every hook file defines a `[domain]Keys` factory object at the top:

```typescript
export const postKeys = {
  all: ["posts"] as const,
  detail: (id: number) => ["posts", id] as const,
};
```

Keys follow a hierarchical structure. Invalidating `postKeys.all` invalidates all post queries.

### Hook Naming

- `use[Domain]sQuery()` — list query
- `use[Domain]Query(id)` — single item query
- `useCreate[Domain]Mutation()` — create
- `useUpdate[Domain]Mutation()` — update
- `useDelete[Domain]Mutation()` — delete

### Query Hook Pattern

```typescript
export function usePostsQuery() {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: getPosts,
  });
}

export function usePostQuery(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPostById(id),
    enabled: id > 0, // conditional: only run when id is valid
  });
}
```

### Mutation Hook Pattern

```typescript
export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePostPayload }) =>
      updatePost(id, payload),
    onSuccess: async (post, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postKeys.detail(id) }),
        queryClient.invalidateQueries({ queryKey: postKeys.all }),
      ]);
    },
  });
}
```

**Rules:**

- Mutations always invalidate affected query keys in `onSuccess`.
- When a mutation affects both a detail and a list, invalidate both in parallel with `Promise.all`.
- Export types alongside hooks when consumers need them.
- Add new hook files to `hooks/api/index.ts`.

### QueryClient Config (`lib/react-query/queryClient.ts`)

The QueryClient is configured with production-ready settings:

- **Stale time:** 5 minutes — queries remain fresh for 5 min after fetch
- **GC time:** 30 minutes — unused queries kept in cache for 30 min before garbage collection
- **Retry logic:** No retry on 4xx errors (client errors); max 2 retries on 5xx/network errors
- **Refetch behavior:** On reconnect only — not on window focus, not on mount
- **AsyncStorage persistence:** Queries are persisted to device storage via `PersistQueryClientProvider`

**QueryClient creation:**

```tsx
// The QueryClient is created once and reused
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      retry: (failureCount, error) => {
        // Don't retry 4xx errors (like 404, 400)
        if (error instanceof AxiosError && error.response?.status < 500) {
          return false;
        }
        // Retry up to 2 times on 5xx/network errors
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
    },
  },
});

// Wrapped in PersistQueryClientProvider for AsyncStorage persistence
<PersistQueryClientProvider client={queryClient}>
  {/* App content */}
</PersistQueryClientProvider>;
```

---

## TypeScript Types

Location: `types/[domain].ts`

### File Structure

```typescript
// Response type — matches API response shape exactly
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Request payload for POST — required fields only
export interface CreatePostPayload {
  userId: number;
  title: string;
  body: string;
}

// Request payload for PUT/PATCH — all fields optional (partial update)
export interface UpdatePostPayload {
  title?: string;
  body?: string;
}
```

**Rules:**

- One file per domain (e.g., `user.ts`, `course.ts`).
- Payload types use `Payload` suffix: `CreateXxxPayload`, `UpdateXxxPayload`.
- Update payloads always use optional fields.
- Never import types from service files — import from `@/types`.
- Add new domain type files to `types/index.ts` barrel.

---

## Form Integration

The app uses `react-hook-form` for form state management with React Query mutations for API calls.

### Basic Form Pattern

```tsx
import { Controller, useForm } from "react-hook-form";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { formTextInputHelper } from "@/utils";
import { useCreateTodoMutation } from "@/hooks/api";

type FormValues = {
  title: string;
  userId: string;
};

export default function CreateScreen() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "",
      userId: "",
    },
  });

  const mutation = useCreateTodoMutation();

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.replace("../list"); // Navigate back after success
      },
    });
  };

  return (
    <View>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Title is required" }}
        render={({ field, fieldState }) => (
          <ThemedTextInput
            label="Title"
            placeholder="Enter title"
            editable={!mutation.isPending}
            {...formTextInputHelper({ field, fieldState })}
          />
        )}
      />

      <ThemedButton
        title="Create"
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isPending}
      />
    </View>
  );
}
```

### Error Handling

Access mutation errors in the component:

```tsx
if (mutation.error) {
  const errorMessage = getErrorMessage(mutation.error);
  return <ThemedText semantic="error">{errorMessage}</ThemedText>;
}
```

### `formTextInputHelper` Utility

Simplifies connecting `react-hook-form` `Controller` to `ThemedTextInput`:

```tsx
// This helper extracts field state and value for you
<ThemedTextInput {...formTextInputHelper({ field, fieldState })} />

// Equivalent to:
<ThemedTextInput
  value={field.value}
  onChangeText={field.onChange}
  onBlur={field.onBlur}
  error={fieldState.error?.message}
/>
```

---

## Error Handling Patterns

### `getErrorMessage()` Utility

Extract readable error messages from unknown error types:

```tsx
function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "message" in error) {
    const { message } = error as { message?: unknown };
    if (typeof message === "string") {
      return message;
    }
  }
  return "Something went wrong."; // Fallback
}

// Usage:
const errorMsg = getErrorMessage(query.error);
<ThemedText semantic="error">{errorMsg}</ThemedText>;
```

### Query State Rendering Pattern

Render different content based on query state (loading, error, empty, success):

```tsx
function renderLoadingState() {
  return (
    <ThemedCard>
      <ThemedText>Loading...</ThemedText>
    </ThemedCard>
  );
}

function renderErrorState() {
  return (
    <ThemedCard>
      <ThemedText semantic="error">
        Failed to load: {getErrorMessage(query.error)}
      </ThemedText>
    </ThemedCard>
  );
}

function renderEmptyState() {
  return (
    <ThemedCard>
      <ThemedText semantic="muted">No items available.</ThemedText>
    </ThemedCard>
  );
}

function renderContent() {
  if (query.isLoading) return renderLoadingState();
  if (query.error) return renderErrorState();
  if (!data || data.length === 0) return renderEmptyState();
  return <ScrollView>{/* List content */}</ScrollView>;
}

export default function Screen() {
  return <View>{renderContent()}</View>;
}
```

### Accessing Mutation Errors

Access error from mutation in components:

```tsx
const mutation = useCreatePostMutation();

if (mutation.error) {
  return <ErrorAlert message={getErrorMessage(mutation.error)} />;
}

return (
  <ThemedButton
    title="Create"
    onPress={handleSubmit}
    disabled={mutation.isPending}
  />
);
```

---

## Environment Config

Location: `lib/config/env.ts`

```typescript
type RequiredEnvVar = "EXPO_PUBLIC_API_BASE_URL";

function getRequiredEnvVar(name: RequiredEnvVar): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const env = {
  apiBaseUrl: getRequiredEnvVar("EXPO_PUBLIC_API_BASE_URL"),
} as const;
```

**Rules:**

- All env vars must use the `EXPO_PUBLIC_` prefix (required for Expo bundler exposure).
- Every new env var must be added to the `RequiredEnvVar` union type and the `env` object.
- Validation happens at app startup — missing vars throw immediately, not silently.
- Always access env vars via `env.[key]`, never via `process.env` directly in feature code.

---

## Custom Hooks

### `useColorScheme()`

Detects the system color scheme (light/dark) and provides platform-specific behavior:

```tsx
import { useColorScheme } from "@/components/useColorScheme";

export default function MyComponent() {
  const colorScheme = useColorScheme(); // Returns "light" | "dark"

  return <ThemedText>Current scheme: {colorScheme}</ThemedText>;
}
```

**Platform behavior:** Different implementations for web (`useColorScheme.web.ts`) vs native.

### `useClientOnlyValue()`

Ensures a value is used only on the client side, fixing Expo Router hydration issues:

```tsx
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

export default function ServerAwareComponent() {
  const isClient = useClientOnlyValue(false, true); // Server value, client value

  return isClient ? <ClientComponent /> : null;
}
```

**Use case:** Prevents rendering mismatches between server and client in Expo Router environments.

### Custom API Hooks

Create custom hooks for domain-specific API operations:

Location: `hooks/api/use[Domain]Api.ts`

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, createTodo } from "@/api/services";
import type { Todo, CreateTodoPayload } from "@/types/todo";

export const todoKeys = {
  all: ["todos"] as const,
  detail: (id: number) => ["todos", id] as const,
};

export function useTodosQuery() {
  return useQuery({
    queryKey: todoKeys.all,
    queryFn: getTodos,
  });
}

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTodoPayload) => createTodo(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: todoKeys.all });
    },
  });
}
```

---

## Scroll Detection

Common pattern for detecting scroll position and responding (e.g., showing/hiding header).

### ScrollView onScroll Pattern

```tsx
import { ScrollView, View } from "react-native";
import React from "react";

export default function ScrollableScreen() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  return (
    <ScrollView
      onScroll={(event) => {
        const nextIsScrolled = event.nativeEvent.contentOffset.y > 50;
        // Prevent unnecessary state updates
        setIsScrolled((prev) =>
          prev === nextIsScrolled ? prev : nextIsScrolled,
        );
      }}
      scrollEventThrottle={16} // Throttle to 60fps
    >
      {/* Content */}
    </ScrollView>
  );
}
```

**Key techniques:**

1. **State stabilization:** Check `prev === nextIsScrolled` to avoid redundant re-renders
2. **Throttling:** `scrollEventThrottle={16}` limits callback frequency to match screen refresh rate
3. **Threshold:** Compare against a pixel offset (e.g., `> 50`) to determine "scrolled" state

### Use Cases

- Conditionally show/hide header shadows based on scroll
- Disable FAB button during scroll
- Track scroll position for analytics
- Implement "scroll to top" button visibility

---

## Naming Conventions

| Category         | Convention                           | Example                                      |
| ---------------- | ------------------------------------ | -------------------------------------------- |
| Screen files     | kebab-case                           | `mock-test.tsx`, `manual-practice.tsx`       |
| Component files  | PascalCase                           | `ThemedText.tsx`, `TaskItem.tsx`             |
| Hook files       | camelCase with `use` prefix          | `usePostApi.ts`, `useColorScheme.ts`         |
| Service files    | camelCase with `Service` suffix      | `postService.ts`, `userService.ts`           |
| Type files       | camelCase                            | `post.ts`, `user.ts`                         |
| Type interfaces  | PascalCase                           | `Post`, `CreatePostPayload`                  |
| React components | PascalCase function                  | `export function ThemedCard(...)`            |
| Screens          | PascalCase function (default export) | `export default function TodosScreen()`      |
| Query keys       | camelCase object + `Keys` suffix     | `postKeys`, `userKeys`                       |
| API functions    | camelCase verb-noun                  | `getPostById`, `createPost`, `deletePost`    |
| Context hooks    | `use` + PascalCase                   | `useTheme`, `useThemeColors`, `useThemeMode` |

### Import Alias

Always use the `@/` alias for absolute imports — never use relative `../../` paths.

```typescript
// CORRECT
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import { getPosts } from "@/api/services";

// WRONG
import { ThemedText } from "../../components/ThemedText";
```

---

## Rules — Do / Don't

### Styling

| ✅ DO                                                | ❌ DON'T                                               |
| ---------------------------------------------------- | ------------------------------------------------------ |
| Use `theme.colors.*` for all colors                  | Hardcode hex values like `"#8B7CF6"`                   |
| Use `theme.spacing.*` for all spacing                | Hardcode numbers like `padding: 18`                    |
| Use `theme.borderRadius.*` for all radii             | Hardcode `borderRadius: 12`                            |
| Use `theme.shadows.*` for elevation                  | Write shadow styles manually                           |
| Define styles in `createStyles(theme)` factory       | Define styles outside the factory without theme access |
| Call `createStyles` at the top of the component body | Call `createStyles` inline in JSX                      |

### Text

| ✅ DO                              | ❌ DON'T                                        |
| ---------------------------------- | ----------------------------------------------- |
| Use `<ThemedText>` for all text    | Use React Native `<Text>` directly              |
| Use `variant` for typography scale | Set `fontSize`/`fontWeight`/`fontFamily` inline |
| Use `semantic` for color intent    | Pass raw color values as `style` overrides      |

### API & Data

| ✅ DO                                                               | ❌ DON'T                                      |
| ------------------------------------------------------------------- | --------------------------------------------- |
| Use React Query hooks from `hooks/api/`                             | Call service functions directly in components |
| Handle errors in components (from `mutation.error` / `query.error`) | Add try/catch inside service functions        |
| Invalidate query keys in `onSuccess`                                | Manually update cache without invalidation    |
| Type all Axios generics: `get<Post[]>`                              | Use untyped `get()` calls                     |
| Import types from `@/types`                                         | Import types from service files               |

### Architecture

| ✅ DO                                                       | ❌ DON'T                                        |
| ----------------------------------------------------------- | ----------------------------------------------- |
| Keep `api/services/` pure (no React imports)                | Import hooks or context in service files        |
| Export a barrel `index.ts` from every folder                | Use deep relative imports across folders        |
| Add new screens inside `app/` using Expo Router conventions | Create screens outside `app/`                   |
| Use `ThemedSafeAreaView` when safe area handling is needed  | Use `SafeAreaView` from `react-native` directly |
| Use `@/` alias for all imports                              | Use relative `../../` imports                   |
| Access env vars via `env.*` from `@/lib/config/env`         | Read `process.env` directly in feature code     |
