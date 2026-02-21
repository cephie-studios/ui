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

### Badge Component

```tsx
import { Badge } from 'cephie-ui';

export default function MyComponent() {
  return (
    <>
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </>
  );
}
```

## Development

### Install Dependencies

```bash
bun install
```

### Build

```bash
bun run build
```

### Watch Mode

```bash
bun run dev
```

## Components

- **Dropdown** - Flexible dropdown menu component
- **Button** - Styled button with variants and sizes
- **Badge** - Status badge with multiple variants

## Features

✅ Built with TypeScript
✅ React 18+ compatible
✅ Next.js ready
✅ ESM and CommonJS support
✅ Tree-shakeable
✅ Fully typed
✅ Tailwind CSS ready

## License

ISC
