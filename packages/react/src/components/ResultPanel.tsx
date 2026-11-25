import { cx } from '../cx';

export type ResultBreakdown = { label: string; value: string; hint?: string };

export function ResultPanel({
  label,
  value,
  unit,
  caption,
  breakdown,
  tone = 'default',
}: {
  label: string;
  value: string;
  unit?: string;
  caption?: string;
  breakdown?: ResultBreakdown[];
  tone?: 'default' | 'primary' | 'success' | 'danger';
}) {
  return (
    <section className={cx('sutra-result', `sutra-result--${tone}`)} aria-label={label}>
      <div className="sutra-thread" aria-hidden="true" />
      <p className="sutra-result-label">{label}</p>
      <p className="sutra-result-value">
        <span className="sutra-num">{value}</span>
        {unit ? <span className="sutra-result-unit">{unit}</span> : null}
      </p>
      {caption ? <p className="sutra-result-caption">{caption}</p> : null}
      {breakdown && breakdown.length > 0 ? (
        <dl className="sutra-result-breakdown">
          {breakdown.map((row) => (
            <div key={row.label} className="sutra-result-row">
              <dt>{row.label}</dt>
              <dd>
                <span className="sutra-num">{row.value}</span>
                {row.hint ? <span className="sutra-hint">{row.hint}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}
