'use client';

import { LanguageToggle, MarkIcon, ThemeSwitcher } from '@sutra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
const links = [
  { href: '/', label: 'Overview' },
  { href: '/foundations', label: 'Foundations' },
  { href: '/components', label: 'Components' },
  { href: '/preview', label: 'Tool preview' },
];

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  if (current === '/preview') return <>{children}</>;

  return (
    <div className="docs-shell">
      <a className="sutra-skip" href="#docs-main">
        Skip to content
      </a>
      <header className="docs-top">
        <Link className="sutra-mark" href="/">
          <MarkIcon />
          <span>Sutra UI</span>
        </Link>
        <button type="button" className="sutra-header-menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <div className="docs-controls">
          <LanguageToggle />
          <ThemeSwitcher />
        </div>
      </header>
      <div className="docs-frame">
        <nav className={open ? 'docs-nav docs-nav--open' : 'docs-nav'} aria-label="Documentation">
          <ul>
            {links.map((link) => {
              const active = current === link.href;
              return (
                <li key={link.href}>
                  <Link href={link.href} aria-current={active ? 'page' : undefined} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="docs-nav-controls">
            <LanguageToggle />
            <ThemeSwitcher />
          </div>
        </nav>
        <main id="docs-main" className="docs-main">
          {children}
        </main>
      </div>
    </div>
  );
}
