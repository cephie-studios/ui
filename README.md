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

## Usage

### Dropdown Component

```tsx
import { Dropdown, DropdownItem } from 'cephie-ui';

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
import { Button } from 'cephie-ui';

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
