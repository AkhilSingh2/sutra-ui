'use client';

import { ComponentDocs } from '../../components/ComponentDocs';

export default function ComponentsPage() {
  return (
    <article>
      <div className="docs-stack">
        <p className="docs-kicker">Components</p>
        <h1>Controls for tools</h1>
        <div className="sutra-thread" aria-hidden="true" />
        <p>
          Every control is reachable from the keyboard. Labels are visible. The React package ships as ESM
          with no CSS-in-JS runtime. Import the stylesheet once.
        </p>
      </div>
      <ComponentDocs />
    </article>
  );
}
