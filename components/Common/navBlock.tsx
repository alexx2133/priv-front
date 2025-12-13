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
  // console.log(func);
  return (
    <Link href={path} onClick={() => func && func()}>
      <div
        className={style.nav__block}
        style={
          !gray
            ? {
                boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
                pointerEvents: "none",
              }
            : {}
        }
      >
        <img
          src={image}
          alt={path}
          style={gray ? { filter: "grayscale(1)" } : {}}
        />
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
