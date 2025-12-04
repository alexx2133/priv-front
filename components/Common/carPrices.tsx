import CarBlock from "./carBlock";
import style from "./styles/carPrices.module.scss";
export interface ICar {
  size: string;
  img1: string;
  img2: string;
  text: string;
}
const carList: ICar[] = [
  {
    size: "до 5 метров",
    img1: "sellers/car_1.png",
    img2: "sellers/arrow-1.png",
    text: "Легковой автомобиль",
  },
  {
    size: "до 6 метров",
    img1: "sellers/car_2.png",
    img2: "sellers/arrow-2.png",
    text: "Микроавтобус, легковой автомобиль с прицепом, автомобиль типа Мерседес Вито, Опель Виваро",
  },
  {
    size: "до 8 метров",
    img1: "sellers/car_3.png",
    img2: "sellers/arrow-3.png",
    text: "Микроавтобус или грузовой автомобиль",
  },
  {
    size: "до 12 метров",
    img1: "sellers/car_4.png",
    img2: "sellers/arrow-4.png",
    text: "Грузовой автомобиль с прицепом или полуприцепом, автомобиль типа КАМАЗ, МАЗ",
  },
  {
    size: "более 12 метров",
    img1: "sellers/car_5.png",
    img2: "sellers/arrow-5.png",
    text: "Грузовой автомобиль с полуприцепом или прицепом",
  },
];
const CarPrices = ({ title, prices }: { title: string; prices: number[] }) => {
  return (
    <div className={style.car}>
      <h1>{title}</h1>
      <div className={style.car__row}>
        {carList.map((el, i) => {
          if (i <= 2) {
            return <CarBlock el={el} price={prices[i]} key={i} />;
          }
        })}
      </div>
      <div className={style.car__row2}>
        {carList.map((el, i) => {
          if (i > 2) {
            return <CarBlock el={el} price={prices[i]} key={i} />;
          }
        })}
      </div>
    </div>
  );
};
export default CarPrices;
