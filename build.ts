#!/usr/bin/env bun
import path from 'node:path';
import plugin from 'bun-plugin-tailwind';

await Bun.$`rm -rf dist`;

const start = performance.now();

const result = await Bun.build({
  entrypoints: ['src/frontend/index.html'],
  outdir: 'dist',
  plugins: [plugin],
  minify: true,
  target: 'browser',
  sourcemap: 'linked',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});

const end = performance.now();

const outputTable = result.outputs.map((output) => ({
  File: path.relative(process.cwd(), output.path),
  Type: output.kind,
  Size: `${(output.size / 1024).toFixed(2)} KB`,
}));

console.table(outputTable);
const buildTime = (end - start).toFixed(2);

console.log(`\n✅ Build completed in ${buildTime}ms\n`);
