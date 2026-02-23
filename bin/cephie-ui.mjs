#!/usr/bin/env node

/**
 * cephie-ui init
 * - Tailwind v4: adds transpilePackages: ['cephie-ui'] to next.config
 * - Otherwise: adds import 'cephie-ui/styles.css' to app entry (e.g. layout.tsx)
 *
 * Usage: npx cephie-ui [init]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();

function readJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

function hasCephieUi(pkg) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  return Object.keys(deps).some((name) => name === 'cephie-ui');
}

function getTailwindVersion(pkg) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const v = deps.tailwindcss;
  if (!v) return null;
  const major = parseInt(String(v).replace(/^\^|~|>=?|<=?/g, '').split('.')[0], 10);
  return isNaN(major) ? null : major;
}

function findNextConfig() {
  const names = ['next.config.ts', 'next.config.mjs', 'next.config.js'];
  for (const name of names) {
    const p = path.join(cwd, name);
    if (fs.existsSync(p)) return { path: p, content: fs.readFileSync(p, 'utf8') };
  }
  return null;
}

function patchNextConfigTranspile(filePath, content) {
  const alreadyHas = /transpilePackages\s*:\s*\[[\s\S]*?['"]cephie-ui['"]/i.test(content);
  if (alreadyHas) return { updated: false, content };

  const hasTranspile = /transpilePackages\s*:\s*\[/.test(content);
  if (hasTranspile) {
    const newContent = content.replace(
      /(transpilePackages\s*:\s*\[)([\s\S]*?)(\])/,
      (_, open, inner, close) => {
        const trimmed = inner.trim();
        const rest = trimmed ? (trimmed.endsWith(',') ? `${trimmed} 'cephie-ui'` : `${trimmed}, 'cephie-ui'`) : "'cephie-ui'";
        return `${open}${rest}${close}`;
      }
    );
    if (newContent !== content) return { updated: true, content: newContent };
  }

  const insert = "transpilePackages: ['cephie-ui'],";
  let newContent = content;
  const configMatch = content.match(/(const\s+nextConfig\s*[^=]*=\s*\{)/);
  if (configMatch) {
    const idx = content.indexOf(configMatch[1]) + configMatch[1].length;
    newContent = content.slice(0, idx) + '\n  ' + insert + content.slice(idx);
  } else if (content.startsWith('{') || content.match(/\n\s*\{/)) {
    const firstBrace = content.indexOf('{');
    newContent = content.slice(0, firstBrace + 1) + '\n  ' + insert + content.slice(firstBrace + 1);
  }
  return { updated: newContent !== content, content: newContent };
}

function findAppEntry() {
  const candidates = [
    'app/layout.tsx',
    'app/layout.jsx',
    'src/app/layout.tsx',
    'src/app/layout.jsx',
    'pages/_app.tsx',
    'pages/_app.jsx',
    'src/pages/_app.tsx',
    'src/main.tsx',
    'src/main.jsx',
    'main.tsx',
    'main.jsx',
  ];
  for (const rel of candidates) {
    const p = path.join(cwd, rel);
    if (fs.existsSync(p)) return { path: p, content: fs.readFileSync(p, 'utf8') };
  }
  return null;
}

function addStylesImport(content) {
  const importLine = "import 'cephie-ui/styles.css';";
  if (content.includes("cephie-ui/styles.css")) return { updated: false, content };
  const insert = importLine + '\n';
  const firstImport = content.match(/^(\s*)(import\s)/m);
  const idx = firstImport ? content.indexOf(firstImport[0]) : 0;
  const newContent = content.slice(0, idx) + insert + content.slice(idx);
  return { updated: true, content: newContent };
}

function main() {
  const arg = (process.argv[2] || 'init').toLowerCase();
  if (arg !== 'init' && arg !== 'setup') {
    console.log('Usage: npx cephie-ui init');
    console.log('');
    console.log('  Applies cephie-ui setup from the README:');
    console.log('  - Tailwind v4: adds transpilePackages to next.config');
    console.log('  - Otherwise: adds import "cephie-ui/styles.css" to your app entry');
    process.exit(0);
  }

  const pkgPath = path.join(cwd, 'package.json');
  const pkg = readJson(pkgPath);
  if (!pkg) {
    console.error('No package.json found in current directory. Run this from your project root.');
    process.exit(1);
  }

  if (!hasCephieUi(pkg)) {
    console.error('cephie-ui is not installed. Run: npm install cephie-ui');
    process.exit(1);
  }

  const twVersion = getTailwindVersion(pkg);
  const isV4 = twVersion === 4;

  if (isV4) {
    const next = findNextConfig();
    if (!next) {
      console.error('No next.config.ts/js/mjs found. Add transpilePackages: [\'cephie-ui\'] to your Next config manually.');
      process.exit(1);
    }
    const { updated, content } = patchNextConfigTranspile(next.path, next.content);
    if (updated) {
      fs.writeFileSync(next.path, content, 'utf8');
      console.log('Updated', path.relative(cwd, next.path), '– added transpilePackages: [\'cephie-ui\']');
      console.log('Tailwind v4: you can skip importing "cephie-ui/styles.css".');
    } else {
      console.log('next.config already includes cephie-ui in transpilePackages.');
    }
    return;
  }

  const entry = findAppEntry();
  if (!entry) {
    console.error('Could not find app entry (app/layout.tsx, pages/_app.tsx, main.tsx, etc.). Add this manually:');
    console.error("  import 'cephie-ui/styles.css';");
    process.exit(1);
  }
  const { updated, content } = addStylesImport(entry.content);
  if (updated) {
    fs.writeFileSync(entry.path, content, 'utf8');
    console.log('Updated', path.relative(cwd, entry.path), '– added import "cephie-ui/styles.css"');
  } else {
    console.log('App entry already imports cephie-ui/styles.css.');
  }
}

main();
