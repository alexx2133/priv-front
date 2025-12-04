"use client";
import Link from "next/link";
import style from "./styles/bannerMain.module.scss";
import { Slider } from "./slider";
import Info, { IInfo } from "../Common/info";
import { ManagedImg } from "../preload/managedImg";
import { useAppStore } from "../../stores/app";
import { getSettingsUrl } from "../../utils/api/config";
import ProgressiveImage from "../img/progressiveImage";
import { useEffect, useState } from "react";
const info: IInfo[] = [
  {
    image: "/main_page/card-1.png",
    link: { to: "/products", title: "Товары" },
    descr: ["Цены", "Аналитика"],
  },
  {
    image: "/main_page/card-2.png",
    link: { to: "/sellers", title: "Продавцам" },
    descr: ["Тарифы", "Документы"],
  },
  {
    image: "/main_page/card-3.png",
    link: { to: "/customers", title: "Покупателям" },
    descr: ["Тарифы", "Документы"],
  },
];
const BannerMain = () => {
  const { mainBanners, settings } = useAppStore();
  // console.log(mainBanners.data);
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
  return (
    <section
      className={style.banner}
      style={
        {
          // backgroundColor: "#F6FFFE",
          // backgroundImage: `url(${getSettingsUrl(
          //   settings.data.headers_home?.data
          // )})`,
        }
      }
    >
      <div className={style.banner__bg}>
        <ProgressiveImage
          width={dimensions.width}
          height={4070}
          absolute
          src={getSettingsUrl(settings.data.headers_home?.data)}
          alt="bg"
        />
      </div>
      <div className={style.banner__bg_images}>
        <ProgressiveImage
          alt="left"
          width={793}
          height={791}
          src={getSettingsUrl(settings.data.headers_home_left?.data)}
        />
        <ProgressiveImage
          alt="right"
          width={793}
          height={791}
          src={getSettingsUrl(settings.data.headers_home_right?.data)}
        />
      </div>
      <Slider slides={mainBanners.data} />
      <div className={style.banner__info}>
        <Info info={info} />
      </div>
    </section>
  );
};
export default BannerMain;
