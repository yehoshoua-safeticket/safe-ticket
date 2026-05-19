'use client';

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function AdminTable<T>({ columns, data, emptyMessage = 'אין נתונים להצגה' }: AdminTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-12 text-center">
        <p className="text-[var(--muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--card)]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--card-border)]">
            {columns.map((col) => (
              <th key={col.key} className="px-5 py-3.5 text-start text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--card-border)]">
          {data.map((item, i) => (
            <tr key={i} className="transition-colors hover:bg-[var(--input-bg)]">
              {columns.map((col) => (
                <td key={col.key} className="whitespace-nowrap px-5 py-3.5 text-sm">
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
