import { useId, useState, type ReactNode } from 'react';
import { cx } from '../cx';
import { MarkIcon } from '../icons';
import { useSutra } from '../provider';

export type NavItem = { href: string; label: string };

export function Header({
  title = 'Sutra',
  href = '#',
  nav = [],
  children,
}: {
  title?: string;
  href?: string;
  nav?: NavItem[];
  children?: ReactNode;
}) {
  const { messages } = useSutra();
  const [open, setOpen] = useState(false);
  const navId = useId();
  return (
    <header className="sutra-header">
      <a className="sutra-mark" href={href}>
        <MarkIcon />
        <span>{title}</span>
      </a>
      <button
        type="button"
        className="sutra-header-menu"
        aria-expanded={open}
        aria-controls={navId}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? messages.close : messages.menu}
      </button>
      <nav id={navId} className={cx('sutra-nav', open && 'sutra-nav--open')} aria-label={messages.primaryNav}>
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sutra-header-end">{children}</div>
    </header>
  );
}
