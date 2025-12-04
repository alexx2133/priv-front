import Link from "next/link";
import style from "./styles/info.module.scss";
import { ManagedImg } from "../preload/managedImg";
export interface IInfo {
  image: string;
  link: { to: string; title: string };
  descr: string[];
}

const Info = ({ info }: { info: IInfo[] }) => {
  return (
    <div className={style.info}>
      {info.map((el, i) => (
        <div className={style.info__block} key={i}>
          <img src={el.image} alt={el.link.to} />
          <Link href={el.link.to} className={style.info__link}>
            <button>{el.link.title}</button>
          </Link>
          <ul>
            {el.descr.map((d, n) => (
              <li key={n}>{d}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default Info;
