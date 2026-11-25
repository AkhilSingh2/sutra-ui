'use client';

import { LanguageToggle, MarkIcon, ThemeSwitcher } from '@sutra-ui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, type MouseEvent, type ReactNode } from 'react';

const links = [
  { href: '/', label: 'Index' },
  { href: '/philosophy', label: 'Philosophy' },
  { href: '/components', label: 'Components' },
  { href: '/foundations', label: 'Tokens' },
  { href: '/preview', label: 'Case study' },
];

function normalize(path: string) {
  return path.length > 1 ? path.replace(/\/$/, '') : path;
}

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const current = normalize(pathname);
  if (current === '/preview') return <>{children}</>;

  const visit = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof document.startViewTransition !== 'function') return;
    event.preventDefault();
    setOpen(false);
    document.startViewTransition(() => {
      router.push(href);
    });
  };

  return (
    <div className="docs-shell">
      <a className="sutra-skip" href="#docs-main">
        Skip to content
      </a>
      <header className="docs-top">
        <Link className="sutra-mark" href="/" onClick={(event) => visit(event, '/')}>
          <MarkIcon />
          <span>Sutra</span>
        </Link>
        <button type="button" className="sutra-header-menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? 'Close' : 'Menu'}
        </button>
        <nav className="docs-top-nav" aria-label="Documentation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current === link.href ? 'page' : undefined}
              onClick={(event) => visit(event, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="docs-controls">
          <LanguageToggle />
          <ThemeSwitcher />
        </div>
      </header>
      <div className={open ? 'docs-nav docs-nav--open' : 'docs-nav'} >
        <nav aria-label="Documentation">
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={current === link.href ? 'page' : undefined}
                  onClick={(event) => visit(event, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="docs-nav-controls">
            <LanguageToggle />
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
      <main id="docs-main" className="docs-main">
        {children}
      </main>
    </div>
  );
}
