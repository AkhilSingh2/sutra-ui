import { useId } from 'react';
import { cx } from '../cx';

export function Toggle({
  label,
  checked,
  onCheckedChange,
  hint,
  disabled,
  id,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  hint?: string;
  disabled?: boolean;
  id?: string;
}) {
  const generated = useId();
  const fieldId = id ?? generated;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  return (
    <div className={cx('sutra-toggle-row', disabled && 'sutra-toggle-row--disabled')}>
      <button
        id={fieldId}
        type="button"
        role="switch"
        className={cx('sutra-toggle', checked && 'sutra-toggle--on')}
        aria-checked={checked}
        aria-describedby={hintId}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
      >
        <span className="sutra-toggle-thumb" />
      </button>
      <div className="sutra-toggle-copy">
        <label className="sutra-label" htmlFor={fieldId}>
          {label}
        </label>
        {hint ? (
          <p id={hintId} className="sutra-hint">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}
