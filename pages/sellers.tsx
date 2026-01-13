import Head from "next/head";
import PageStart from "../components/Common/pageStart";
import SellersPage from "../components/SellersPage/sellersPage";
import { FRONT_URL } from "../utils/api/config";

const Sellers = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Для Продавцов | Официальный сайт оптового рынка "Крымский Привоз" г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Условия для продавцов на рынке Крымский Привоз. Аренда торговых мест, тарифы на въезд, правила безопасности и правила посещения рынка."
        />
        <meta property="og:title" content="Для Продавцов | Крымский Привоз" />
        <meta
          property="og:description"
          content="Условия для продавцов на рынке Крымский Привоз. Аренда торговых мест, тарифы на въезд, правила безопасности и правила посещения рынка."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.png`} />
        <meta property="og:url" content={`${FRONT_URL}/sellers`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Для Продавцов | Крымский Привоз" />
        <meta
          name="twitter:description"
          content="Условия для продавцов на рынке Крымский Привоз. Аренда торговых мест, тарифы на въезд, правила безопасности и правила посещения рынка."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.png`} />
        <link rel="canonical" href={`${FRONT_URL}/sellers`} />
      </Head>
      <SellersPage />
    </PageStart>
  );
};

export default Sellers;
