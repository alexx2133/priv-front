"use client";
import Banner from "../Common/banner";
import Title from "../Common/title";
import { Slider } from "../MainPage/slider";
import style from "./styles/sellers.module.scss";
import Info, { IInfo } from "../Common/info";
import RentAvailable from "./rentAvailable";
import CarPrices from "../Common/carPrices";
import NotFarm from "./notFarm";
import InteractiveMap from "../AboutPage/interactiveMap";
import Infrastructure from "./infrastructure";
import Lab from "./lab";
import { useAppStore } from "../../stores/app";
import { useEffect } from "react";
import DocumentsSection from "../Documents/documentsSection";
export const infraInfo: IRent[] = [
  {
    image: "sellers/infrastructure/lab.png",
    title: "Ветеринарно-санитарная лаборатория",
  },
  {
    image: "sellers/infrastructure/weight.png",
    title: "Контрольные весы",
  },
  {
    image: "sellers/infrastructure/cafe.png",
    title: "Кафе",
  },
  {
    image: "sellers/infrastructure/wc.png",
    title: "Туалет",
  },
  {
    image: "sellers/infrastructure/shower.png",
    title: "Душ",
  },
  {
    image: "sellers/infrastructure/cam.png",
    title: "Видеонаблюдение",
  },
  {
    image: "sellers/infrastructure/loud.png",
    title: "Сети громкой связи",
  },
];
export const info: IInfo[] = [
  {
    image: "/sellers/seller-card-1.png",
    link: { to: "#documents", title: "Документы" },
    descr: ["Правила", "План-схема", "Справки", "Требования"],
  },
  {
    image: "/sellers/seller-card-2.png",
    link: { to: "#schema", title: "СХЕМА РЫНКА" },
    descr: ["Проезд по рынку", "Инфраструктура рынка", "Схема рынка"],
  },
  {
    image: "/sellers/seller-card-3.png",
    link: { to: "#lab", title: "ЛАБОРАТОРИЯ" },
    descr: [
      "Радиология",
      "Биохимия",
      "Бактериология",
      "Органолептика",
      "Физико-химия",
    ],
  },
];
export interface IRent {
  image: string;
  title: string;
}
const rentAvailable: IRent[] = [
  {
    image: "sellers/available1.png",
    title: "Склады и магазины",
  },
  {
    image: "sellers/available2.png",
    title: "Места на площадке рынка",
  },
  {
    image: "sellers/available3.png",
    title: "Места под навесом",
  },
  {
    image: "sellers/available4.png",
    title: "Юридическое лицо",
  },
  {
    image: "sellers/available5.png",
    title: "Индивидуальный предприниматель",
  },
  {
    image: "sellers/available6.png",
    title: "Физическое лицо со справкой о земле",
  },
];
const rentAvailable2: IRent[] = [
  {
    image: "sellers/available7.png",
    title: "Места на площадке для торговли с авто",
  },
  {
    image: "sellers/available8.png",
    title: "Места на площадке для торговли с палаткой",
  },
  {
    image: "sellers/available3.png",
    title: "Места под навесом",
  },
  {
    image: "sellers/available4.png",
    title: "Юридическое лицо",
  },
  {
    image: "sellers/available5.png",
    title: "Индивидуальный предприниматель",
  },
  {
    image: "sellers/available6.png",
    title: "Физическое лицо со справкой о земле",
  },
];
const SellersPage = () => {
  const { loadBanners, sellerBanners, settings } = useAppStore();
  useEffect(() => {
    loadBanners(3);
  }, []);
  return (
    <div className={style.sellers}>
      <Banner
        bg={settings?.data.headers_sellers?.data}
        nav={[
          {
            text: "Длительная аренда",
            path: "#long",
            image: "../../sellers/icon-long-rent.png",
          },
          {
            text: "Суточная аренда",
            path: "#day",
            image: "../../sellers/icon-day-rent.png",
          },
        ]}
      />
      <div className={style.sellers__info}>
        <Slider slides={sellerBanners.data} />

        <Info info={info} />
        <div id="long" />
        <Title
          title="Длительная аренда (от одного месяца)"
          image="sellers/rent-day.png"
        />
        <a href="#documents" className={style.sellers__button}>
          <div className="orange_button">
            ДОКУМЕНТЫ ДЛЯ ЗАКЛЮЧЕНИЯ ДОГОВОРА АРЕНДЫ
          </div>
        </a>
        <RentAvailable rentAvailableInfo={rentAvailable} />
        <CarPrices
          title="Тарифы на ввоз сельскохозяйственной продукции на рынок при заключении длительного договора аренды:"
          prices={[0, 0, 0, 0, 0]}
        />
        <NotFarm />
        <div id="day" />
        <Title
          title="Суточная аренда (посуточная оплата)"
          image="sellers/rent-day.png"
        />

        <a href="#documents" className={style.sellers__button}>
          <div className="orange_button">ДОКУМЕНТЫ ДЛЯ ЗАКЛЮЧЕНИЯ ДОГОВОРА</div>
        </a>

        <RentAvailable rentAvailableInfo={rentAvailable2} />
        <div className={style.sellers__top}>
          При въезде на территорию рынка оплачивается ввоз товара и стоимость
          аренды торгового места за первые сутки
        </div>
        <CarPrices
          title="Тарифы аренды торгового места за сутки для торговли с автотранспорта:"
          prices={[850, 1500, 2350, 4250, 6400]}
        />
        <div className={style.sellers__title}>
          <h1>
            Продавцы при въезде дополнительно оплачивают услугу «Ввоз товара на
            рынок»
          </h1>
        </div>
        <div id="documents" />
        <Title title="Документы для скачивания" image="sellers/document.png" />
        <DocumentsSection documentType="sellers" />
        <Title image={"about/schema.png"} title={"Cхема рынка"} />
        <div id="schema" />
        <InteractiveMap />
        <Infrastructure info={infraInfo} title="Инфраструктура" col={3} />
        <div id="lab" />
        <Title
          image={"sellers/laboratory.png"}
          title={"Ветеринарно-санитарная лаборатория"}
        />

        <Lab />
      </div>{" "}
    </div>
  );
};
export default SellersPage;
