import { useAppStore } from "../../stores/app";
import style from "./styles/contacts.module.scss";
const ContactsInfo = () => {
  const { settings } = useAppStore();
  return (
    <div className={style.contacts__info__text}>
      <div className={style.contacts__info__text__col}>
        <h3>График работы:</h3>
        <div style={{ marginBottom: "35px" }}>
          {settings.data?.contacts_schedule?.data}
        </div>
        <h3>Как доехать общественным транспортом:</h3>
        <p>{settings.data?.customers_transport_number?.data}</p>
      </div>
      <div className={style.contacts__info__text__col}>
        <h3>Адрес:</h3>
        <p>{settings.data?.contacts_address?.data}</p>
        <h3>GPS координаты</h3>
        <p>{settings.data?.contacts_gps?.data}</p>
        <h3>Телефоны:</h3>
        <div>{settings.data?.contacts_phones?.data}</div>
      </div>
    </div>
  );
};
export default ContactsInfo;
