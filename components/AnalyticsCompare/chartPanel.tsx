// components/PriceChartPanel.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color = "#212529";
ChartJS.defaults.font.family = "Roboto";

export const formatDateDisplay = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-");
  return `${day}.${month}.${year}`;
};

export const formatDateToYYYYMMDD = (date: Date | string | null) => {
  if (typeof date === "string") return date;
  if (!date) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export type Item = { productId?: number; categoryId?: number };
type Series = {
  type: "product" | "category";
  id: number;
  label: string;
  history: { date: string; price: number }[];
};

const COLORS = ["#9b59b6", "#4db6e6", "#2ecc71", "#d08770"];

interface Props {
  selectedItems: Item[];
  dateFrom: string | Date;
  dateTo: string | Date;
  period?: "day" | "month" | "year";
  priceField?:
    | "opt_price_min"
    | "opt_price_max"
    | "rozn_price_min"
    | "rozn_price_max";
  apiBase?: string;
  buildKey: number;
}

// Функция для создания сегментов данных (группирует последовательные точки с ценой > 0)
const createDataSegments = (history: { date: string; price: number }[]) => {
  if (!history || history.length === 0) return [];
  
  const segments: { x: string; y: number }[][] = [];
  let currentSegment: { x: string; y: number }[] = [];
  
  history.forEach((point, index) => {
    if (point.price > 0) {
      // Если цена > 0, добавляем в текущий сегмент
      currentSegment.push({ x: point.date, y: point.price });
    } else if (currentSegment.length > 0) {
      // Если цена = 0 и текущий сегмент не пуст, завершаем сегмент
      segments.push([...currentSegment]);
      currentSegment = [];
    }
  });
  
  // Добавляем последний сегмент, если он есть
  if (currentSegment.length > 0) {
    segments.push(currentSegment);
  }
  
  return segments;
};

export const PriceChartPanel: React.FC<Props> = ({
  selectedItems,
  dateFrom,
  dateTo,
  period = "day",
  priceField = "rozn_price_min",
  apiBase = "",
  buildKey,
}) => {
  const [loadedSeriesMap, setLoadedSeriesMap] = useState<Map<string, Series>>(
    new Map()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedKeys = useMemo(() => {
    return selectedItems.map((it) =>
      it.productId != null
        ? `product:${it.productId}`
        : `category:${it.categoryId}`
    );
  }, [selectedItems]);

  useEffect(() => {
    setLoadedSeriesMap((prev) => {
      const newMap = new Map();
      selectedKeys.forEach((key) => {
        if (prev.has(key)) {
          newMap.set(key, prev.get(key)!);
        }
      });
      return newMap;
    });
  }, [selectedKeys]);

  useEffect(() => {
    if (selectedItems.length === 0) {
      setLoadedSeriesMap(new Map());
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const body = {
          items: selectedItems,
          date_from: dateFrom,
          date_to: dateTo,
          period,
          price_field: priceField,
        };

        const resp = await fetch(`${apiBase}/analytics/price/batch`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!resp.ok) {
          const errorText = await resp.text();
          setError(`Ошибка сервера: ${resp.status}`);
          return;
        }

        const data = await resp.json();

        if (!data?.series) {
          setError("Некорректный ответ от сервера");
          return;
        }

        setLoadedSeriesMap((prev) => {
          const map = new Map(prev);
          for (const s of data.series as Series[]) {
            const key = `${s.type}:${s.id}`;
            map.set(key, s);
          }
          return map;
        });
      } catch (err) {
        setError("Ошибка подключения");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [buildKey]);

  // Создаем datasets с учетом разрывов при цене = 0
  const datasets = Array.from(loadedSeriesMap.entries())
    .filter(([key]) => selectedKeys.includes(key))
    .flatMap(([key, s], idx) => {
      if (!s.history || s.history.length === 0) return null;
      
      // Создаем сегменты данных (группируем последовательные точки с ценой > 0)
      const segments = createDataSegments(s.history);
      
      if (segments.length === 0) return null;
      
      // Для каждого сегмента создаем отдельный dataset
      return segments.map((segment, segmentIdx) => ({
        label: segmentIdx === 0 
          ? (s.label == "All categories" ? "Все категории" : s.label)
          : undefined, // Показываем label только для первого сегмента
        data: segment,
        borderColor: COLORS[idx % COLORS.length],
        backgroundColor: COLORS[idx % COLORS.length],
        tension: 0.08,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
        fill: false,
        segment: {
          borderDash: segmentIdx > 0 ? [5, 5] : undefined, // Можно сделать пунктир для продолжения
        },
      }));
    })
    .filter(Boolean) as any[];

  const chartData = { datasets };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 30,
            weight: "normal",
          },
          usePointStyle: true,
          boxWidth: 50,
          boxHeight: 50,
          pointStyle: "rect" as const,
          filter: (legendItem: any, chartData: any) => {
            // Фильтруем дубликаты label (скрываем label для дополнительных сегментов)
            const labels = chartData.datasets.map((d: any) => d.label);
            const firstIndex = labels.indexOf(legendItem.text);
            return legendItem.datasetIndex === firstIndex;
          },
        },
      },
      title: {
        display: true,
        font: {
          size: 30,
          weight: "normal",
        },
        padding: { top: 20, bottom: 50 },
        text: `Динамика цен за период с ${formatDateDisplay(
          dateFrom.toString()
        )} по ${formatDateDisplay(dateTo.toString())}`,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y} ₽`;
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit:
            period === "day" ? "day" : period === "month" ? "month" : "year",
          tooltipFormat: "dd-MM-yyyy",
        },
        ticks: {
          maxRotation: 40,
          autoSkip: true,
          maxTicksLimit: 30,
          callback: (value: any) => {
            const date = new Date(value);
            return new Intl.DateTimeFormat("ru-RU", {}).format(date);
          },
        },
        grid: {
          drawBorder: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: { 
        beginAtZero: false,
        ticks: {
          callback: (value: any) => `${value} ₽`
        },
        grid: {
          drawBorder: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    // Отключаем соединение точек через разрывы
    spanGaps: false,
    elements: {
      line: {
        // Настройки линии
        tension: 0.08
      },
      point: {
        radius: 3,
        hoverRadius: 5
      }
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: datasets.length ? 820 : 220,
        marginBottom: 50,
      }}
    >
      {loading && (
        <div style={{ padding: 30, textAlign: "center", color: "#666" }}>
          Загрузка данных...
        </div>
      )}
      {error && (
        <div style={{ padding: 30, textAlign: "center", color: "#d32f2f" }}>
          {error}
        </div>
      )}
      {!loading && !error && datasets.length === 0 && (
        <div style={{ padding: 30, textAlign: "center", color: "#666" }}>
          Нет данных для отображения
        </div>
      )}
      {!loading && !error && datasets.length > 0 && (
        //@ts-ignore
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};