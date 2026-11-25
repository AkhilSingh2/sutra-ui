# Contributing to Sutra UI

Sutra UI is a public design system for fast, accessible, India-first web tools
such as calculators, converters, and generators. Thank you for helping it stay
calm, accurate, and usable.

## Prerequisites

- Node.js 22 (see `.nvmrc`)
- pnpm 10 (`corepack enable` is enough)

## Setup

```bash
pnpm install
pnpm build:libs
pnpm dev
```

`pnpm dev` builds the tokens and the React package, then starts the docs site.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm size
```

`pnpm typecheck` builds `@sutra-ui/tokens` and `@sutra-ui/react` first. The docs app typechecks the published entry points, which only exist after that build.

`pnpm test` includes the WCAG AA contrast test for every semantic colour pair
in light, dark, and high-contrast themes. `pnpm size` fails if the core
component JavaScript exceeds 15KB gzipped.

## Project layout

- `packages/tokens` — W3C DTCG token JSON, Style Dictionary build, CSS variables, Tailwind preset
- `packages/react` — accessible React components and the component stylesheet
- `apps/docs` — Next.js documentation site

## Design rules

- Tokens are the source of truth. Components consume CSS variables, not raw hex values.
- Do not add a CSS-in-JS runtime. Style with `styles.css` and the token variables.
- New text or UI colours need a pair in `packages/tokens/src/pairs.ts` that meets WCAG AA (4.5:1 for text, 3:1 for UI boundaries and focus rings).
- Components must work with the keyboard and a screen reader. Cover new interactions with Testing Library and axe.
- Indian number formatting belongs in `formatIndianNumber`. Do not hand-roll grouping in a component.
- Keep the published JavaScript tree-shakeable: no side effects in modules, and do not import CSS from TypeScript.
- Prefer the system font stack fallbacks already in the tokens (`Nirmala UI`, `Mangal`) when Devanagari webfonts have not loaded.

## Changesets

Public packages are `@sutra-ui/tokens` and `@sutra-ui/react`. Add a changeset with every user-facing change:

```bash
pnpm changeset
```

Publishing steps live in the root README. This repo does not publish to npm from CI.

## Pull requests

- Describe the user-facing change.
- Include screenshots for visual changes in light and dark themes.
- Confirm `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm size` pass.

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).
