import GreenImage from "../Common/greenImage";
import { IRent } from "./sellersPage";
import style from "./styles/rent.module.scss";
const Infrastructure = ({
  info,
  title,
  col,
}: {
  info: IRent[];
  title: string;
  col: number;
}) => {
  return (
    <div className={style.rent}>
      <div className={style.rent__content}>
        <h1 className={style.rent__infra}>{title}</h1>

        <div className={col == 2 ? style.rent__grid2 : style.rent__grid}>
          {info.map((el, i) => {
            return (
              <div
                className={
                  info.length % 3 == 0
                    ? style.rent__row__block
                    : style.rent__row__block2
                }
                key={i}
              >
                <GreenImage image={el.image} key={i} />
                <div className={style.rent__row__title}>{el.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Infrastructure;
