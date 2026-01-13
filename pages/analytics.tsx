import Head from "next/head";
import Analytics from "../components/AnalyticsCompare/analytics";
import { PriceChartPanel } from "../components/AnalyticsCompare/chartPanel";
import PageStart from "../components/Common/pageStart";
import { FRONT_URL } from "../utils/api/config";

const AnalyticsPage = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Аналитика | Официальный сайт оптового рынка "Крымский Привоз" - г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Графики и анализ изменения цен на продукты. Статистика рынка Крымский Привоз за неделю, месяц, год. Тенденции и прогнозы цен."
        />

        {/* OG теги */}
        <meta property="og:title" content="Аналитика | Крымский Привоз" />
        <meta
          property="og:description"
          content="Графики и анализ изменения цен на продукты. Статистика цен на рынке Крымский Привоз за неделю, месяц, год."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.png`} />
        <meta property="og:url" content={`${FRONT_URL}/analytics`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Аналитика цен на продукты | Крымский Привоз"
        />
        <meta
          name="twitter:description"
          content="Графики и анализ изменения цен на продукты. Статистика цен на рынке Крымский Привоз за неделю, месяц, год."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.png`} />
        <link rel="canonical" href={`${FRONT_URL}/analytics`} />
      </Head>
      <Analytics
        title="Динамика"
        icon="../../icons/dinamic.png"
        visualizationComponent={PriceChartPanel}
      />
    </PageStart>
  );
};

export default AnalyticsPage;
