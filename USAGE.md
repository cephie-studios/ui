# Usage

This file documents the components in this library and shows how to use them.

## Setup

Import the stylesheet once in your app entry point (styles are not injected automatically):

```tsx
// app/layout.tsx or main.tsx
import 'cephie-ui/styles.css';
```

For **Next.js**, add `cephie-ui` to `transpilePackages` so client components and imports resolve reliably:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['cephie-ui'],
};

export default nextConfig;
```

If you use **Tailwind v4** in the app and choose not to import `cephie-ui/styles.css`, you must ensure your Tailwind content paths include `node_modules/cephie-ui/dist/**/*` (or equivalent) so the same utility classes are generated. The default and simplest approach is still to import `cephie-ui/styles.css`.

## Imports

Named imports from the package entry:

```tsx
import {
  Background,
  Button,
  Dropdown,
  Footer,
  FooterColumn,
  FooterColumns,
  FooterLink,
  FooterLinkHeader,
  LoadingSpinner,
  Login,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarButton,
  NavbarDivider,
  NavbarLeft,
  NavbarLink,
  NavbarRight,
  NavbarRightMobile,
  NavbarSegmentGroup,
  NavbarUserMenu,
  Rail,
  SectionDivider,
} from 'cephie-ui';
```

Types (when needed):

```tsx
import type { BackgroundProps, LoginLegalLinks, LoginProps } from 'cephie-ui';
```

## Background

Decorative full-bleed layer: **absolute `inset-0`**, `pointer-events: none`. Parent should be `relative` (and usually `overflow-hidden` / `isolate`).

**Without `imageSrc`:** renders the soft gradient blob (legacy look). Optional `blurClassName` merges onto the blurred wrapper (default includes `blur-3xl` on that path).

**With `imageSrc`:** renders a covering `<img>`, then an optional overlay. Good for hero rails (image + `bg-white/60` tint).

Props:

- `mode` (`'light'` | `'dark'`): Gradient weights when no image is used.
- `imageSrc` (string, optional): Image URL; when set, replaces the gradient.
- `imageAlt` (string): Passed to `<img>`; default `''`.
- `imageClassName` (string): Extra classes on the image; default `object-cover object-center`.
- `blurClassName` (string): Tailwind on the image (e.g. `blur-sm`, `scale-110`) or extra blur on the gradient wrapper when there is no image.
- `overlayClassName` (string, optional): Full-bleed layer above the image (e.g. `bg-white/60`). Omit for no overlay.
- `className`, `style`: Outer wrapper.
- `children`: Optional extra layers.

```tsx
import { Background } from 'cephie-ui';

export default function Hero() {
  return (
    <section className="relative isolate min-h-[320px] overflow-hidden">
      <Background
        mode="light"
        imageSrc="/assets/galaxy.avif"
        imageAlt=""
        blurClassName=""
        overlayClassName="bg-white/60"
      />
      <div className="relative z-10 px-6 py-16">Content</div>
    </section>
  );
}
```

## Button

Buttons use the PFConnect “ghost” palette (`#0d0d0b`, `#e5e5e5`, etc.). Renders a `<button>` or an `<a>` when `href` is set.

Props:

- `variant`: `'ghost'` (default) | `'dark'` | `'light'` | `'ghostOnDark'`
- `primary`: boolean — stronger ghost border on `variant="ghost"`
- `navbar`: boolean — rail segment sizing (`h-full`, no rounding, uppercase tracking); does not forward to the DOM
- `href` + optional `newTab` — link mode
- `type`, `onClick`, `disabled` — button mode

```tsx
import { Button } from 'cephie-ui';

export default function Actions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button>Ghost</Button>
      <Button variant="dark">Primary action</Button>
      <Button href="/apply">Internal link</Button>
      <Button href="https://example.com" newTab>
        External
      </Button>
    </div>
  );
}
```

## Dropdown

Controlled custom listbox. Styling is mostly via **`triggerClassName`** and optional **`listClassName`**.

Props:

- `id` (string): Trigger id / `aria-labelledby`
- `options`: `{ value: string; label: string }[]`
- `value`, `onChange`
- `triggerClassName`, `listClassName` (optional)

```tsx
import { Dropdown } from 'cephie-ui';
import { useState } from 'react';

const OPTIONS = [
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
] as const;

export default function Filters() {
  const [status, setStatus] = useState('open');

  return (
    <Dropdown
      id="status-filter"
      value={status}
      onChange={setStatus}
      options={OPTIONS}
      triggerClassName="w-full rounded border border-[#e5e5e5] bg-white px-3 py-2 text-left text-[13px] text-[#0d0d0b]"
    />
  );
}
```

## LoadingSpinner

Props:

- `size`: `'small'` | `'medium'` | `'large'`
- `mode`: `'light'` | `'dark'`

```tsx
import { LoadingSpinner } from 'cephie-ui';

export default function LoadingState() {
  return <LoadingSpinner size="small" mode="light" />;
}
```

## Rail & SectionDivider

**`Rail`** — centered max-width container with vertical side borders (`#d8d8d6` light / `#2a2a28` dark). Props: `variant` (`'light'` | `'dark'`), `className`, `children`.

**`SectionDivider`** — full-bleed horizontal rule. Props: `variant` (`'light'` | `'dark'`), `className`.

```tsx
import { Rail, SectionDivider } from 'cephie-ui';

export default function PageSlice() {
  return (
    <>
      <section className="bg-white">
        <Rail className="px-6 py-12">…</Rail>
      </section>
      <SectionDivider />
    </>
  );
}
```

## Navbar

Fixed **12px-tall** rail navbar: white (or dark mode near-black) bar, side borders via **`Rail`**, segment-style links and actions (PFConnect / Cephie API style).

Typical structure:

- **`NavbarLeft`**: brand (`NavbarBrand` is an `<a>` with icon + title).
- **`NavbarSegmentGroup`**: middle scroll row; place **`NavbarLink`** and **`NavbarDivider`** between items.
- **`NavbarRight`**: desktop actions (hidden below `md`); use **`NavbarButton`** with `variant="dark"` for primary CTAs, or **`NavbarUserMenu`**.
- **`NavbarRightMobile`**: compact actions for small screens.

Also: **`NavbarActions`** for grouping controls with flex gap when you are not using the full segment pattern.

Props (summary):

- **`Navbar`**: `mode` (`'light'` | `'dark'`), `className`
- **`NavbarBrand`**: `title`, `href`, `iconLight`, `iconDark`, `iconAlt`, `iconSize`, `titleClassName`, `className`
- **`NavbarLink`**: `href`, `newTab`, `mode`, `className`
- **`NavbarButton`**: same as **`Button`**, with **`navbar`** applied automatically
- **`NavbarUserMenu`**: `userName`, `userImage`, `items`, `mode`, `buttonClassName`, `menuClassName`

```tsx
import {
  Navbar,
  NavbarBrand,
  NavbarButton,
  NavbarDivider,
  NavbarLeft,
  NavbarLink,
  NavbarRight,
  NavbarRightMobile,
  NavbarSegmentGroup,
} from 'cephie-ui';

export default function AppNavbar() {
  return (
    <Navbar mode="light">
      <NavbarLeft>
        <NavbarBrand title="Cephie API" href="/" />
      </NavbarLeft>
      <NavbarSegmentGroup>
        <NavbarLink href="/docs">Docs</NavbarLink>
        <NavbarDivider />
        <NavbarLink href="/transcripts">Transcripts</NavbarLink>
      </NavbarSegmentGroup>
      <NavbarRight>
        <NavbarButton variant="dark" href="/login">
          Sign in
        </NavbarButton>
      </NavbarRight>
      <NavbarRightMobile>
        <NavbarButton variant="dark" href="/login" className="px-2 text-[11px]">
          Sign in
        </NavbarButton>
      </NavbarRightMobile>
    </Navbar>
  );
}
```

Add **`pt-12`** (or equivalent) to main content so it clears the fixed bar.

## Footer

Rail-wrapped footer with brand column + optional **multi-column grid**. Use **`FooterColumns`** and **`FooterColumn`** for the hairline grid used on product sites; **`FooterLinkHeader`** + **`FooterLink`** still work inside each column.

Props:

- **`Footer`**: `mode`, `title`, `subtitle`, **`homeHref`** (brand link, default `'/'`), icons, `bottomRight`, `copyright`, `className`
- **`FooterColumns`**: grid wrapper
- **`FooterColumn`**: one cell (background follows footer mode)
- **`FooterLinkHeader`**: `title`, `children` (usually **`FooterLink`** list items)
- **`FooterLink`**: `href`, `newTab`, `className`

```tsx
import {
  Footer,
  FooterColumn,
  FooterColumns,
  FooterLink,
  FooterLinkHeader,
} from 'cephie-ui';

export default function AppFooter() {
  return (
    <Footer
      mode="light"
      title="My Product"
      subtitle="Short description."
      homeHref="/"
    >
      <FooterColumns>
        <FooterColumn>
          <FooterLinkHeader title="Platform">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/docs">Docs</FooterLink>
          </FooterLinkHeader>
        </FooterColumn>
        <FooterColumn>
          <FooterLinkHeader title="Legal">
            <FooterLink href="https://cephie.app/legal/terms" newTab>
              Terms of Service
            </FooterLink>
            <FooterLink href="https://cephie.app/legal/privacy" newTab>
              Privacy Policy
            </FooterLink>
          </FooterLinkHeader>
        </FooterColumn>
      </FooterColumns>
    </Footer>
  );
}
```

You can also pass a single column of **`FooterLinkHeader`** children without **`FooterColumns`** if a simple stack is enough.

## Login

**Client component** (`'use client'` in consuming apps when this file is a server boundary). Centered card inside **`Rail`**, Discord-style CTA via **`Button` `variant="dark"`**, and a **required** policy checkbox (links open in a new tab). Sign-in stays disabled until the box is checked.

Props:

- `title`, `subtitle`, `onSignIn`, optional `icon` (e.g. Discord icon), `children` (rendered above the card, e.g. nav), `className`
- `mode`: `'light'` | `'dark'`
- **`legal`**: partial override of `{ termsHref, termsLabel, privacyHref, privacyLabel, cookiesHref, cookiesLabel }` (defaults point at cephie.app legal URLs)
- **Background:** `backgroundImageSrc`, `backgroundImageAlt`, `backgroundImageClassName`, `backgroundBlurClassName`, `backgroundOverlayClassName`
  - When `backgroundImageSrc` is set and `backgroundOverlayClassName` is not passed, overlay defaults to **`bg-white/60`**. Pass `backgroundOverlayClassName=""` to disable.

```tsx
'use client';

import { Login } from 'cephie-ui';
import { signIn } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <Login
      title="Sign in with Discord"
      subtitle="Access your account and dashboards."
      icon={<FaDiscord size={18} aria-hidden />}
      onSignIn={() => signIn('discord', { callbackUrl: '/redirect' })}
      backgroundImageSrc="/assets/galaxy.avif"
      backgroundBlurClassName=""
    />
  );
}
```

## Version

This document matches **cephie-ui** 1.6.x (PFConnect rail theme, expandable **`Background`**, policy gate on **`Login`**).
