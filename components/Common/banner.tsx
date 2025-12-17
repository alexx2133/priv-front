import Link from "next/link";
import style from "./styles/banner.module.scss";
import NavBlock from "../Common/navBlock";
import { ManagedImg } from "../preload/managedImg";
import { getSettingsUrl } from "../../utils/api/config";
import ProgressiveImage from "../img/progressiveImage";
import { useEffect, useState } from "react";
interface IBanner {
  bg: string;
  notactive?: number;
  margin?: boolean;
  nav: {
    text: string;
    path: string;
    func?: () => void;
    image: string;
  }[];
}
const Banner = ({ bg, nav, notactive, margin }: IBanner) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  if (!bg || bg?.includes("undefined")) return <div />;
  return (
    <div
      className={style.banner}
      style={{ marginBottom: margin ? "55px" : "0px" }}
    >
      <div className={style.banner__bg}>
        <ProgressiveImage
          width={dimensions.width}
          height={565}
          src={getSettingsUrl(bg)}
          alt={"bg"}
        />
      </div>
      <div className={style.banner__nav}>
        {nav.map((el, i) => {
          return (
            <NavBlock
              text={el.text}
              path={el.path}
              image={el.image}
              func={el.func}
              key={i}
              gray={notactive == i + 1 ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Banner;
