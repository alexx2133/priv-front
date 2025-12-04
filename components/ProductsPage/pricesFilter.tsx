// components/PricesPage/PricesFilter.tsx
import { useEffect } from "react";
import { useAppStore } from "../../stores/app";
import { useProductsStore } from "../../stores/productsStore";
import { ManagedImg } from "../preload/managedImg";
import CategorySelect from "./categorySelect";
import Search from "./search";
import style from "./styles/prices.module.scss";

const PricesFilter = ({
  format,
  setFormat,
  setSelected,
  setSearch,
}: {
  format: string;
  setFormat: (f: string) => void;
  setSelected: (categoryId: number | null) => void;
  setSearch: (query: string) => void;
}) => {
  const { categories } = useAppStore();
  const { data: products } = useProductsStore();

  const searchOptions = products.map((product) => product.name);

  return (
    <div className={style.prices__filter}>
      <div className={style.prices__filter__visible}>
        <img
          src={"/prices/view-grid.png"}
          style={{ opacity: format == "grid" ? 1 : 0.2 }}
          onClick={() => setFormat("grid")}
          alt="grid"
        />
        <img
          src={"/prices/view-rows.png"}
          style={{ opacity: format == "rows" ? 1 : 0.2 }}
          onClick={() => setFormat("rows")}
          alt="row"
        />
      </div>
      <div className={style.prices__search_select}>
        <CategorySelect
          options={[{ id: null, name: "Все категории" }, ...categories.data.slice(0, -3)]}
          placeholder="Выберите категорию"
          onSelect={(id) => setSelected(id as number)}
          width="280px"
        />
        <Search
          options={searchOptions}
          placeholder="Поиск..."
          onSelect={setSearch}
        />
      </div>
    </div>
  );
};

export default PricesFilter;
