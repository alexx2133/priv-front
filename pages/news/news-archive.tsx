import Head from "next/head";
import PageStart from "../../components/Common/pageStart";
import NewsPage from "../../components/NewsPage/newsPage";
import { FRONT_URL } from "../../utils/api/config";

const ArchiveNews = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Архивные новости симферопольского рынка "Крымский Привоз" |
          Официальный сайт оптового рынка "Крымский Привоз" - г. Симферополь
        </title>
        <meta
          name="description"
          content="Архив новостей рынка Крымский Привоз за предыдущие годы. Aрхивные объявления и изменения на рынке."
        />

        {/* OG теги */}
        <meta property="og:title" content="Архив новостей | Крымский Привоз" />
        <meta
          property="og:description"
          content="Архив новостей рынка Крымский Привоз за предыдущие годы. Aрхивные объявления и изменения на рынке."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.png`} />
        <meta property="og:url" content={`${FRONT_URL}/news-archive`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Архив новостей | Крымский Привоз" />
        <meta
          name="twitter:description"
          content="Архив новостей рынка Крымский Привоз за предыдущие годы. Aрхивные объявления и изменения на рынке."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.png`} />
        <link rel="canonical" href={`${FRONT_URL}/news-archive`} />
      </Head>
      <NewsPage isArchive={true} />
    </PageStart>
  );
};
export default ArchiveNews;
