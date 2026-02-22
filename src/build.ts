import * as esbuild from 'esbuild';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.dirname(path.dirname(__filename));
const DIST = path.join(ROOT, 'dist');

async function build() {
  try {
    console.log('Building cephie-ui...\n');

    try {
      await fs.rm(DIST, { recursive: true, force: true });
    } catch {}
    await fs.mkdir(DIST, { recursive: true });

    console.log('Generating CSS...');
    execSync(
      'bunx tailwindcss -i src/tailwind.css -o dist/styles.css --minify --config tailwind.config.cjs',
      { stdio: 'inherit' }
    );

    console.log('Building ESM...');
    await esbuild.build({
      entryPoints: ['src/components/index.ts'],
      outdir: 'dist',
      format: 'esm',
      target: 'es2020',
      sourcemap: true,
      bundle: true,
      external: ['react', 'react-dom'],
    });

    console.log('Building CommonJS...');
    await esbuild.build({
      entryPoints: ['src/components/index.ts'],
      outdir: 'dist',
      outExtension: { '.js': '.cjs' },
      format: 'cjs',
      target: 'es2020',
      sourcemap: true,
      bundle: true,
      external: ['react', 'react-dom'],
    });

    console.log('\nBuild complete!\n');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
