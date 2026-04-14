/**
 * build.js
 *
 * A simple build script that copies src/ into dist/.
 * This represents the "build" step in the CI/CD pipeline.
 *
 * In a real project this might run a TypeScript compiler,
 * Babel transpilation, or a bundler like Rollup/esbuild.
 * Here we keep it simple so the focus stays on the pipeline.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

// Clean and recreate dist/
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// Copy every file from src/ to dist/
const files = fs.readdirSync(SRC_DIR);
files.forEach((file) => {
  const src = path.join(SRC_DIR, file);
  const dest = path.join(DIST_DIR, file);
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${file}`);
});

console.log(`\nBuild complete — ${files.length} file(s) written to dist/`);
