import { gzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';

const js = readFileSync(new URL('../packages/react/dist/index.js', import.meta.url));
const css = readFileSync(new URL('../packages/react/dist/styles.css', import.meta.url));
const jsGzip = gzipSync(js).length;
const cssGzip = gzipSync(css).length;
const limit = 15 * 1024;

console.log(`@sutra-ui/react JS  ${jsGzip} bytes gzipped`);
console.log(`@sutra-ui/react CSS ${cssGzip} bytes gzipped`);

if (jsGzip > limit) {
  console.error(`Core component JavaScript is ${jsGzip} bytes gzipped. The limit is ${limit} bytes.`);
  process.exit(1);
}
