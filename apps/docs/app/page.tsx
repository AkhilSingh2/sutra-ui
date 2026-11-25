import { Button } from '@sutra-ui/react';
import type { Metadata } from 'next';
import { href } from '../lib/href';

export const metadata: Metadata = { title: 'Index' };

export default function HomePage() {
  return (
    <article className="docs-home">
      <section className="docs-hero">
        <div className="docs-hero-copy">
          <p className="docs-kicker">Gallery edition</p>
          <h1>Sutra</h1>
          <div className="docs-rule" aria-hidden="true" />
          <p className="docs-lede">
            A design system for tools that handle money and measure. The Indian references are in the
            line, the numeral, and the language — not in a louder colour.
          </p>
          <p lang="hi" className="docs-hi">
            वेतन, कर और अंक, एक शांत पंक्ति में।
          </p>
          <div className="docs-actions">
            <Button href={href('/components')}>View the components</Button>
            <Button href={href('/philosophy')} variant="secondary">
              Read the principles
            </Button>
          </div>
        </div>
        <aside className="docs-hero-plate" aria-hidden="true">
          <span>01 — Ink</span>
          <svg viewBox="0 0 240 320" className="docs-hero-stroke">
            <path className="sutra-ink" pathLength="1" d="M28 28h24M28 28v24M212 28h-24M212 28v24M28 292h24M28 292v-24M212 292h-24M212 292v-24" />
            <path className="sutra-ink" pathLength="1" d="M46 278h148" />
            <path className="sutra-ink" pathLength="1" d="M120 278c-2-48-4-78 0-118" />
            <path className="sutra-ink" pathLength="1" d="M118 214c-36-8-66-30-74-58 30 8 54 28 74 58z" />
            <path className="sutra-ink" pathLength="1" d="M122 196c34-10 62-34 72-62-30 12-52 34-72 62z" />
            <path className="sutra-ink" pathLength="1" d="M120 160c-22-16-28-46 0-66 28 20 22 50 0 66z" />
            <path className="sutra-ink" pathLength="1" d="M120 154c-12-14-12-34 0-46 12 12 12 32 0 46z" />
            <path className="sutra-ink" pathLength="1" d="M148 168c18-6 34-22 38-40-16 10-28 24-38 40z" />
            <path className="sutra-ink" pathLength="1" d="M96 176c-16-4-28-16-30-30 12 6 22 16 30 30z" />
          </svg>
          <span>Kalamkari study</span>
        </aside>
      </section>
      <section className="docs-index">
        <h2>In the collection</h2>
        <ol>
          <li>
            <a href={href('/philosophy')}>
              <span>02</span>
              <strong>Philosophy</strong>
              <em>Why the palette, the type, and the motion are held back.</em>
            </a>
          </li>
          <li>
            <a href={href('/components')}>
              <span>03</span>
              <strong>Components</strong>
              <em>Every control, with its variants, in the same room.</em>
            </a>
          </li>
          <li>
            <a href={href('/foundations')}>
              <span>04</span>
              <strong>Tokens</strong>
              <em>Ivory, ink, gold, oxblood, emerald. Live in both themes.</em>
            </a>
          </li>
          <li>
            <a href={href('/preview')}>
              <span>05</span>
              <strong>Case study</strong>
              <em>An income-tax shell. Illustrative figures, not advice.</em>
            </a>
          </li>
        </ol>
      </section>
      <footer className="docs-colophon">
        <p>
          Fraunces, Inter, Noto Sans Devanagari, and IBM Plex Mono are SIL Open Font License faces.
          Install with <code>pnpm add @sutra-ui/tokens @sutra-ui/react</code>.
        </p>
      </footer>
    </article>
  );
}
