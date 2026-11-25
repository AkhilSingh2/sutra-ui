import type { ReactNode } from 'react';
import { cx } from '../cx';
import { useSutra } from '../provider';

export function Field({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: (describedBy: string | undefined) => ReactNode;
}) {
  const { messages } = useSutra();
  const hintId = hint && !error ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('sutra-field', error && 'sutra-field--error', className)}>
      {label ? (
        <label className="sutra-label" htmlFor={id}>
          {label}
          {required ? (
            <>
              <span aria-hidden="true"> *</span>
              <span className="sutra-sr"> {messages.required}</span>
            </>
          ) : null}
        </label>
      ) : null}
      {children(describedBy)}
      {hint && !error ? (
        <p id={hintId} className="sutra-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="sutra-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
