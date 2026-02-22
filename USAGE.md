# Example Usage

This file shows how to use cephie-ui components in your project.

## React Component Example

```tsx
'use client'; // For Next.js Server Components

import { Dropdown, DropdownItem, Button, Badge } from 'cephie-ui';
import { useState } from 'react';

export default function Dashboard() {
  const [status, setStatus] = useState('active');

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">My Dashboard</h1>

      {/* Badge Example */}
      <div>
        <Badge variant="success">Status: {status}</Badge>
      </div>

      {/* Button Examples */}
      <div className="flex gap-2">
        <Button onClick={() => setStatus('active')}>
          Set Active
        </Button>
        <Button variant="secondary">
          Settings
        </Button>
        <Button variant="danger" size="lg">
          Delete
        </Button>
      </div>

      {/* Dropdown Example */}
      <Dropdown trigger="👤 Profile Menu">
        <DropdownItem onClick={() => console.log('Profile')}>
          View Profile
        </DropdownItem>
        <DropdownItem onClick={() => console.log('Settings')}>
          Settings
        </DropdownItem>
        <DropdownItem onClick={() => console.log('Logout')}>
          Logout
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
```

## Next.js App Router Setup

Import the stylesheet in your root layout. This must be done explicitly — styles are **not** injected automatically:

```tsx
// app/layout.tsx
import './globals.css';
import '@cephie-studios/ui/styles.css'; // required

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

> **Tailwind v4 users:** Instead of importing `styles.css`, add `transpilePackages: ['@cephie-studios/ui']` to `next.config.ts`. This lets Tailwind v4 compile the component sources directly, avoiding any v3/v4 CSS conflicts.

// app/page.tsx
'use client';

import Dashboard from '@/components/Dashboard';

export default function Home() {
  return <Dashboard />;
}
```

## Import Methods

You can import components in multiple ways:

```tsx
// Named imports (recommended)
import { Dropdown, Button, Badge } from 'cephie-ui';

// Default imports per component
import Dropdown from 'cephie-ui/components/Dropdown';
import Button from 'cephie-ui/components/Button';
```

## Styling

The components are styled with Tailwind CSS. The package ships a pre-built `styles.css` (compiled with Tailwind v3) that must be imported manually in your app entry:

```ts
import '@cephie-studios/ui/styles.css';
```

### Tailwind v3 projects

Make sure Tailwind is installed, then include the package output in your `content` list so any classes you pass via `className` props are also generated:

```js
// tailwind.config.js
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@cephie-studios/ui/dist/**/*.js',
  ],
  theme: { extend: {} },
  plugins: [],
};
```

### Tailwind v4 projects

Skip the `styles.css` import. Add `transpilePackages` to `next.config.ts` instead — Tailwind v4 will then scan and compile the component sources as part of your own build, preventing any v3/v4 conflicts:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@cephie-studios/ui'],
};

export default nextConfig;
```
