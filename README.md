# 🎨 cephie-ui

A production-ready React component library built with TypeScript, optimized for Next.js, and compiled with Bun.

## Installation

```bash
npm install @cephie-studios/ui
# or
yarn add @cephie-studios/ui
# or
bun add @cephie-studios/ui
```

When you import components (ESM), the library's styles are loaded automatically. If styles don't appear (e.g. with CommonJS or some bundlers), add this once in your app entry (e.g. `_app.tsx`, `layout.tsx`, or `main.tsx`):

```ts
import '@cephie-studios/ui/styles.css';
```

## Usage

### Dropdown Component

```tsx
import { Dropdown, DropdownItem } from '@cephie-studios/ui';

export default function MyComponent() {
  return (
    <Dropdown trigger="Menu">
      <DropdownItem onClick={() => console.log('Edit')}>Edit</DropdownItem>
      <DropdownItem onClick={() => console.log('Delete')}>Delete</DropdownItem>
    </Dropdown>
  );
}
```

### Button Component

```tsx
import { Button } from '@cephie-studios/ui';

export default function MyComponent() {
  return (
    <>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger" size="lg">Delete</Button>
    </>
  );
}
```
