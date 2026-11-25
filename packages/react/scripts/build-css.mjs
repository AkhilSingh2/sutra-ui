import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const pkg = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = readFileSync(join(pkg, '../tokens/dist/sutra.css'), 'utf8');
const components = readFileSync(join(pkg, 'src/styles.css'), 'utf8');
const dist = join(pkg, 'dist');
mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, 'styles.css'), `${tokens}\n${components}`);

const jsPath = join(dist, 'index.js');
const js = readFileSync(jsPath, 'utf8');
if (!js.startsWith('"use client"')) {
  writeFileSync(jsPath, `"use client";\n${js}`);
}
