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

// Функция для безопасного преобразования даты
export const formatDateDisplay = (dateStr: string | Date): string => {
  try {
    if (!dateStr) return '';
    
    let dateObj: Date;
    
    if (typeof dateStr === 'string') {
      // Проверяем формат YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [year, month, day] = dateStr.split("-");
        return `${day}.${month}.${year}`;
      }
      
      // Пытаемся создать Date из строки
      dateObj = new Date(dateStr);
    } else {
      dateObj = dateStr;
    }
    
    // Проверяем, валидна ли дата
    if (isNaN(dateObj.getTime())) {
      console.warn("Invalid date:", dateStr);
      return '';
    }
    
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    
    return `${day}.${month}.${year}`;
  } catch (error) {
    console.error("Error formatting date:", error, dateStr);
    return '';
  }
};

// Функция для преобразования даты в формат YYYY-MM-DD
export const formatDateToYYYYMMDD = (date: Date | string | null): string => {
  if (!date) return '';
  
  if (typeof date === 'string') {
    // Если строка уже в формате YYYY-MM-DD, возвращаем как есть
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    
    // Пытаемся распарсить строку
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.warn("Invalid date string:", date);
      return '';
    }
    
    date = dateObj;
  }
  
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  
  return `${year}-${month}-${day}`;
};

// Функция для безопасного парсинга даты для Chart.js
const parseDateForChart = (dateStr: string): Date | null => {
  try {
    // Chart.js хорошо работает с ISO строками
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    console.warn("Failed to parse date for chart:", dateStr, error);
    return null;
  }
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
        // Форматируем даты для запроса
        const dateFromFormatted = formatDateToYYYYMMDD(dateFrom);
        const dateToFormatted = formatDateToYYYYMMDD(dateTo);
        
        if (!dateFromFormatted || !dateToFormatted) {
          setError("Некорректный формат дат");
          setLoading(false);
          return;
        }

        const body = {
          items: selectedItems,
          date_from: dateFromFormatted,
          date_to: dateToFormatted,
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
        console.error("Ошибка загрузки данных:", err);
        setError("Ошибка подключения");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [buildKey]);

  // Форматируем даты для заголовка
  const dateFromFormatted = useMemo(() => formatDateDisplay(dateFrom), [dateFrom]);
  const dateToFormatted = useMemo(() => formatDateDisplay(dateTo), [dateTo]);

  // Создаем datasets для графика
  const datasets = useMemo(() => {
    return Array.from(loadedSeriesMap.entries())
      .filter(([key]) => selectedKeys.includes(key))
      .map(([key, s], idx) => {
        if (!s?.history || s.history.length === 0) return null;
        
        // Создаем данные для графика с безопасным парсингом дат
        const data = s.history
          .map((p) => {
            const parsedDate = parseDateForChart(p.date);
            if (!parsedDate) return null;
            
            return {
              x: parsedDate,
              y: p.price === 0 ? NaN : p.price // Используем NaN для создания разрывов
            };
          })
          .filter((point): point is { x: Date; y: number } => point !== null);
        
        if (data.length === 0) return null;
        
        return {
          label: s.label === "All categories" ? "Все категории" : s.label,
          data,
          borderColor: COLORS[idx % COLORS.length],
          backgroundColor: COLORS[idx % COLORS.length],
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: COLORS[idx % COLORS.length],
          tension: 0.1,
          fill: false,
          // Chart.js автоматически создаст разрыв при NaN
          spanGaps: false, // Важно: false для разрывов
        };
      })
      .filter(Boolean) as any[];
  }, [loadedSeriesMap, selectedKeys]);

  const chartData = useMemo(() => ({ datasets }), [datasets]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
            weight: "normal",
          },
          usePointStyle: true,
          boxWidth: 40,
          boxHeight: 20,
          pointStyle: "circle" as const,
        },
      },
      title: {
        display: true,
        font: {
          size: 16,
          weight: "normal",
        },
        padding: { top: 10, bottom: 30 },
        text: `Динамика цен за период с ${dateFromFormatted} по ${dateToFormatted}`,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null && !isNaN(context.parsed.y)) {
              label += `${context.parsed.y} ₽`;
            } else {
              label += 'нет данных';
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
          unit: period === "day" ? "day" : period === "month" ? "month" : "year",
          tooltipFormat: "dd.MM.yyyy",
          displayFormats: {
            day: "dd.MM.yyyy",
            month: "MMM yyyy",
            year: "yyyy"
          }
        },
        adapters: {
          date: {
            locale: "ru"
          }
        },
        ticks: {
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 20,
          font: {
            size: 12
          }
        },
        grid: {
          drawBorder: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      y: { 
        beginAtZero: false,
        ticks: {
          callback: (value: any) => `${value} ₽`,
          font: {
            size: 12
          }
        },
        grid: {
          drawBorder: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        title: {
          display: true,
          text: 'Цена (₽)',
          font: {
            size: 14
          }
        }
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6
      },
      line: {
        tension: 0.1
      }
    }
  }), [dateFromFormatted, dateToFormatted, period]);

  return (
    <div
      style={{
        width: "100%",
        height: datasets.length ? 820 : 220,
        marginBottom: 50,
        position: "relative",
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
        <Line 
          data={chartData} 
          //@ts-ignore
          options={options}
          key={`chart-${buildKey}-${datasets.length}`} // Ключ для принудительного перерисовки
        />
      )}
    </div>
  );
};