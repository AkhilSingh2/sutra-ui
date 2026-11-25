'use client';

import { useSutra } from '@sutra-ui/react';
import meta from '@sutra-ui/tokens/meta';
import { useEffect, useState } from 'react';

const groups = ['color', 'font', 'space', 'radius', 'shadow', 'motion'] as const;

export function TokenViewer() {
  const { theme } = useSutra();
  const [live, setLive] = useState<Record<string, string>>({});
  const [reduced, setReduced] = useState(false);
  const [moved, setMoved] = useState(false);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    for (const token of meta) next[token.name] = styles.getPropertyValue(token.name).trim();
    setLive(next);
  }, [theme, reduced]);

  useEffect(() => {
    const root = document.documentElement;
    const names = ['--sutra-motion-duration-fast', '--sutra-motion-duration-normal', '--sutra-motion-duration-slow'];
    if (reduced) {
      for (const name of names) root.style.setProperty(name, '0ms');
    } else {
      for (const name of names) root.style.removeProperty(name);
    }
    return () => {
      for (const name of names) root.style.removeProperty(name);
    };
  }, [reduced]);

  async function copy(name: string) {
    await navigator.clipboard.writeText(`var(${name})`);
    setCopied(name);
  }

  return (
    <div>
      <div className="docs-actions">
        <button type="button" className="sutra-button sutra-button--secondary sutra-button--sm" aria-pressed={reduced} onClick={() => setReduced((value) => !value)}>
          {reduced ? 'Reduced motion on' : 'Preview reduced motion'}
        </button>
        <button type="button" className="sutra-button sutra-button--ghost sutra-button--sm" onClick={() => setMoved((value) => !value)}>
          Play motion
        </button>
        <span aria-live="polite">
          {copied ? `Copied ${copied}` : ''}
        </span>
      </div>
      {groups.map((group) => {
        const tokens = meta.filter((token) => token.path.startsWith(`${group}.`) && !token.path.startsWith('color.paper') && !token.path.startsWith('color.peacock') && !token.path.startsWith('color.marigold') && !token.path.startsWith('color.clay') && !token.path.startsWith('color.grove') && !token.path.startsWith('color.indigo') && token.path !== 'color.white' && token.path !== 'color.black' && token.path !== 'color.cream');
        const visible = group === 'color' ? meta.filter((token) => token.path.startsWith('color.bg.') || token.path.startsWith('color.fg.') || token.path.startsWith('color.border.') || token.path.startsWith('color.focus.') || token.path.startsWith('color.thread.')) : tokens;
        return (
          <section key={group} className="token-group">
            <h2>{group}</h2>
            {group === 'font' ? <TypeSpecimen /> : null}
            {group === 'motion' ? <div className="motion-box" data-on={moved ? 'true' : 'false'} /> : null}
            <div className="token-grid">
              {visible.map((token) => {
                const value = live[token.name] || token.value;
                return (
                  <button key={token.name} type="button" className="token-swatch" onClick={() => void copy(token.name)}>
                    {token.type === 'color' ? <span className="token-chip" style={{ background: value }} /> : null}
                    {token.type === 'dimension' && token.path.startsWith('space.') ? <span className="space-bar" style={{ width: value }} /> : null}
                    {token.path.startsWith('radius.') ? <span className="radius-box" style={{ borderRadius: value }} /> : null}
                    {token.path.startsWith('shadow.') ? <span className="shadow-box" style={{ boxShadow: value }} /> : null}
                    <code>{token.name}</code>
                    <span>{value}</span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
      <section className="token-group">
        <h2>Palette</h2>
        <div className="token-grid">
          {meta
            .filter((token) => token.type === 'color' && !token.path.startsWith('color.bg.') && !token.path.startsWith('color.fg.') && !token.path.startsWith('color.border.') && !token.path.startsWith('color.focus.') && !token.path.startsWith('color.thread.'))
            .map((token) => (
              <button key={token.name} type="button" className="token-swatch" onClick={() => void copy(token.name)}>
                <span className="token-chip" style={{ background: token.value }} />
                <code>{token.path}</code>
                <span>{token.value}</span>
              </button>
            ))}
        </div>
      </section>
    </div>
  );
}

function TypeSpecimen() {
  return (
    <div className="specimen">
      <p className="docs-lede" style={{ fontFamily: 'var(--sutra-font-family-sans)', margin: 0 }}>
        Inter for Latin, Noto Sans Devanagari for Hindi.
      </p>
      <p lang="hi" style={{ fontFamily: 'var(--sutra-font-family-sans)', fontSize: 'var(--sutra-font-size-xl)', lineHeight: 'var(--sutra-font-line-xl)', margin: 0 }}>
        आपका कर योग्य वेतन १८ लाख है।
      </p>
      <p className="specimen-meta" style={{ fontFamily: 'var(--sutra-font-family-mono)', margin: 0 }}>
        IBM Plex Mono · ₹18,00,000
      </p>
    </div>
  );
}
