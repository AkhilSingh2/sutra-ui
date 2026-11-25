import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { contrastPairs } from './pairs';
import { contrastRatio } from './contrast';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const themes = ['light', 'dark', 'high-contrast'] as const;

describe('WCAG AA colour tokens', () => {
  for (const theme of themes) {
    const values = JSON.parse(readFileSync(join(dist, `${theme}.json`), 'utf8')) as Record<
      string,
      string
    >;

    it(`${theme} meets the contrast contract`, () => {
      const failures = contrastPairs.flatMap((pair) => {
        const foreground = values[pair.foreground];
        const background = values[pair.background];
        const ratio = contrastRatio(foreground, background);
        return ratio + 0.001 < pair.minimum
          ? [`${pair.foreground} on ${pair.background} is ${ratio.toFixed(2)}:1 (needs ${pair.minimum}:1)`]
          : [];
      });
      expect(failures).toEqual([]);
    });
  }
});

describe('reduced motion', () => {
  it('zeroes durations inside prefers-reduced-motion', () => {
    const css = readFileSync(join(dist, 'sutra.css'), 'utf8');
    const block = css.split('@media (prefers-reduced-motion: reduce)')[1];
    expect(block).toBeTruthy();
    expect(block).toContain('--sutra-motion-duration-fast: 0ms;');
    expect(block).toContain('--sutra-motion-duration-normal: 0ms;');
    expect(block).toContain('--sutra-motion-duration-slow: 0ms;');
    expect(css).toContain('[data-theme="dark"]');
    expect(css).toContain('[data-theme="high-contrast"]');
    expect(css).toContain('"Noto Sans Devanagari"');
    expect(css).toContain('Fraunces');
    expect(css).toContain('Inter');
    expect(css).toContain('"IBM Plex Mono"');
  });
});

describe('tailwind preset', () => {
  it('points semantic colours at CSS variables', () => {
    const preset = readFileSync(join(dist, 'tailwind-preset.js'), 'utf8');
    expect(preset).toContain('"canvas": "var(--sutra-color-bg-canvas)"');
    expect(preset).toContain('"primary": "var(--sutra-color-bg-primary)"');
    expect(preset).toContain('Noto Sans Devanagari');
  });
});
