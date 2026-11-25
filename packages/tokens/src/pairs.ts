export type ContrastPair = {
  foreground: string;
  background: string;
  minimum: number;
  kind: 'text' | 'ui';
};

const textBackgrounds = [
  'color.bg.canvas',
  'color.bg.surface',
  'color.bg.subtle',
  'color.bg.sunken',
  'color.bg.primary-subtle',
  'color.bg.accent-subtle',
  'color.bg.danger-subtle',
  'color.bg.success-subtle',
  'color.bg.warning-subtle',
  'color.bg.info-subtle',
] as const;

function text(foreground: string, backgrounds: readonly string[]): ContrastPair[] {
  return backgrounds.map((background) => ({
    foreground,
    background,
    minimum: 4.5,
    kind: 'text' as const,
  }));
}

function ui(foreground: string, background: string): ContrastPair {
  return { foreground, background, minimum: 3, kind: 'ui' };
}

export const contrastPairs: ContrastPair[] = [
  ...text('color.fg.default', textBackgrounds),
  ...text('color.fg.muted', textBackgrounds),
  ...text('color.fg.link', ['color.bg.canvas', 'color.bg.surface', 'color.bg.subtle']),
  ...text('color.fg.primary', ['color.bg.canvas', 'color.bg.surface', 'color.bg.primary-subtle']),
  ...text('color.fg.accent', ['color.bg.canvas', 'color.bg.surface', 'color.bg.accent-subtle']),
  ...text('color.fg.danger', ['color.bg.canvas', 'color.bg.surface', 'color.bg.danger-subtle']),
  ...text('color.fg.success', ['color.bg.canvas', 'color.bg.surface', 'color.bg.success-subtle']),
  ...text('color.fg.warning', ['color.bg.canvas', 'color.bg.surface', 'color.bg.warning-subtle']),
  ...text('color.fg.info', ['color.bg.canvas', 'color.bg.surface', 'color.bg.info-subtle']),
  {
    foreground: 'color.fg.on-primary',
    background: 'color.bg.primary',
    minimum: 4.5,
    kind: 'text',
  },
  {
    foreground: 'color.fg.on-primary',
    background: 'color.bg.primary-hover',
    minimum: 4.5,
    kind: 'text',
  },
  {
    foreground: 'color.fg.on-accent',
    background: 'color.bg.accent',
    minimum: 4.5,
    kind: 'text',
  },
  {
    foreground: 'color.fg.on-accent',
    background: 'color.bg.accent-hover',
    minimum: 4.5,
    kind: 'text',
  },
  {
    foreground: 'color.fg.on-danger',
    background: 'color.bg.danger',
    minimum: 4.5,
    kind: 'text',
  },
  {
    foreground: 'color.fg.on-danger',
    background: 'color.bg.danger-hover',
    minimum: 4.5,
    kind: 'text',
  },
  {
    foreground: 'color.fg.on-success',
    background: 'color.bg.success',
    minimum: 4.5,
    kind: 'text',
  },
  {
    foreground: 'color.fg.on-inverse',
    background: 'color.bg.inverse',
    minimum: 4.5,
    kind: 'text',
  },
  ui('color.border.default', 'color.bg.canvas'),
  ui('color.border.default', 'color.bg.surface'),
  ui('color.border.default', 'color.bg.subtle'),
  ui('color.border.strong', 'color.bg.canvas'),
  ui('color.focus.ring', 'color.bg.canvas'),
  ui('color.focus.ring', 'color.bg.surface'),
  ui('color.border.primary', 'color.bg.canvas'),
  ui('color.thread.start', 'color.bg.canvas'),
  ui('color.thread.end', 'color.bg.canvas'),
];
