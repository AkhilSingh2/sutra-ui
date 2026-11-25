import type { ReactNode } from 'react';
import { MarkIcon } from '../icons';
import type { NavItem } from './Header';

export function Footer({
  title = 'Sutra',
  note,
  links = [],
  children,
}: {
  title?: string;
  note?: ReactNode;
  links?: NavItem[];
  children?: ReactNode;
}) {
  return (
    <footer className="sutra-footer">
      <div className="sutra-footer-brand">
        <MarkIcon />
        <strong>{title}</strong>
      </div>
      {note ? <div className="sutra-footer-note">{note}</div> : null}
      {links.length > 0 ? (
        <ul className="sutra-footer-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      ) : null}
      {children}
    </footer>
  );
}
