# 🎨 cephie-ui

A production-ready React component library built with TypeScript, optimized for Next.js, and compiled with Bun.

## Installation

```bash
npm install cephie-ui
# or
yarn add cephie-ui
# or
bun add cephie-ui
```

After installing, import the stylesheet **once** in your app entry point (e.g. `layout.tsx`, `_app.tsx`, or `main.tsx`). This is always required — styles are not injected automatically:

```ts
import 'cephie-ui/styles.css';
```

> **Note for Tailwind v4 users:** The bundled `styles.css` is compiled with Tailwind v3. If your app uses Tailwind v4, you can skip the CSS import and instead add `transpilePackages: ['cephie-ui']` to your `next.config.ts` so Tailwind v4 scans and compiles the component sources directly.

## Usage

See [USAGE.md](USAGE.md) for full component docs and examples.
