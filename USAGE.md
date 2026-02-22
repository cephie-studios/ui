# Usage

This file documents the components in this library and shows how to use them.

## Setup

Import the stylesheet once in your app entry point (styles are not injected automatically):

```tsx
// app/layout.tsx or main.tsx
import 'cephie-ui/styles.css';
```

Tailwind v4 users can skip the CSS import and instead add:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['cephie-ui']
};

export default nextConfig;
```

## Imports

Named imports from the package entry are recommended:

```tsx
import {
  Background,
  Button,
  Dropdown,
  Footer,
  FooterLink,
  FooterLinkHeader,
  LoadingSpinner,
  Navbar,
  NavbarBrand,
  NavbarInner,
  NavbarRow,
  NavbarUserMenu
} from 'cephie-ui';
```

## Background

The `Background` component renders a decorative gradient shape. It is positioned absolutely and ignores pointer events.

Props:
- `className` (string): Extra classes for positioning or opacity.
- `style` (React.CSSProperties): Override the gradient or shape style.

```tsx
import { Background } from 'cephie-ui';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <Background className="opacity-40" />
      <div className="relative z-10">Content here</div>
    </section>
  );
}
```

## Button

The `Button` component supports variants, sizes, light/dark mode styling, and optional links.

Props:
- `variant`: `primary` | `secondary` | `success` | `danger`
- `size`: `xs` | `sm` | `md` | `lg` | `xl`
- `mode`: `light` | `dark`
- `href`: string (renders as link when provided)
- `navbar`: boolean (appends compact navbar sizing classes)
- `newTab`: boolean (only used with `href`)

```tsx
import { Button } from 'cephie-ui';

export default function Actions() {
  return (
    <div className="flex gap-2">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger" size="lg">
        Delete
      </Button>
      <Button mode="dark" variant="secondary" navbar>
        Compact
      </Button>
      <Button href="/apply" size="sm">
        Go to Apply
      </Button>
    </div>
  );
}
```

## Dropdown

The `Dropdown` component renders a custom select control.

Props:
- `label`: string
- `icon`: ReactNode
- `options`: `{ label: string; value: string }[]`
- `value`: string
- `onChange`: `(e) => void`
- `name`, `id`, `required`
- `mode`: `light` | `dark`
- `size`: `xs` | `sm` | `md` | `lg` | `xl`

```tsx
import { Dropdown } from 'cephie-ui';
import { useState } from 'react';

export default function Filters() {
  const [status, setStatus] = useState('open');

  return (
    <Dropdown
      label="Status"
      name="status"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      options={[
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' }
      ]}
    />
  );
}
```

## LoadingSpinner

The `LoadingSpinner` component renders a spinning border indicator.

Props:
- `size`: `small` | `medium` | `large`
- `mode`: `light` | `dark`

```tsx
import { LoadingSpinner } from 'cephie-ui';

export default function LoadingState() {
  return <LoadingSpinner size="small" mode="light" />;
}
```

## Navbar

The navbar is modular. Use `Navbar` as the container, then compose it with helpers like `NavbarInner`, `NavbarRow`, `NavbarBrand`, and `NavbarUserMenu`.

Props:
- `Navbar`: `mode`, `className`
- `NavbarBrand`: `title`, `href`, `iconLight`, `iconDark`, `iconAlt`, `iconSize`
- `NavbarUserMenu`: `userName`, `userImage`, `items` (links or actions), `mode`

```tsx
import {
  Navbar,
  NavbarInner,
  NavbarRow,
  NavbarBrand,
  NavbarUserMenu,
  Button
} from 'cephie-ui';

export default function AppNavbar() {
  return (
    <Navbar mode="dark">
      <NavbarInner>
        <NavbarRow>
          <NavbarBrand title="My Product" />
          <div className="hidden md:flex items-center gap-3">
            <Button mode="dark" variant="secondary" href="/docs">
              Docs
            </Button>
            <Button mode="dark" href="/apply">
              Apply
            </Button>
          </div>
          <NavbarUserMenu
            userName="Alex"
            userImage="https://example.com/avatar.png"
            items={[
              { label: 'Profile', href: '/profile' },
              { label: 'Settings', href: '/settings' },
              { label: 'Sign out', onClick: () => {}, danger: true }
            ]}
          />
        </NavbarRow>
      </NavbarInner>
    </Navbar>
  );
}
```

## Footer

The footer is modular. Use `Footer` as the container and build columns with `FooterLinkHeader` and `FooterLink`.

Props:
- `Footer`: `mode`, `title`, `subtitle`, `iconLight`, `iconDark`, `iconAlt`, `iconSize`, `bottomRight`, `copyright`
- `FooterLinkHeader`: `title`
- `FooterLink`: `href`, `newTab`

```tsx
import { Footer, FooterLinkHeader, FooterLink } from 'cephie-ui';

export default function AppFooter() {
  return (
    <Footer
      mode="light"
      title="My Product"
      subtitle="Building simple tools for teams."
    >
      <FooterLinkHeader title="Company">
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/team">Team</FooterLink>
      </FooterLinkHeader>
      <FooterLinkHeader title="Legal">
        <FooterLink href="/legal/terms">Terms</FooterLink>
        <FooterLink href="/legal/privacy">Privacy</FooterLink>
        <FooterLink href="https://example.com" newTab>
          External
        </FooterLink>
      </FooterLinkHeader>
    </Footer>
  );
}
```
