import CustomersPage from "../components/CustomersPage/customersPage";
import PageStart from "../components/Common/pageStart";
import Head from "next/head";
import { FRONT_URL } from "../utils/api/config";

const Customers = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Для Покупателей | Официальный сайт оптового рынка "Крымский Привоз" г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Тарифы на въезд на симферопольский рынок 'Крымский Привоз' для покупателей. Условия заезда на рынок, график работы."
        />

        {/* OG теги */}
        <meta property="og:title" content="Для Покупателей | Крымский Привоз" />
        <meta
          property="og:description"
          content="Тарифы на въезд на симферопольский рынок 'Крымский Привоз' для покупателей. Условия заезда на рынок, график работы."
        />
        <meta
          property="og:image"
          content={`${FRONT_URL}/og-image.jpg`}
        />
        <meta property="og:url" content={`${FRONT_URL}/customers`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Для Покупателей | Крымский Привоз"
        />
        <meta
          name="twitter:description"
          content="Тарифы на въезд на симферопольский рынок 'Крымский Привоз' для покупателей. Условия заезда на рынок, график работы."
        />
        <meta
          name="twitter:image"
          content={`${FRONT_URL}/og-image.jpg`}
        />
        <link rel="canonical" href={`${FRONT_URL}/customers`} />
      </Head>
      <CustomersPage />
    </PageStart>
  );
};
export default Customers;
