import GreenImage from "../Common/greenImage";
import { IRent } from "./sellersPage";
import style from "./styles/rent.module.scss";
const notFarmInfo: IRent[] = [
  {
    image: "sellers/notfarm1.png",
    title: "Въезд к арендатору",
  },
  {
    image: "sellers/notfarm2.png",
    title: "Въезд бесплатный",
  },
  {
    image: "sellers/notfarm3.png",
    title: "Товарно-транспортная накладная",
  },
];
const NotFarm = () => {
  return (
    <div className={style.rent}>
      <div className={style.rent__content}>
        <h1 className={style.rent__title}>
          Въезд для поставщиков несельскохозяйственной продукции
        </h1>

        <div className={style.rent__row}>
          {notFarmInfo.map((el, i) => {
            return (
              <div className={style.rent__row__block} key={i}>
                <GreenImage image={el.image} key={i} />
                <div className={style.rent__row__title}>{el.title}</div>
              </div>
            );
          })}
        </div>
        <h2>
          В накладной необходимо указать: данные арендатора и его торговое место
        </h2>
      </div>
    </div>
  );
};
export default NotFarm;
