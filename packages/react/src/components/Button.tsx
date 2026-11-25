import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react';
import { cx } from '../cx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...props },
  ref,
) {
  const classes = cx('sutra-button', `sutra-button--${variant}`, `sutra-button--${size}`, className);
  if ('href' in props && props.href) {
    const anchorProps = props as ButtonAsLink;
    return (
      <a ref={ref as Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }
  const { type = 'button', ...buttonProps } = props as ButtonAsButton;
  return (
    <button ref={ref as Ref<HTMLButtonElement>} className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  );
});
