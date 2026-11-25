import { Button } from '@sutra-ui/react';
import type { Metadata } from 'next';
import { href } from '../lib/href';

export const metadata: Metadata = { title: 'Overview' };

export default function HomePage() {
  return (
    <article className="docs-prose">
      <section className="docs-hero">
        <p className="docs-kicker">Marigold · rani · peacock</p>
        <h1>Tools worth celebrating.</h1>
        <div className="sutra-thread" aria-hidden="true" />
        <p className="docs-lede">
          Sutra UI is a bold, playful design system for calculators, converters, and generators. Festival
          colours, chunky type, and Indian number formatting, with text that still meets WCAG AA.
        </p>
        <p lang="hi" className="docs-hi">
          वेतन, कर, अंक और रूपांतरण — रंगों के साथ, हल्की और गहरी थीम में।
        </p>
        <div className="docs-actions">
          <Button href={href('/preview')}>Open a tool preview</Button>
          <Button href={href('/foundations')} variant="secondary">
            View tokens
          </Button>
        </div>
      </section>
      <div className="docs-grid">
        <section>
          <h2>Festive</h2>
          <p>Marigold, rani pink, peacock, turmeric, parrot green, and indigo. Colour is never the only signal.</p>
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
        Load Baloo 2 for display, Inter and Noto Sans Devanagari for body text, and IBM Plex Mono for
        figures. All four are SIL Open Font License fonts. Devanagari falls through to Nirmala UI and Mangal
        when the webfont has not arrived.
      </p>
    </article>
  );
}
