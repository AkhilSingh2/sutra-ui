import { Button } from '@sutra-ui/react';
import type { Metadata } from 'next';
import { href } from '../lib/href';

export const metadata: Metadata = { title: 'Overview' };

export default function HomePage() {
  return (
    <article className="docs-prose">
      <p className="docs-kicker">Open source · India-first tools</p>
      <h1>A calm thread for numbers people trust.</h1>
      <div className="sutra-thread" aria-hidden="true" />
      <p className="docs-lede">
        Sutra UI is a public design system for calculators, converters, and generators. It is built for
        Next.js static sites, with Devanagari-ready type, Indian number formatting, and themes that meet
        WCAG AA.
      </p>
      <p lang="hi" className="docs-hi">
        वेतन, कर, अंक और रूपांतरण — साफ़ अक्षरों में, हल्की और गहरी थीम के साथ।
      </p>
      <div className="docs-actions">
        <Button href={href('/preview')}>Open a tool preview</Button>
        <Button href={href('/foundations')} variant="secondary">
          View tokens
        </Button>
      </div>
      <div className="docs-grid">
        <section>
          <h2>Trustworthy</h2>
          <p>Warm paper, peacock ink, and a marigold thread. Colour is never the only signal.</p>
        </section>
        <section>
          <h2>India-first</h2>
          <p>Lakh and crore grouping, an INR mode, and Hindi labels for the controls themselves.</p>
        </section>
        <section>
          <h2>Lightweight</h2>
          <p>CSS variables, no runtime CSS-in-JS, and a core bundle under 15KB gzipped.</p>
        </section>
      </div>
      <h2>Install</h2>
      <pre className="docs-code">
        <code>{`pnpm add @sutra-ui/tokens @sutra-ui/react`}</code>
      </pre>
      <h2>Use it in a Next.js page</h2>
      <pre className="docs-code">
        <code>{`import "@sutra-ui/react/styles.css";
import { SutraProvider, NumberInput, ToolLayout } from "@sutra-ui/react";

export default function Page() {
  return (
    <SutraProvider>
      <ToolLayout title="CTC calculator" breadcrumb={[{ href: "/", label: "Home" }, { label: "CTC" }]}>
        <NumberInput label="Annual CTC" mode="currency" value={1200000} onValueChange={() => {}} />
      </ToolLayout>
    </SutraProvider>
  );
}`}</code>
      </pre>
      <p>
        Load Inter, Noto Sans Devanagari, and IBM Plex Mono yourself. All three are SIL Open Font License
        fonts. The token stack falls back to Nirmala UI and Mangal when the webfont has not arrived.
      </p>
    </article>
  );
}
