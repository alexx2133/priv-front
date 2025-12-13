import Link from "next/link";
import style from "./styles/buysell.module.scss";
import { ManagedImg } from "../preload/managedImg";

const BuySell = () => {
  const sellInfo = [
    {
      image: "main_page/buysell/1.png",
      title: "Предприятия сельхозпроизводители",
    },
    {
      image: "main_page/buysell/2.png",
      title: "Фермеры",
    },
    {
      image: "main_page/buysell/3.png",
      title: "Граждане, имеющие личное подсобное хозяйство",
    },
    {
      image: "main_page/buysell/4.png",
      title: "Торговые предприятия",
    },
    {
      image: "main_page/buysell/5.png",
      title: "Компании-импортеры",
    },
  ];
  const buyInfo = [
    {
      image: "main_page/buysell/6.png",
      title: "Розничные рынки",
    },
    {
      image: "main_page/buysell/7.png",
      title: "Продуктовые магазины",
    },
    {
      image: "main_page/buysell/8.png",
      title: "Рестораны, кафе",
    },
    {
      image: "main_page/buysell/9.png",
      title: "Отели, базы отдыха, санатории",
    },
    {
      image: "main_page/buysell/10.png",
      title: "Население и гости Крыма",
    },
  ];
  return (
    <section className={style.buysell}>
      <h1 className={style.buysell__title}>Целевая аудитория</h1>
      <div className={style.buysell__content}>
        <div className={style.buysell__subtitle}>
          <img src={"main_page/buysell/seller.png"} alt="seller" />
          <h2>Продавцы</h2>
        </div>
        <div className={style.buysell__col}>
          {sellInfo.map((el, i) => (
            <div className={style.buysell__block} key={i}>
              <div className={style.buysell__block__image}>
                <img src={el.image} alt={el.title} />
              </div>
              <div className={style.buysell__block__text}>{el.title}</div>
            </div>
          ))}
        </div>
        <div className={style.buysell__subtitle}>
          <img src={"main_page/buysell/customers.png"} alt="customers" />
          <h2>Покупатели</h2>
        </div>
        <div className={style.buysell__col}>
          {buyInfo.map((el, i) => (
            <div className={style.buysell__block} key={i}>
              <div className={style.buysell__block__image}>
                <img src={el.image} alt={el.title} />
              </div>
              <div className={style.buysell__block__text}>{el.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BuySell;
