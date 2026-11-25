import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { cx } from '../cx';
import { Field } from './Field';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, required, id, className, ...props },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <Field id={fieldId} label={label} hint={hint} error={error} required={required}>
      {(describedBy) => (
        <input
          ref={ref}
          id={fieldId}
          className={cx('sutra-input', className)}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
      )}
    </Field>
  );
});
