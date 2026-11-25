import type { ReactNode } from 'react';
import { cx } from '../cx';

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  children: ReactNode;
}) {
  return <span className={cx('sutra-badge', `sutra-badge--${tone}`)}>{children}</span>;
}
