import { ManagedImg } from "../preload/managedImg";
import { ICar } from "./carPrices";
import style from "./styles/carPrices.module.scss";
const CarBlock = ({ el, price }: { el: ICar; price: number }) => {
  return (
    <div className={style.car__block}>
      <div className={style.car__block__info}>
        <div className={style.car__block__size}>
          <p>{el.size}</p>
          <img src={el.img2} alt="arrow" />
        </div>
        <img src={el.img1} alt="car" />
      </div>
      <div className={style.car__block__bottom}>
        <div className={style.car__block__text}>{el.text}</div>
        <div className={style.car__block__price}>
          {price} <span>руб.</span>
        </div>
      </div>
    </div>
  );
};
export default CarBlock;
