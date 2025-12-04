import Head from "next/head";
import PageStart from "../../components/Common/pageStart";
import NewsPage from "../../components/NewsPage/newsPage";
import { FRONT_URL } from "../../utils/api/config";
// import { newsMock } from "./news-archive";

const News = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Новости симферопольского рынка "Крымский Привоз" | Официальный сайт
          оптового рынка "Крымский Привоз" - г. Симферополь
        </title>
        <meta
          name="description"
          content="Последние новости и события рынка Крымский Привоз в Симферополе. Изменения в графике работы, важные объявления для покупателей и продавцов."
        />

        {/* OG теги */}
        <meta property="og:title" content="Новости рынка Крымский Привоз" />
        <meta
          property="og:description"
          content="Последние новости и события рынка Крымский Привоз в Симферополе. Изменения в графике работы, важные объявления для покупателей и продавцов."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.jpg`} />
        <meta property="og:url" content={`${FRONT_URL}/news`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Новости рынка Крымский Привоз" />
        <meta
          name="twitter:description"
          content="Последние новости и события рынка Крымский Привоз в Симферополе. Изменения в графике работы, важные объявления для покупателей и продавцов"
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.jpg`} />
        <link rel="canonical" href={`${FRONT_URL}/news`} />
      </Head>
      <NewsPage isArchive={false} />
    </PageStart>
  );
};
export default News;
