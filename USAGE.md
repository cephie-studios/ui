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

```tsx
// app/layout.tsx
import './globals.css';

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

The components use Tailwind CSS classes. Make sure Tailwind CSS is installed and configured in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Then update your `tailwind.config.js`:

```js
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/cephie-ui/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
