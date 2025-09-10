import React from "react";
import styles from "./Table.module.css";

export type Column<T extends object> = {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  renderHeader?: (title: string, key: keyof T) => React.ReactNode;
};

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: (row: T) => string | number;
  className?: string;
  controls?: React.ReactNode;
};

export function Table<T extends object>({
  columns,
  data,
  rowKey,
  className,
  controls,
}: TableProps<T>) {
  return (
    <div className={`${styles.tableContainer} ${className ?? ""}`}>
      {controls && <div className={styles.tableControls}>{controls}</div>}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)}>
                  {col.renderHeader
                    ? col.renderHeader(col.title, col.key)
                    : col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.empty}>
                  Нет данных
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={
                    rowKey
                      ? rowKey(row)
                      : String(
                          (row as { id?: string | number }).id ?? Math.random()
                        )
                  }
                >
                  {columns.map((col) => (
                    <td key={String(col.key)}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
