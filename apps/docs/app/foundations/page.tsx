'use client';

import { TokenViewer } from '../../components/TokenViewer';

export default function FoundationsPage() {
  return (
    <article className="docs-stack">
      <p className="docs-kicker">Foundations</p>
      <h1>Tokens</h1>
      <div className="sutra-thread" aria-hidden="true" />
      <p>
        Colour, type, space, radius, shadow, and motion are authored once as W3C DTCG JSON and built with
        Style Dictionary. This page reads the live CSS variables, so the swatches follow the theme you pick.
        Text pairs are checked against WCAG AA in CI. Body line height stays at 1.5 so Devanagari does not
        collide.
      </p>
      <TokenViewer />
    </article>
  );
}
