import { useSutra } from '../provider';

export type ComparisonColumn = { key: string; header: string };
export type ComparisonRow = { label: string; values: Record<string, string> };

export function ComparisonTable({
  caption,
  columns,
  rows,
  highlight,
  rowHeader,
}: {
  caption: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  highlight?: string;
  rowHeader?: string;
}) {
  const { messages } = useSutra();
  return (
    <div className="sutra-table-wrap">
      <table className="sutra-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{rowHeader ?? messages.rowHeader}</th>
            {columns.map((column) => (
              <th key={column.key} scope="col" data-highlight={highlight === column.key ? 'true' : undefined}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {columns.map((column) => (
                <td key={column.key} data-highlight={highlight === column.key ? 'true' : undefined}>
                  <span className="sutra-num">{row.values[column.key]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
