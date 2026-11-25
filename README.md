# Sutra UI

Sutra UI is a public, open-source design system for fast, accessible, India-first web tools: calculators, converters, and generators. It is meant for static Next.js sites written in React and TypeScript.

The visual language is calm on purpose. Warm paper, peacock ink, and a single marigold thread. Numbers use Indian grouping. Hindi and English share one type stack that is comfortable for Devanagari.

## Packages

| Package | Name | What it ships |
| --- | --- | --- |
| `packages/tokens` | `@sutra-ui/tokens` | W3C DTCG tokens, CSS variables, Tailwind preset |
| `packages/react` | `@sutra-ui/react` | Accessible React components and `styles.css` |
| `apps/docs` | private | Documentation site |

The core component JavaScript stays under 15KB gzipped. There is no runtime CSS-in-JS.

## Quick start

Install the packages when they are published, or depend on this repo with pnpm workspaces while developing.

```bash
pnpm add @sutra-ui/tokens @sutra-ui/react
```

Load the OFL fonts Inter, Noto Sans Devanagari, and IBM Plex Mono, then the stylesheet:

```tsx
import "@sutra-ui/react/styles.css";
import { NumberInput, SutraProvider, ToolLayout } from "@sutra-ui/react";

export default function Page() {
  return (
    <SutraProvider>
      <ToolLayout
        title="CTC calculator"
        breadcrumb={[{ href: "/", label: "Home" }, { label: "CTC" }]}
      >
        <NumberInput label="Annual CTC" mode="currency" decimals={0} value={1200000} onValueChange={() => {}} />
      </ToolLayout>
    </SutraProvider>
  );
}
```

Put this script before the app renders so the saved theme does not flash. It is exported from a module that does not pull in React:

```tsx
import { themeInitScript } from "@sutra-ui/react/theme-script";

<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
```

### Themes

Set `data-theme` on the document element to `light`, `dark`, `high-contrast`, or `system`. `ThemeSwitcher` does this for you and stores the choice. `system` follows `prefers-color-scheme`. Durations drop to `0ms` under `prefers-reduced-motion`.

### Tailwind

The preset maps Sutra tokens onto CSS variables, so utilities follow the active theme.

```js
// tailwind.config.js
module.exports = {
  presets: [require("@sutra-ui/tokens/tailwind-preset")],
  content: ["./app/**/*.{ts,tsx}"],
};
```

```css
@import "@sutra-ui/tokens/css";
```

### Fonts

| Font | Role | Licence |
| --- | --- | --- |
| Inter | Latin UI text | SIL Open Font License |
| Noto Sans Devanagari | Hindi | SIL Open Font License |
| IBM Plex Mono | Figures and code | SIL Open Font License |

The token stack is `"Inter", "Noto Sans Devanagari", "Nirmala UI", "Mangal", sans-serif`. Body line height is 1.5 so Devanagari has room.

## Develop

```bash
pnpm install
pnpm dev
```

Checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build:libs
pnpm size
```

`pnpm test` includes the WCAG AA contrast contract for light, dark, and high-contrast themes, plus Testing Library and axe coverage for the components.

## Publishing

These packages are set up for npm under the public scope `@sutra-ui`. This repository does not publish from CI, and the packages are not on npm yet. Publish them yourself when you are ready:

1. Create the `@sutra-ui` scope on npm and log in (`npm login`), or export `NPM_TOKEN` for a trusted publisher.
2. Describe the release with `pnpm changeset`.
3. Apply versions and changelogs with `pnpm version-packages`.
4. Commit the version bump.
5. Build the public packages with `pnpm build:libs`.
6. Publish with `pnpm exec changeset publish`.

`changeset publish` reads the versions, packs `@sutra-ui/tokens` and `@sutra-ui/react` (`access` is `public`), and skips the private docs app. Do not add a GitHub Action that runs that command unless a person is meant to release.

## Documentation site

The docs app is a static Next.js export. On the `main` branch, `.github/workflows/docs.yml` builds it with `GITHUB_PAGES=true` (base path `/sutra-ui`) and deploys to GitHub Pages. Enable Pages for this repository and choose **GitHub Actions** as the source.

Locally, `pnpm dev` serves the docs without a base path.

## License

[MIT](LICENSE). Community expectations are in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Contribution steps are in [CONTRIBUTING.md](CONTRIBUTING.md).
