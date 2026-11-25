'use client';

import { TokenViewer } from '../../components/TokenViewer';

export default function FoundationsPage() {
  return (
    <article className="docs-stack">
      <p className="docs-kicker">Tokens</p>
      <h1 className="docs-reveal">The material.</h1>
      <div className="docs-rule" aria-hidden="true" />
      <p className="docs-lede">
        Colour, type, space, radius, shadow, and motion are authored once as W3C DTCG JSON. These swatches
        read the live CSS variables, so they follow the theme. Text pairs are checked for WCAG AA.
      </p>
      <TokenViewer />
    </article>
  );
}
