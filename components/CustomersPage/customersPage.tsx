import Banner from "../Common/banner";
import Title from "../Common/title";
import { Slider } from "../MainPage/slider";
import style from "../SellersPage/styles/sellers.module.scss";
import Info from "../Common/info";
import { info, infraInfo } from "../SellersPage/sellersPage";
import Infrastructure from "../SellersPage/infrastructure";
import YandexMap from "../Contacts/yandexMap";
import CarPrices from "../Common/carPrices";
import InteractiveMap from "../AboutPage/interactiveMap";
import Lab from "../SellersPage/lab";
import { useAppStore } from "../../stores/app";
import { useEffect } from "react";
import DocumentsSection from "../Documents/documentsSection";
const notFarmInfo: IRent[] = [
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

export interface IRent {
  image: string;
  title: string;
}

const CustomersPage = () => {
  const { loadBanners, customerBanners, settings } = useAppStore();
  useEffect(() => {
    loadBanners(3);
  }, []);
  return (
    <div className={style.sellers}>
      <Banner
        bg={settings?.data.headers_customers?.data}
        nav={[
          {
            text: "На рынок пешком",
            path: "#people",
            image: "../../buyers/icon-people.png",
          },
          {
            text: "На рынок на авто",
            path: "#car",
            image: "../../buyers/icon-car.png",
          },
        ]}
      />
      <div className={style.sellers__info}>
        <Slider slides={customerBanners?.data} />
        <Info info={info} />
        <Title title="На рынок пешком" image="buyers/people.png" />
        <a className={style.sellers__button} href="#documents">
          <div className="orange_button">ДОКУМЕНТЫ ДЛЯ ПОКУПАТЕЛЕЙ</div>
        </a>
        <div id="people" />
        <Infrastructure
          info={infraInfo}
          title="Для покупателей без авто"
          col={3}
        />
        <Title title="Карта проезда на рынок" image="contacts/maps.png" />
        <div className={style.sellers__map_info}>
          <p>{settings?.data.contacts_bus?.data}</p>

          <YandexMap />
        </div>
        <Title title="На рынок на авто" image="buyers/car.png" />
        <a className={style.sellers__button} href="#documents">
          <div className="orange_button">ДОКУМЕНТЫ ДЛЯ ПОКУПАТЕЛЕЙ</div>
        </a>
        <div id="car" />
        <Infrastructure
          info={[
            {
              image: "buyers/pay.png",
              title: "Въезд на территорию рынка – платный",
            },
            {
              image: "buyers/parking.png",
              title: "Наружная парковка – бесплатно",
            },
            ...infraInfo,
          ]}
          title="Для покупателей на авто"
          col={3}
        />
        <CarPrices
          title="Тарифы для въезда на рынок покупателей на авто"
          prices={[
            settings?.data.customers_price_5?.data,
            settings?.data.customers_price_6?.data,
            settings?.data.customers_price_8?.data,
            settings?.data.customers_price_12?.data,
            settings?.data.customers_price_12plus?.data,
          ]}
        />
        <div id="documents" />
        <Title title="Документы для скачивания" image="sellers/document.png" />
        <DocumentsSection documentType="customers" />
        <Title image={"about/schema.png"} title={"Cхема рынка"} />
        <InteractiveMap />
        <Title
          image={"sellers/laboratory.png"}
          title={"Ветеринарно-санитарная лаборатория"}
        />
        <Lab />
      </div>{" "}
    </div>
  );
};
export default CustomersPage;
