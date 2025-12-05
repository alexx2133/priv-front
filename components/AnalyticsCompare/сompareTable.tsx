// components/CompareTable.tsx
import React, { useState } from "react";
import styles from "./styles/compare.module.scss";

export type Item = { productId?: number; categoryId?: number };

interface CompareTableProps {
  selectedItems: Item[];
  dateFrom: string;
  dateTo: string;
  period: "day" | "month" | "year";
  priceField:
    | "opt_price_min"
    | "opt_price_max"
    | "rozn_price_min"
    | "rozn_price_max";
  apiBase: string;
  buildKey: number;
}

interface ComparisonData {
  id: number;
  name: string;
  type: "product" | "category";
  price1: number | null;
  price2: number | null;
  rubDiff: number | null;
  percentDiff: number | null;
}

export const CompareTable: React.FC<CompareTableProps> = ({
  selectedItems,
  dateFrom,
  period,
  dateTo,
  priceField,
  apiBase,
  buildKey,
}) => {
  const [data, setData] = useState<ComparisonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    dateFrom: string | Date;
    dateTo: string;
    selectedItems: Item[];
  } | null>(null);

  React.useEffect(() => {
    if (buildKey === 0) {
      setData([]);
      setHasSearched(false);
      setSearchParams(null);
      return;
    }

    if (selectedItems.length === 0) {
      setData([]);
      setHasSearched(true);
      return;
    }

    const loadComparison = async () => {
      setLoading(true);
      setError(null);
      setHasSearched(true);
      setSearchParams({
        dateFrom,
        dateTo,
        selectedItems: [...selectedItems],
      });

      try {
        const body = {
          items: selectedItems,
          date1: dateFrom,
          date2: dateTo,
          period: period,
          price_field: priceField,
        };

        const resp = await fetch(`${apiBase}/analytics/price/compare`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!resp.ok) {
          const errorText = await resp.text();
          throw new Error(`Ошибка сервера: ${resp.status} - ${errorText}`);
        }

        const result = await resp.json();
        setData(result.comparison || []);
      } catch (err) {
        console.error("Compare table error:", err);
        setError(
          err instanceof Error ? err.message : "Ошибка подключения к серверу"
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    loadComparison();
  }, [buildKey]); 

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === 0) return "—";
    return `${price.toFixed(2)} ₽`;
  };

  const formatDifference = (value: number | null, isPercent = false) => {
    if (value === null) return "—";
    const sign = value > 0 ? "+" : "";
    const suffix = isPercent ? "%" : " ₽";
    return `${sign}${value.toFixed(2)}${suffix}`;
  };

  const getDiffClassName = (value: number | null) => {
    if (value === null) return styles.neutral;
    return value >= 0 ? styles.positive : styles.negative;
  };

  const displayDateFrom = searchParams?.dateFrom || dateFrom;
  const displayDateTo = searchParams?.dateTo || dateTo;

  if (!hasSearched && buildKey === 0) {
    return (
      <div className={styles.initialState}>
        <div className={styles.initialIcon}>📊</div>
        <div className={styles.initialTitle}>Готов к сравнению</div>
        <div className={styles.initialText}>
          Выберите товары или категории, установите даты сравнения и нажмите
          "ПОСТРОИТЬ ТАБЛИЦУ"
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <div>Загрузка данных для сравнения...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorIcon}>⚠️</div>
        <div className={styles.errorTitle}>Ошибка</div>
        <div className={styles.errorText}>{error}</div>
      </div>
    );
  }

  if (data.length === 0 && hasSearched) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🔍</div>
        <div className={styles.emptyTitle}>Данные не найдены</div>
        <div className={styles.emptyText}>
          По выбранным параметрам не удалось найти данных для сравнения.
          Попробуйте изменить даты или выбрать другие товары/категории.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.compareTable}>
      <div className={styles.tableHeader}>
        Сравнение цен за период {formatDate(displayDateFrom as string)} →{" "}
        {formatDate(displayDateTo)}
      </div>

      {/* <div className={styles.tableHeader}>
        <h3>Сравнение цен за период</h3>
        <div className={styles.dates}>
          {formatDate(displayDateFrom)} → {formatDate(displayDateTo)}
        </div>
      </div> */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.nameHeader}>НАИМЕНОВАНИЕ</th>
              <th className={styles.priceHeader}>
                {formatDate(displayDateFrom as string)}
              </th>
              <th className={styles.priceHeader}>
                {formatDate(displayDateTo)}
              </th>
              <th className={styles.diffHeader}>Изменение (₽)</th>
              <th className={styles.diffHeader}>Изменение (%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={`${item.type}-${item.id}`} className={styles.tableRow}>
                <td className={styles.nameCell}>
                  <div className={styles.name}>{item.name}</div>
                  {/* <div className={styles.type}>
                    {item.type === "product" ? "Товар" : "Категория"}
                  </div> */}
                </td>
                <td className={styles.priceCell}>{formatPrice(item.price1)}</td>
                <td className={styles.priceCell}>{formatPrice(item.price2)}</td>
                <td
                  className={`${styles.diffCell} ${getDiffClassName(
                    item.rubDiff
                  )}`}
                >
                  {formatDifference(item.rubDiff)}
                </td>
                <td
                  className={`${styles.diffCell} ${getDiffClassName(
                    item.percentDiff
                  )}`}
                >
                  {formatDifference(item.percentDiff, true)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className={styles.tableFooter}>Показано {data.length} позиций</div> */}
    </div>
  );
};
