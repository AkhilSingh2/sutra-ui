import { useId } from 'react';

export function Slider({
  label,
  value,
  onValueChange,
  min,
  max,
  step = 1,
  hint,
  formatValue,
  id,
}: {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  hint?: string;
  formatValue?: (value: number) => string;
  id?: string;
}) {
  const generated = useId();
  const fieldId = id ?? generated;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const outputId = `${fieldId}-value`;
  const shown = formatValue ? formatValue(value) : String(value);
  return (
    <div className="sutra-slider">
      <div className="sutra-slider-top">
        <label className="sutra-label" htmlFor={fieldId}>
          {label}
        </label>
        <output id={outputId} className="sutra-num sutra-slider-value" htmlFor={fieldId}>
          {shown}
        </output>
      </div>
      <input
        id={fieldId}
        className="sutra-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={shown}
        aria-describedby={hintId}
        onChange={(event) => onValueChange(Number(event.target.value))}
      />
      {hint ? (
        <p id={hintId} className="sutra-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
