# Development environment (claude.md)

## 🛠️ Development Environment

* **Language**: TypeScript
* **Framework**: Next.js (App Router)
* **Styling & Component Library**: Chakra UI
* **Data Fetching**: React Query (TanStack)
* **Testing**: Jest + React Testing Library
* **Linting**: ESLint with `@typescript-eslint`
* **Formatting**: Prettier
* **Package Manager**: `pnpm` (preferred)

> NOTE: This document intentionally **does not pin package versions**. Assume the latest stable releases will be used when installing dependencies.

---

## 📂 Recommended Project Structure

```
.
├── app/                     # App Router structure
│   ├── layout.tsx           # root layout — include ChakraProvider here
│   ├── page.tsx
│   ├── api/
├── components/              # UI components (Chakra or custom)
├── hooks/                   # Custom React hooks
├── lib/                     # Client helpers, API wrappers, etc.
├── theme/                   # Chakra theme overrides
├── styles/                  # Global styles (minimal — Chakra handles most)
├── tests/                   # Unit and integration tests
├── public/
├── .eslintrc.js
├── tsconfig.json
├── postcss.config.js        # optional, only if needed (no Tailwind)
├── next.config.js
├── package.json
└── README.md
```

---

## 📦 Installation Notes (assume latest packages)

* Chakra UI core packages (install latest):

```bash
pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

* React Query (TanStack):

```bash
pnpm add @tanstack/react-query
```

* For testing / lint / format, install the usual toolchain (Jest, RTL, ESLint, Prettier) without pinning versions.

* If you use pnpm workspaces or a monorepo, adapt installs accordingly.

---

## ⚙️ Dev Commands

* **Dev server**: `pnpm dev`
* **Build**: `pnpm build`
* **Start**: `pnpm start`
* **Lint**: `pnpm lint`
* **Format**: `pnpm format`
* **Test**: `pnpm test`

---

## 🧩 Chakra UI Setup (quick guide)

1. Wrap your app with `ChakraProvider` in `app/layout.tsx` (or a top-level provider file). Import a custom theme from `/theme` if you want to override tokens.

```tsx
// app/layout.tsx (example)
'use client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}
```

2. Put theme overrides in `theme/index.ts` (colors, fonts, components).
3. Prefer Chakra primitives (`Box`, `Flex`, `Button`, `Heading`, `Input`, `FormControl`, etc.) and compose them into design system components in `/components`.
4. Use Chakra's style props for layout and spacing. Keep utility helper classes minimal; Chakra covers most styling needs.

---

## 🧱 Component Guidelines

* Use Chakra UI components by default for form elements, cards, dialogs, tooltips, etc.
* Co-locate component tests and stories (if using Storybook) with the component folder.
* Keep components themable via `useStyleConfig` or `system` props.
* Prefer composition over deep prop drilling: provide small, focused components.

---

## ⚛️ React Query Patterns

* Set up `QueryClient` in `app/layout.tsx` or a root provider component and wrap the tree with `QueryClientProvider`.
* Use `useQuery`, `useMutation`, `useInfiniteQuery` from `@tanstack/react-query`.
* Keep API logic in `/lib/api` and call via typed hooks in `/hooks`.
* Use query keys prefixed by domain: `['user', id]`.

---

## 📝 Code Style Standards

* Prefer arrow functions.
* Annotate return types.
* Always destructure props.
* Avoid `any` type; use `unknown` or strict generics where appropriate.
* Group imports: React → next → libraries → local.

---

## 🔍 Documentation & Onboarding

* Each component and hook should include a short comment on usage.
* Document top-level files (`app/layout.tsx`, providers, theme) and configs.
* Keep `README.md` up to date with getting started, design tokens, and component usage notes.

---

## 🔐 Security

* Validate all server-side inputs (API routes).
* Use HTTPS-only cookies and CSRF tokens when applicable.
* Protect sensitive routes with middleware or session logic.

---

## 🧩 Custom Slash Commands (for `.claude/commands/`)

* `/generate-hook`: Scaffold a React hook with proper types and a test.
* `/wrap-client-component`: Convert server component to client with a hydration-safe wrapper.
* `/update-theme`: Modify Chakra theme tokens and regenerate tokens.
* `/mock-react-query`: Set up MSW mocks for all `useQuery` keys.

---

## ✅ Notes & Rationale

* This file avoids pinning versions to encourage installing the latest stable packages at setup time. If reproducible builds are required, pin versions in `package.json` or use a lockfile (`pnpm-lock.yaml`).
* Chakra UI was chosen to replace Tailwind + shadcn/ui. It provides an accessible, component-first library suitable for rapid prototyping and production designs while keeping a consistent design token system.

---

If you want, I can also generate a ready-to-drop `app/layout.tsx` + `theme/index.ts` example using Chakra and React Query wiring. Tell me if you want the files scaffolded.
