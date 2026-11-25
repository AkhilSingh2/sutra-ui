import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { cx } from '../cx';
import { ChevronIcon } from '../icons';
import { Field } from './Field';

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, required, id, className, options, placeholder, ...props },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;
  return (
    <Field id={fieldId} label={label} hint={hint} error={error} required={required}>
      {(describedBy) => (
        <div className="sutra-select-wrap">
          <select
            ref={ref}
            id={fieldId}
            className={cx('sutra-input', 'sutra-select', className)}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronIcon />
        </div>
      )}
    </Field>
  );
});
