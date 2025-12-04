import Title from "../Common/title";
import Banner from "../Common/banner";
import ContactsFeedback from "./contactsFeedback";
import ContactsInfo from "./contactsInfo";
import style from "./styles/contacts.module.scss";
import { useEffect } from "react";
import YandexMap from "./yandexMap";
import { useAppStore } from "../../stores/app";
const ContactsPage = () => {
  const { settings } = useAppStore();

  return (
    <div className={style.contacts}>
      <Banner
        bg={settings.data?.headers_contacts?.data}
        nav={[
          {
            text: "Архив новостей",
            path: "/news/news-archive",
            image: "../../contacts/icon-archive-news.png",
          },
          {
            text: "Последные новости",
            path: "/news",
            image: "../../contacts/icon-last-news.png",
          },
        ]}
      />
      <div className={style.contacts__info}>
        <Title image={"contacts/contacts.png"} title={"Контакты"} />
        <ContactsInfo />
        <Title image={"contacts/maps.png"} title={"Карта проезда"} />

        <YandexMap />
        <Title image={"contacts/feedback.png"} title={"Обратная связь"} />
        <ContactsFeedback />
      </div>
    </div>
  );
};
export default ContactsPage;
