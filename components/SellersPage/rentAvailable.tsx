import GreenImage from "../Common/greenImage";
import { IRent } from "./sellersPage";
import style from "./styles/rent.module.scss";

const RentAvailable = ({
  rentAvailableInfo,
}: {
  rentAvailableInfo: IRent[];
}) => {
  return (
    <div className={style.rent}>
      <div className={style.rent__content}>
        <h1 className={style.rent__title} style={{ marginBottom: 0 }}>
          Стоимость аренды зависит от торгового места
          <br /> и определяется при заключении договора
        </h1>
        <h2 className={style.rent__title2}>В аренду доступно:</h2>
        <div className={style.rent__row}>
          {rentAvailableInfo.map((el, i) => {
            if (i < 3) {
              return (
                <div className={style.rent__row__block} key={i}>
                  <GreenImage image={el.image} key={i} />
                  <div className={style.rent__row__title}>{el.title}</div>
                </div>
              );
            }
          })}
        </div>
        <h2 className={style.rent__title2}>Кому доступна аренда:</h2>
        <div className={style.rent__row}>
          {rentAvailableInfo.map((el, i) => {
            if (i >= 3) {
              return (
                <div className={style.rent__row__block} key={i}>
                  <GreenImage image={el.image} key={i} />
                  <div className={style.rent__row__title}>{el.title}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default RentAvailable;
