import Head from "next/head";
import Analytics from "../components/AnalyticsCompare/analytics";
import { CompareTable } from "../components/AnalyticsCompare/сompareTable";
import PageStart from "../components/Common/pageStart";
import { FRONT_URL } from "../utils/api/config";

const ComparePage = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Сравнение цен | Официальный сайт оптового рынка "Крымский Привоз" - г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Сравнение цен на продукты на рынке Крымский Привоз с другими рынками Симферополя. Анализ изменения цен."
        />

        {/* OG теги */}
        <meta
          property="og:title"
          content="Сравнение цен на продукты | Крымский Привоз"
        />
        <meta
          property="og:description"
          content="Сравнение цен на продукты на рынке Крымский Привоз с другими рынками Симферополя. Анализ изменения цен."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.png`} />
        <meta property="og:url" content={`${FRONT_URL}/compare`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Сравнение цен на продукты | Крымский Привоз"
        />
        <meta
          name="twitter:description"
          content="Сравнение цен на продукты на рынке Крымский Привоз с другими рынками Симферополя. Анализ изменения цен."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.png`} />
        <link rel="canonical" href={`${FRONT_URL}/compare`} />
      </Head>
      <Analytics
        title="Сравнение"
        icon="../../icons/compare.png"
        visualizationComponent={CompareTable}
      />
    </PageStart>
  );
};

export default ComparePage;
