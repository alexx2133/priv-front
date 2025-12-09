// pages/dynamics/DynamicsPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import styles from "./styles/analytics.module.scss";
import { useProductsStore } from "../../stores/productsStore";
import { useAppStore } from "../../stores/app";
import { formatDateToYYYYMMDD, Item } from "./chartPanel";
import { API_URL } from "../../utils/api/config";
import Banner from "../Common/banner";
import Title from "../Common/title";
import CategorySelect from "../ProductsPage/categorySelect";
import DatePicker from "react-datepicker";
import select from "../ProductsPage/styles/select.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
registerLocale("ru-RU", ru);
setDefaultLocale("ru-RU");
export const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

type SelectedItem =
  | { type: "product"; id: number; label: string }
  | { type: "category"; id: number; label: string };

const MAX_ITEMS = 4;

interface AnalyticsProps {
  visualizationComponent: React.ComponentType<VisualizationProps>;
  title: string;
  icon: string;
}

export interface VisualizationProps {
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

const Analytics: React.FC<AnalyticsProps> = ({
  visualizationComponent: VisualizationComponent,
  title,
  icon,
}) => {
  const {
    data: products,
    loadProducts,
    getVisibleProducts,
  } = useProductsStore();
  const { categories, loadCategories, settings } = useAppStore();

  const [buildKey, setBuildKey] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const [dateFrom, setDateFrom] = useState<string>(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d.toISOString().slice(0, 10);
  });

  const [openTo, setOpenTo] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [dateTo, setDateTo] = useState<string>(() =>
    new Date().toISOString().slice(0, 10)
  );

  const [period, setPeriod] = useState<"day" | "month" | "year">("day");
  const [priceType, setPriceType] = useState<"opt" | "rozn">("rozn");
  const [priceExtreme, setPriceExtreme] = useState<"min" | "max">("min");
  const [priceField, setPriceField] = useState<
    "opt_price_min" | "opt_price_max" | "rozn_price_min" | "rozn_price_max"
  >("rozn_price_min");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const productOptions = useMemo(() => products, [products]);
  const categoryOptions = useMemo(() => categories?.data || [], [categories]);
  const colors = ["#AB54AD", "#4db6e6", "#54ad89", "#d08770"];

  const addProduct = () => {
    if (!selectedProductId) return;
    if (selectedItems.length >= MAX_ITEMS) return;
    const exists = selectedItems.find(
      (s) => s.type === "product" && s.id === selectedProductId
    );
    if (exists) return;
    const product = products.find((p) => p.id === selectedProductId);
    const label = product ? product.name : `Product ${selectedProductId}`;
    setSelectedItems((s) => [
      ...s,
      { type: "product", id: selectedProductId, label },
    ]);
  };

  const addCategory = () => {
    if (!selectedCategoryId) return;
    if (selectedItems.length >= MAX_ITEMS) return;
    const exists = selectedItems.find(
      (s) => s.type === "category" && s.id === selectedCategoryId
    );
    if (exists) return;
    if (selectedCategoryId === 9999) {
      setSelectedItems((s) => [
        ...s,
        { type: "category", id: selectedCategoryId, label: "Все категории" },
      ]);
      return;
    }
    const cat = categoryOptions.find(
      (c: any) => c.id === selectedCategoryId
    ) as any;
    const label = cat ? cat.name : `Category ${selectedCategoryId}`;
    setSelectedItems((s) => [
      ...s,
      { type: "category", id: selectedCategoryId, label },
    ]);
  };

  const removeSelected = (type: "product" | "category", id: number) => {
    setSelectedItems((s) => s.filter((x) => !(x.type === type && x.id === id)));
  };

  const onBuildClick = () => {
    setBuildKey((k) => k + 1);
  };

  const handlePriceTypeChange = (type: string) => {
    const newPriceType = type as "opt" | "rozn";
    setPriceType(newPriceType);
    setPriceField(`${newPriceType}_price_${priceExtreme}` as any);
  };

  const handlePriceExtremeChange = (ex: string) => {
    const newPriceExtreme = ex as "min" | "max";
    setPriceExtreme(newPriceExtreme);
    setPriceField(`${priceType}_price_${newPriceExtreme}` as any);
  };

  const visualizationSelectedItems = selectedItems.map((s) =>
    s.type === "product" ? { productId: s.id } : { categoryId: s.id }
  );

  return (
    <div>
      <Banner
        bg={settings.data?.headers_products?.data}
        notactive={title === "Динамика" ? 2 : 1}
        nav={[
          {
            text: "Динамика",
            path: "/analytics",
            image: "prices/icon-dynamics.png",
          },
          {
            text: "Сравнение",
            path: "/compare",
            image: "prices/icon-compare.png",
          },
        ]}
      />
      <div className={styles.analytics}>
        <Title image={icon} title={title} />
        <div className={styles.currency}>
          Валюта
          <img
            src={"../../prices/rub.png"}
            alt={"₽"}
            style={{ marginLeft: "20px" }}
          />
        </div>

        <div className={styles.controls}>
          <div className={styles.panel}>
            <div className={styles.panelCol}>
              <h3>Товары</h3>
              <div className={styles.row}>
                {/* <select
                  value={selectedProductId ?? ""}
                  onChange={(e) =>
                    setSelectedProductId(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                >
                  <option value="">Выберите товар</option>
                  {productOptions.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select> */}
                <CategorySelect
                  placeholder="Выберите товар"
                  options={[
                    { id: null, name: "Выберите товар" },
                    ...productOptions,
                  ]}
                  onSelect={(n) => {
                    setSelectedProductId(n as number);
                  }}
                />
                {/* <button
                  className={styles.plus}
                  onClick={addProduct}
                  aria-label="Добавить товар"
                >
                  +
                </button> */}
                <img
                  alt="plus"
                  src={"../../icons/plus.svg"}
                  className={styles.plus}
                  onClick={addProduct}
                />
              </div>

              <h3>Категории</h3>
              <div className={styles.row}>
                {/* <select
                  value={selectedCategoryId ?? ""}
                  onChange={(e) =>
                    setSelectedCategoryId(
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                >
                  <option value="">Выберите категорию</option>
                  {categoryOptions.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select> */}
                <CategorySelect
                  placeholder="Выберите категорию"
                  options={[
                    { id: null, name: "Выберите категорию" },
                    { id: 9999, name: "Вce категории" },
                    ...categoryOptions?.filter((c: any) => c.active == 1),
                  ]}
                  onSelect={(n) => {
                    setSelectedCategoryId(n as number);
                  }}
                />
                {/* <button
                  className={styles.plus}
                  onClick={addCategory}
                  aria-label="Добавить категорию"
                >
                  +
                </button> */}
                <img
                  alt="plus"
                  src={"../../icons/plus.svg"}
                  className={styles.plus}
                  onClick={addCategory}
                />
              </div>
            </div>

            <div className={styles.panelCol}>
              {
                <>
                  <h3>Интервал времени</h3>
                  <div className={styles.row}>
                    {/* <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value as any)}
                    >
                      <option value="day">День</option>
                      <option value="month">Месяц</option>
                      <option value="year">Год</option>
                    </select> */}
                    <CategorySelect
                      placeholder="День"
                      options={[
                        { id: "day", name: "День" },
                        { id: "month", name: "Месяц" },
                        { id: "year", name: "Год" },
                      ]}
                      onSelect={(per) => {
                        setPeriod(per as any);
                      }}
                    />
                  </div>
                </>
              }

              <h3>Период</h3>
              <div className={`${styles.row} ${styles.period}`}>
                <div className={styles.datepicker}>
                  <label>с</label>
                  {/* <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  /> */}
                  <DatePicker
                    selected={new Date(dateFrom)}
                    onFocus={() => setOpenFrom(true)}
                    onBlur={() => setOpenFrom(false)}
                    maxDate={new Date(Date.now())}
                    dateFormat={"dd.MM.yyyy"}
                    className={styles.datepicker__input}
                    onChange={(date) =>
                      setDateFrom(formatDateToYYYYMMDD(date as Date))
                    }
                  />
                  <span
                    className={`${select.arrow} ${openFrom ? select.up : ""}`}
                    style={{
                      marginLeft: "-40px",
                      marginRight: "20px",
                      pointerEvents: "none",
                    }}
                  >
                    ▼
                  </span>
                </div>
                <div className={styles.datepicker}>
                  <label>по</label>
                  {/* <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  /> */}
                  <DatePicker
                    selected={new Date(dateTo)}
                    className={styles.datepicker__input}
                    onFocus={() => setOpenTo(true)}
                    onBlur={() => setOpenTo(false)}
                    maxDate={new Date(Date.now())}
                    dateFormat={"dd.MM.yyyy"}
                    onChange={(date) =>
                      setDateTo(formatDateToYYYYMMDD(date as Date))
                    }
                  />
                  <span
                    className={`${select.arrow} ${openTo ? select.up : ""}`}
                    style={{
                      marginLeft: "-40px",
                      marginRight: "20px",
                      pointerEvents: "none",
                    }}
                  >
                    ▼
                  </span>
                </div>
              </div>
            </div>

            <div className={`${styles.panelCol} ${styles.panelColShort}`}>
              <h3>Цена</h3>
              <div className={styles.row}>
                {/* <select
                  value={priceExtreme}
                  onChange={handlePriceExtremeChange}
                >
                  <option value="min">Минимум</option>
                  <option value="max">Максимум</option>
                </select> */}
                <CategorySelect
                  placeholder="Минимум"
                  options={[
                    { id: "min", name: "Минимум" },
                    { id: "avg", name: "Средняя" },
                    { id: "max", name: "Максимум" },
                  ]}
                  onSelect={(per) => {
                    handlePriceExtremeChange(per as string);
                  }}
                />
              </div>
              <h3>Тип цен</h3>
              <div className={styles.row}>
                {/* <select value={priceType} onChange={handlePriceTypeChange}>
                  <option value="opt">Опт</option>
                  <option value="rozn">Розница</option>
                </select> */}
                <CategorySelect
                  placeholder="Опт"
                  options={[
                    { id: "opt", name: "Опт" },
                    { id: "rozn", name: "Розница" },
                  ]}
                  onSelect={(per) => {
                    handlePriceTypeChange(per as string);
                  }}
                />
              </div>
            </div>
          </div>

          <div className={styles.chipsRow}>
            {selectedItems.map((s, idx) => (
              <div
                key={`${s.type}:${s.id}`}
                className={styles.chip}
                style={{ borderColor: "#ddd", backgroundColor: colors[idx] }}
              >
                <span>{s.label}</span>
                <button
                  className={styles.chipClose}
                  onClick={() => removeSelected(s.type, s.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className={styles.hint}>
            Доступно {selectedItems.length} позици
            {selectedItems.length == 1
              ? "я"
              : selectedItems.length >= 2
              ? "и"
              : "й"}{" "}
            для построения графика
          </div>
          <div className={styles.buildRow}>
            <button className="orange_button" onClick={onBuildClick}>
              {title === "Динамика" ? "ПОСТРОИТЬ ГРАФИК" : "ПОСТРОИТЬ ТАБЛИЦУ"}
            </button>
          </div>
        </div>

        <div className={styles.chartWrap}>
          <VisualizationComponent
            selectedItems={visualizationSelectedItems}
            dateFrom={dateFrom}
            dateTo={dateTo}
            period={period}
            priceField={priceField}
            apiBase={API_URL || ""}
            buildKey={buildKey}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
