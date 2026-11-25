import type { ReactNode } from 'react';
import { cx } from '../cx';

export function Alert({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className={cx('sutra-alert', `sutra-alert--${tone}`)} role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}>
      <p className="sutra-alert-title">{title}</p>
      {children ? <div className="sutra-alert-body">{children}</div> : null}
    </div>
  );
}
