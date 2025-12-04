import Link from "next/link";
import style from "./styles/characteristics.module.scss";
import { ManagedImg } from "../preload/managedImg";

const Characteristics = () => {
  const marketInfo1 = [
    {
      image: "main_page/char/location.png",
      title: "Местонахождение",
      answer: "Республика Крым, г. Симферополь, ул. Киевская, 144",
    },
    {
      image: "main_page/char/area.png",
      title: "Общая площадь рынка",
      answer: "12 га",
    },
    {
      image: "main_page/char/trade-area.png",
      title: "Площадь торговых зон",
      answer: "45 000 м²",
    },
    {
      image: "main_page/char/places.png",
      title: "Торговых мест",
      answer: "1 300 шт.",
    },
    {
      image: "main_page/char/parking.png",
      title: "Парковочных мест",
      answer: "1 500 мест",
    },
    {
      image: "main_page/char/format.png",
      title: "Формат",
      answer:
        "специализированный для торговли с автотранспорта оптово-розничный рынок сельскохозяйственной продукции",
    },
  ];
  const marketInfo2 = [
    {
      image: "main_page/char/turnover.png",
      title: "Товарооборот",
      answer: "426 000 тонн в год",
    },
    {
      image: "main_page/char/schedule.png",
      title: "Режим работы",
      answer: "круглосуточный без перерывов и выходных",
    },
    {
      image: "main_page/char/prices.png",
      title: "Цены",
      answer: "самые низкие в Симферополе и в Крыму",
    },
    {
      image: "main_page/char/clients.png",
      title: "Рынок обслуживает",
      answer:
        "2.5 млн. человек населения Крыма. Дополнительно в летний период 5-6 млн. гостей Крыма",
    },
    {
      image: "main_page/char/infrastructure.png",
      title: "Инфраструктура",
      answer:
        "ветеринарно-санитарная лаборатория, парковка, предприятия общественного питания, туалет, душ, сети видеонаблюдения, сети громкой связи, контрольные весы",
    },
  ];
  return (
    <section className={style.char}>
      <h1 className={style.char__title}>Характеристики рынка</h1>
      <div className={style.char__content}>
        <div className={style.char__col}>
          {marketInfo1.map((el, i) => (
            <div className={style.char__block} key={i}>
              <div className={style.char__block__image}>
                <img src={el.image} alt={el.title} />
              </div>
              <div className={style.char__block__text}>
                <span>{el.title}: </span>
                {el.answer}
              </div>
            </div>
          ))}
        </div>
        <div className={style.char__col}>
          {marketInfo2.map((el, i) => (
            <div className={style.char__block} key={i}>
              <div className={style.char__block__image}>
                <img src={el.image} alt={el.title} />
              </div>
              <div className={style.char__block__text}>
                <span>{el.title}: </span>
                {el.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Characteristics;
