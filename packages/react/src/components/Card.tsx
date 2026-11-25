import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('sutra-card', className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('sutra-card-header', className)} {...props} />;
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cx('sutra-card-title', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('sutra-card-body', className)} {...props} />;
}

export function CardFooter({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cx('sutra-card-footer', className)}>{children}</div>;
}
