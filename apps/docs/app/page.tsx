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
          <h1 className="docs-reveal">
            Sutra
          </h1>
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
            <path className="sutra-ink" d="M40 40 C 80 20, 70 120, 120 140 S 200 180, 190 280" />
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
