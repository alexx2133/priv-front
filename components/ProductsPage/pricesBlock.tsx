// components/PricesPage/PricesBlock.tsx
import { getProductsUrl } from "../../utils/api/config";
import { ManagedImg } from "../preload/managedImg";
import style from "./styles/block.module.scss";

interface Product {
  id: number;
  category_id: number;
  name: string;
  opt_price_min: string;
  opt_price_max: string;
  opt_unit: number;
  rozn_price_min: string;
  rozn_price_max: string;
  rozn_unit: number;
  image: string;
  changed: string;
}

const PricesBlock = ({ product }: { product: Product }) => {
  const getUnitText = (unit: number) => (unit === 2 ? "шт" : "кг");

  return (
    <div className={style.block}>
      <div className={style.block__top}>
        <img
          src={getProductsUrl(`/${product.image}`)}
          alt={product.name}
          style={{ maxWidth: "100%" }}
        />
        <h2>{product.name}</h2>
      </div>
      <div className={style.block__bottom}>
        <div className={style.block__minmax}>
          <p>мин</p>
          <p>макс</p>
        </div>
        <div className={style.block__wholesale}>
          <div className={style.block__type}>
            <p>oпт</p>
            <span>{getUnitText(product.opt_unit)}</span>
          </div>
          <div className={style.block__prices}>
            <p className={style.block__price}>
              {product.opt_price_min.slice(0, -3) || "-"}
            </p>
            <p className={style.block__price}>
              {product.opt_price_max.slice(0, -3) || "-"}
            </p>
          </div>
        </div>
        <div className={style.block__wholesale}>
          <div className={style.block__type}>
            <p>розн</p>
            <span>{getUnitText(product.rozn_unit)}</span>
          </div>
          <div className={style.block__prices}>
            <p className={style.block__price}>
              {product.rozn_price_min.slice(0, -3) || "-"}
            </p>
            <p className={style.block__price}>
              {product.rozn_price_max.slice(0, -3) || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricesBlock;
