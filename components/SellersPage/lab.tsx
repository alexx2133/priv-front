import { ManagedImg } from "../preload/managedImg";
import Infrastructure from "./infrastructure";
import { IRent } from "./sellersPage";
import style from "./styles/sellers.module.scss";
const lab: IRent[] = [
  {
    image: "sellers/lab/rad.png",
    title: "Радиологические",
  },
  {
    image: "sellers/lab/bact.png",
    title: "Бактериологические",
  },
  {
    image: "sellers/lab/chem.png",
    title: "Биохимические",
  },
  {
    image: "sellers/lab/org.png",
    title: "Органолептические",
  },
  {
    image: "sellers/lab/phys.png",
    title: "Физико-химические",
  },
];
const Lab = () => {
  return (
    <div className={style.lab}>
      <div className={style.lab__info}>
        <h1 className={style.lab__title}>
          Торговля возможна только после получения одобрения ВСЛ
        </h1>
        <img src="sellers/vetlab.png" alt="lab" />
      </div>
      <div>
        <Infrastructure
          title="Государственная лаборатория ветеринарно-санитарной
экспертизы проводит исследования"
          info={lab}
          col={2}
        />
      </div>

      <h1 className={style.lab__title}>
        Позвонить в лабораторию: <br />
        +7 (978) 837 18 21
      </h1>
      <a
        href="https://xn----8sbdcp1ake9ay8g.xn--p1ai/"
        target="_blank"
        rel="noreferrer"
        className={style.lab__link}
      >
        Ссылка на госсайт ВСЛ
      </a>
    </div>
  );
};

export default Lab;
