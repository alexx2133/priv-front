import { ManagedImg } from "../preload/managedImg";
import style from "./styles/prices.module.scss";
const PricesDate = ({ date, time }: { date: string; time: string }) => {
  console.log(date);
  return (
    <div className={style.prices__date}>
      <div className={style.prices__date__left}>
        <p>Дата обновления:</p>
        <img src={"../../prices/calendar.png"} alt={"calendar"} />
        <p>{date}</p>
        <img src={"../../prices/clock.png"} alt={"clock"} />
        <p>{time}</p>
      </div>
      <div className={style.prices__currency}>
        <p>Валюта</p>
        <img src={"../../prices/rub.png"} alt={"₽"} />
      </div>
    </div>
  );
};

export default PricesDate;
