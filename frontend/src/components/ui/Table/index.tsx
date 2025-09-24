import React, { useState, useEffect, useRef, type ReactNode } from "react";
import styles from "./Table.module.css";
import Button from "../../../components/ui/Button";
import { Select } from "../../../components/ui/Select";
import clsx from "clsx";
import Input from "../Input";
import { SearchIcon } from "../../../assets/icons/SearchIcon";
import {
  ArrowDownMinIcon,
  ArrowLeftMinIcon,
  ArrowRightMinIcon,
  ArrowUpMinIcon,
  DoubleArrowLeftMinIcon,
  DoubleArrowRightMinIcon,
} from "../../../assets/icons";

export type Column<T extends object> = {
  key: keyof T | string;
  title?: string;
  width?: number;
  sort?: boolean;
  render?: (value: T[keyof T] | string | undefined, row: T) => React.ReactNode;
  renderHeader?: (title: string, key: keyof T | string) => React.ReactNode;
};

type TableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  searchValue?: string;
  sortColumn?: keyof T | null;
  sortOrder?: "asc" | "desc" | null;
  rowKey?: (row: T) => string | number;
  className?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSearchChange?: (value: string) => void;
  onSortChange?: (column: keyof T, order: "asc" | "desc") => void;
  rightContainer?: ReactNode;
};

export function Table<T extends object>({
  columns,
  data,
  total,
  page,
  pageSize,
  searchValue = "",
  sortColumn,
  sortOrder,
  rowKey,
  className,
  onPageChange,
  onPageSizeChange,
  onSearchChange,
  onSortChange,
  rightContainer,
}: TableProps<T>) {
  const tableRef = useRef<HTMLDivElement>(null);

  const [localSearch, setLocalSearch] = useState(searchValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearchChange?.(localSearch);
    }, 300);
    return () => clearTimeout(timeout);
  }, [localSearch, onSearchChange]);

  const totalPages = Math.ceil(total / pageSize);

  const getPageButtons = () => {
    const buttons: (number | "dots-start" | "dots-end")[] = [];
    const delta = 2;
    const start = Math.max(1, page - delta);
    const end = Math.min(totalPages, page + delta);

    if (start > 1) buttons.push(1);
    if (start > 2) buttons.push("dots-start");

    for (let i = start; i <= end; i++) buttons.push(i);

    if (end < totalPages - 1) buttons.push("dots-end");
    if (end < totalPages) buttons.push(totalPages);

    return buttons;
  };

  const handleSort = (col: keyof T) => {
    if (sortColumn === col) {
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      onSortChange?.(col, newOrder);
    } else {
      onSortChange?.(col, "asc");
    }
  };

  return (
    <div
      className={clsx(styles.tableContainer, className, "shadow-container")}
      ref={tableRef}
    >
      <div className={styles.tableTopCont}>
        <div className={styles.tableControls}>
          <div className={styles.searchCont}>
            <Input
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              leftIcon={<SearchIcon />}
              placeholder="Поиск..."
            />
          </div>
          {rightContainer}
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    onClick={() => col.sort && handleSort(col.key as keyof T)}
                    className={clsx(
                      col.sort && styles.clickableHeader,
                      sortColumn === col.key && styles.sorted
                    )}
                    style={{ width: col.width }}
                  >
                    <div className={styles.trCont}>
                      {col.title && (
                        <p className="text_medium_bold">
                          {col.renderHeader
                            ? col.renderHeader(col.title, col.key)
                            : col.title}
                        </p>
                      )}
                      {sortColumn === col.key &&
                        (sortOrder === "asc" ? (
                          <ArrowUpMinIcon />
                        ) : (
                          <ArrowDownMinIcon />
                        ))}
                    </div>
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
                            (row as { id?: string | number }).id ??
                              Math.random()
                          )
                    }
                  >
                    {columns.map((col) => (
                      <td key={String(col.key)}>
                        {col.render
                          ? col.render(undefined, row)
                          : col.key in row
                          ? String(row[col.key as keyof T] ?? "")
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.paginationContainer}>
        <div className={styles.paginationLengthRows}>
          {total > 0 ? (
            <p className="text_small">
              Показывается{" "}
              <strong>{`${(page - 1) * pageSize + 1}–${Math.min(
                page * pageSize,
                total
              )}`}</strong>{" "}
              записей из <strong>{total}</strong>
            </p>
          ) : (
            <p className="text_medium">Нет записей</p>
          )}
        </div>
        <div className={styles.paginationButtons}>
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => onPageChange?.(1)}
            icon={<DoubleArrowLeftMinIcon />}
          />
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => onPageChange?.(page - 1)}
            icon={<ArrowLeftMinIcon />}
          />

          {getPageButtons().map((p, idx) =>
            p === "dots-start" || p === "dots-end" ? (
              <span key={idx} className={styles.dots}>
                …
              </span>
            ) : (
              <Button
                key={idx}
                variant={p === page ? "primary" : "outline"}
                onClick={() => onPageChange?.(Number(p))}
              >
                {String(p)}
              </Button>
            )
          )}

          <Button
            variant="outline"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => onPageChange?.(page + 1)}
            icon={<ArrowRightMinIcon />}
          />
          <Button
            variant="outline"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => onPageChange?.(totalPages)}
            icon={<DoubleArrowRightMinIcon />}
          />
        </div>

        <div className={styles.paginationShowRows}>
          <p className="text_small">Показать</p>
          <Select
            options={[5, 10, 20, 50].map((n) => ({
              label: String(n),
              value: n,
            }))}
            value={pageSize}
            onChange={(val) => onPageSizeChange?.(Number(val))}
            className={styles.select}
          />
        </div>
      </div>
    </div>
  );
}
