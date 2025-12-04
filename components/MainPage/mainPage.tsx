"use client";
import style from "./styles/main.module.scss";
import BuySell from "./buysell";
import Characteristics from "./characteristics";
import Categories from "./categories";
import BannerMain from "./bannerMain";
import { useEffect } from "react";
import { useAppStore } from "../../stores/app";

const MainPage = () => {
  const { loadBanners, loadCategories } = useAppStore();
  useEffect(() => {
    loadCategories();
    loadBanners(1);
  }, []);
  return (
    <div className={style.main_page}>
      <BannerMain />
      <div className={style.second_part}>
        <Characteristics />
        <div className={style.margin} />
        <BuySell />
        <div className={style.margin} />
      </div>
      <Categories />
    </div>
  );
};
export default MainPage;
