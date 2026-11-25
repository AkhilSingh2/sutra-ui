import { forwardRef, useId, useState } from 'react';
import { cx } from '../cx';
import { formatIndianNumber, formatLakhCrore, parseIndianNumber, type NumberingSystem } from '../format';
import { useSutra } from '../provider';
import { Field } from './Field';

export type NumberInputProps = {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  value: number | null;
  onValueChange: (value: number | null) => void;
  mode?: 'number' | 'currency';
  decimals?: number;
  digits?: NumberingSystem;
  showScale?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    label,
    hint,
    error,
    required,
    id,
    name,
    value,
    onValueChange,
    mode = 'number',
    decimals,
    digits = 'latn',
    showScale,
    disabled,
    placeholder,
    min,
    max,
    className,
  },
  ref,
) {
  const generated = useId();
  const fieldId = id ?? generated;
  const { locale, messages } = useSutra();
  const [draft, setDraft] = useState<string | null>(null);
  const fraction = decimals ?? (mode === 'currency' ? 2 : 0);
  const localeTag = locale === 'hi' ? 'hi-IN' : 'en-IN';
  const scale = showScale !== false && value !== null ? formatLakhCrore(value, locale) : null;
  const combinedHint = [hint, scale].filter(Boolean).join(' · ') || undefined;
  const rangeError =
    error ??
    (value !== null && min !== undefined && value < min
      ? `${messages.atLeast} ${min}`
      : value !== null && max !== undefined && value > max
        ? `${messages.atMost} ${max}`
        : undefined);

  const formatted =
    value === null
      ? ''
      : formatIndianNumber(value, {
          mode: 'number',
          locale: localeTag,
          decimals: fraction,
          numberingSystem: digits,
        });

  return (
    <Field id={fieldId} label={label} hint={combinedHint} error={rangeError} required={required} className={className}>
      {(describedBy) => (
        <div className={cx('sutra-number', mode === 'currency' && 'sutra-number--currency')}>
          {mode === 'currency' ? (
            <span className="sutra-number-prefix" aria-hidden="true">
              ₹
            </span>
          ) : null}
          <input
            ref={ref}
            id={fieldId}
            name={name}
            className="sutra-input sutra-number-input"
            inputMode="decimal"
            autoComplete="off"
            disabled={disabled}
            required={required}
            placeholder={placeholder}
            aria-invalid={rangeError ? true : undefined}
            aria-describedby={describedBy}
            value={draft ?? formatted}
            onFocus={() => {
              if (value === null) {
                setDraft('');
                return;
              }
              setDraft(fraction > 0 ? value.toFixed(fraction) : String(value));
            }}
            onBlur={() => setDraft(null)}
            onChange={(event) => {
              setDraft(event.target.value);
              onValueChange(parseIndianNumber(event.target.value));
            }}
          />
        </div>
      )}
    </Field>
  );
});
