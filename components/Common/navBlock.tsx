import Link from "next/link";
import style from "./styles/navBlock.module.scss";
import { ManagedImg } from "../preload/managedImg";
interface INavBlock {
  image: string;
  path: string;
  text: string;
  gray?: boolean;
  func?: () => void;
}
const NavBlock = ({ image, path, text, gray, func }: INavBlock) => {
  return (
    <Link href={path}>
      <div
        className={style.nav__block}
        onClick={() => func && func()}
        style={gray ? { filter: "grayscale(1)" } : {}}
      >
        <img src={image} alt={path}/>
        <img
          alt="block arrow"
          src={"../../navigation/icon-header-arrow.png"}
          className={style.nav__block__arrow}
        />
        {text}
      </div>
    </Link>
  );
};
export default NavBlock;
