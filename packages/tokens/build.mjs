import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const root = dirname(fileURLToPath(import.meta.url));
const tokensDir = join(root, 'tokens');
const outDir = join(root, 'dist');

const foundation = ['typography.json', 'spacing.json', 'radius.json', 'motion.json'].map((file) =>
  join(tokensDir, file),
);

const themes = {
  light: ['color.primitive.json', 'color.light.json', ...foundation.map((file) => file)],
  dark: ['color.primitive.json', 'color.dark.json', ...foundation.map((file) => file)],
  'high-contrast': [
    'color.primitive.json',
    'color.high-contrast.json',
    ...foundation.map((file) => file),
  ],
};

function cssName(path) {
  return `--sutra-${path.join('-')}`;
}

function quoteFamily(name) {
  return /\s/.test(name) ? `"${name}"` : name;
}

function shadowToCss(value) {
  const layers = Array.isArray(value) ? value : [value];
  return layers
    .map((layer) => {
      if (!layer || typeof layer !== 'object') {
        throw new Error(`Unexpected shadow layer: ${JSON.stringify(value)}`);
      }
      const offsetX = layer.offsetX ?? layer.x;
      const offsetY = layer.offsetY ?? layer.y;
      const blur = layer.blur;
      const spread = layer.spread ?? '0px';
      const color = layer.color;
      if (offsetX === undefined) {
        throw new Error(`Unexpected shadow layer: ${JSON.stringify(layer)}`);
      }
      return `${offsetX} ${offsetY} ${blur} ${spread} ${color}`;
    })
    .join(', ');
}

export function cssValue(type, value) {
  if (type === 'fontFamily' && Array.isArray(value)) {
    return value.map(quoteFamily).join(', ');
  }
  if (type === 'cubicBezier' && Array.isArray(value)) {
    return `cubic-bezier(${value.join(', ')})`;
  }
  if (type === 'shadow') return shadowToCss(value);
  if (typeof value === 'number') return String(value);
  return String(value);
}

async function resolveTheme(files) {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: files.map((file) => (file.startsWith(tokensDir) ? file : join(tokensDir, file))),
    log: { verbosity: 'silent', warnings: 'disabled' },
    platforms: {
      raw: {
        transforms: [],
        buildPath: join(outDir, '.sd') + '/',
        files: [
          {
            destination: 'tokens.json',
            format: 'sutra/json',
          },
        ],
      },
    },
    hooks: {
      formats: {
        'sutra/json': ({ dictionary }) =>
          JSON.stringify(
            dictionary.allTokens.map((token) => ({
              path: token.path,
              type: token.$type ?? token.type,
              value: token.value ?? token.$value,
              description: token.$description ?? token.description,
            })),
          ),
      },
    },
  });
  await sd.buildAllPlatforms();
  const written = JSON.parse(await readFile(join(outDir, '.sd', 'tokens.json'), 'utf8'));
  const flat = {};
  for (const token of written) {
    if (token.value && typeof token.value === 'object' && token.value.value && token.path === undefined) {
      continue;
    }
    flat[token.path.join('.')] = token;
  }
  return flat;
}

function declarations(flat) {
  return Object.entries(flat)
    .map(([path, token]) => {
      const value = cssValue(token.type, token.value);
      if (value.includes('{') || value === '[object Object]') {
        throw new Error(`Unresolved token ${path}: ${value}`);
      }
      return `  ${cssName(path.split('.'))}: ${value};`;
    })
    .join('\n');
}

function overrides(base, theme) {
  return Object.entries(theme)
    .filter(([path, token]) => cssValue(token.type, token.value) !== cssValue(base[path].type, base[path].value))
    .map(([path, token]) => `  ${cssName(path.split('.'))}: ${cssValue(token.type, token.value)};`)
    .join('\n');
}

function presetFrom(flat) {
  const color = (path) => `var(${cssName(path.split('.'))})`;
  const fontSize = (step) => [
    `var(--sutra-font-size-${step})`,
    { lineHeight: `var(--sutra-font-line-${step})` },
  ];
  return {
    theme: {
      extend: {
        colors: {
          sutra: {
            canvas: color('color.bg.canvas'),
            surface: color('color.bg.surface'),
            subtle: color('color.bg.subtle'),
            sunken: color('color.bg.sunken'),
            inverse: color('color.bg.inverse'),
            ink: color('color.fg.default'),
            muted: color('color.fg.muted'),
            primary: color('color.bg.primary'),
            'primary-hover': color('color.bg.primary-hover'),
            'primary-subtle': color('color.bg.primary-subtle'),
            'on-primary': color('color.fg.on-primary'),
            accent: color('color.bg.accent'),
            'accent-subtle': color('color.bg.accent-subtle'),
            danger: color('color.bg.danger'),
            'danger-subtle': color('color.bg.danger-subtle'),
            success: color('color.bg.success'),
            'success-subtle': color('color.bg.success-subtle'),
            warning: color('color.fg.warning'),
            'warning-subtle': color('color.bg.warning-subtle'),
            info: color('color.fg.info'),
            'info-subtle': color('color.bg.info-subtle'),
            line: color('color.border.default'),
            'line-strong': color('color.border.strong'),
            link: color('color.fg.link'),
            focus: color('color.focus.ring'),
          },
        },
        fontFamily: {
          sans: flat['font.family.sans'].value,
          display: flat['font.family.display'].value,
          mono: flat['font.family.mono'].value,
        },
        fontSize: {
          xs: fontSize('xs'),
          sm: fontSize('sm'),
          base: fontSize('md'),
          lg: fontSize('lg'),
          xl: fontSize('xl'),
          '2xl': fontSize('2xl'),
          '3xl': fontSize('3xl'),
          '4xl': fontSize('4xl'),
          display: fontSize('display'),
        },
        fontWeight: {
          regular: String(flat['font.weight.regular'].value),
          medium: String(flat['font.weight.medium'].value),
          semibold: String(flat['font.weight.semibold'].value),
          bold: String(flat['font.weight.bold'].value),
        },
        spacing: Object.fromEntries(
          Object.keys(flat)
            .filter((path) => path.startsWith('space.'))
            .map((path) => [path.slice('space.'.length), `var(${cssName(path.split('.'))})`]),
        ),
        borderRadius: Object.fromEntries(
          Object.keys(flat)
            .filter((path) => path.startsWith('radius.'))
            .map((path) => [path.slice('radius.'.length), `var(${cssName(path.split('.'))})`]),
        ),
        boxShadow: {
          sm: 'var(--sutra-shadow-sm)',
          md: 'var(--sutra-shadow-md)',
          lg: 'var(--sutra-shadow-lg)',
        },
        transitionDuration: {
          'sutra-fast': 'var(--sutra-motion-duration-fast)',
          'sutra-normal': 'var(--sutra-motion-duration-normal)',
          'sutra-slow': 'var(--sutra-motion-duration-slow)',
        },
        transitionTimingFunction: {
          sutra: 'var(--sutra-motion-easing-standard)',
          'sutra-emphasis': 'var(--sutra-motion-easing-emphasis)',
        },
      },
    },
  };
}

export async function buildTokens() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  const resolved = {};
  for (const [theme, files] of Object.entries(themes)) {
    resolved[theme] = await resolveTheme(files);
    const serialised = {};
    for (const [path, token] of Object.entries(resolved[theme])) {
      serialised[path] = cssValue(token.type, token.value);
    }
    await writeFile(join(outDir, `${theme}.json`), `${JSON.stringify(serialised, null, 2)}\n`);
  }

  const reduced = await resolveTheme(['motion.reduced.json']);
  const light = resolved.light;
  const css = `/* Generated from W3C DTCG tokens by Style Dictionary. Do not edit. */

:root,
[data-theme="light"] {
  color-scheme: light;
${declarations(light)}
}

[data-theme="dark"] {
  color-scheme: dark;
${overrides(light, resolved.dark)}
}

[data-theme="high-contrast"] {
  color-scheme: light;
${overrides(light, resolved['high-contrast'])}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]),
  :root[data-theme="system"] {
    color-scheme: dark;
${overrides(light, resolved.dark)}
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
${overrides(light, { ...light, ...reduced })}
  }
}
`;
  await writeFile(join(outDir, 'sutra.css'), css);

  const meta = Object.entries(light).map(([path, token]) => ({
    path,
    name: cssName(path.split('.')),
    type: token.type,
    value: cssValue(token.type, token.value),
    description: token.description ?? null,
  }));
  await writeFile(join(outDir, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`);

  const preset = presetFrom(light);
  await writeFile(
    join(outDir, 'tailwind-preset.cjs'),
    `'use strict';\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`,
  );
  await writeFile(
    join(outDir, 'tailwind-preset.js'),
    `const preset = ${JSON.stringify(preset, null, 2)};\nexport default preset;\n`,
  );
  await rm(join(outDir, '.sd'), { recursive: true, force: true });
  return { css, meta, resolved };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  await buildTokens();
}
