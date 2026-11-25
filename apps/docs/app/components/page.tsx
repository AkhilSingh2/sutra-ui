'use client';

import { ComponentDocs } from '../../components/ComponentDocs';

export default function ComponentsPage() {
  return (
    <article>
      <div className="docs-stack">
        <p className="docs-kicker">Components</p>
        <h1 className="docs-reveal">The collection.</h1>
        <div className="docs-rule" aria-hidden="true" />
        <p className="docs-lede">
          Every control is on the keyboard path, named out loud, and shown in the variants a tool uses.
          The library is ESM, with no CSS-in-JS runtime.
        </p>
      </div>
      <ComponentDocs />
    </article>
  );
}
