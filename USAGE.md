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
  NavbarLeft,
  NavbarRight,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarButton,
  NavbarUserMenu
} from 'cephie-ui';
```

## Background

The `Background` component renders a decorative gradient shape. It is positioned absolutely and ignores pointer events.

Props:
- `mode` (`'light'` | `'dark'`): Light uses a brighter gradient at 30% opacity; dark uses a subtler gradient at 15% opacity for use on dark backgrounds (e.g. `bg-zinc-950`).
- `className` (string): Extra classes for positioning or opacity.
- `style` (React.CSSProperties): Override the gradient or shape style.

```tsx
import { Background } from 'cephie-ui';

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <Background mode="dark" />
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

Single row like the dashboard/app navbars: brand on the left, links and actions on the right. Layout and spacing match the reference navbars (same `h-16`, `space-x-8` between links and the actions group, `gap-2` between buttons and user menu).

- Put `NavbarLeft` and `NavbarRight` as direct children of `Navbar`.
- Put all **links** as direct children of `NavbarRight` (they get `space-x-8`).
- Wrap **buttons and user menu** in `NavbarActions` so they sit with `gap-2` (same as dashboard/app).

Props:
- `Navbar`: `mode`, `className`
- `NavbarLeft`: `className` — left side, `flex items-center`
- `NavbarRight`: `className` — right side, `hidden md:flex items-center space-x-8`
- `NavbarActions`: `className` — wrapper for buttons + user menu, `flex gap-2` (use for correct spacing)
- `NavbarBrand`: `title`, `href`, `iconLight`, `iconDark`, `iconAlt`, `iconSize`
- `NavbarLink`: `href`, `newTab`, `mode`
- `NavbarButton`: same props as `Button` (navbar sizing applied)
- `NavbarUserMenu`: `userName`, `userImage`, `items`, `mode`

```tsx
import {
  Navbar,
  NavbarLeft,
  NavbarRight,
  NavbarActions,
  NavbarBrand,
  NavbarLink,
  NavbarButton,
  NavbarUserMenu,
} from 'cephie-ui';

export default function AppNavbar() {
  return (
    <Navbar mode="dark">
      <NavbarLeft>
        <NavbarBrand title="My Product" />
      </NavbarLeft>
      <NavbarRight>
        <NavbarLink href="/docs" mode="dark">
          Docs
        </NavbarLink>
        <NavbarActions>
          <NavbarButton mode="dark" href="/apply">
            Apply
          </NavbarButton>
          <NavbarUserMenu
            userName="Alex"
            userImage="https://example.com/avatar.png"
            items={[
              { label: 'Profile', href: '/profile' },
              { label: 'Settings', href: '/settings' },
              { label: 'Sign out', onClick: () => {}, danger: true }
            ]}
          />
        </NavbarActions>
      </NavbarRight>
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
