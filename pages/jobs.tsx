import { usePathname } from "next/navigation";
import Article from "../components/Article/article";
import { useEffect } from "react";
import { useAppStore } from "../stores/app";
import PageStart from "../components/Common/pageStart";
import Head from "next/head";
import { FRONT_URL } from "../utils/api/config";

const JobsPage = () => {
  const { loadBanner, banner } = useAppStore();
  useEffect(() => {
    loadBanner(25);
  }, []);
  return (
    <PageStart>
      <Head>
        <title>
          Вакансии | Официальный сайт оптового рынка "Крымский Привоз" г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Актуальные вакансии на рынке Крымский Привоз в Симферополе. Условия трудоустройства."
        />

        {/* OG теги */}
        <meta property="og:title" content="Вакансии | Крымский Привоз" />
        <meta
          property="og:description"
          content="Актуальные вакансии на рынке Крымский Привоз в Симферополе. Условия трудоустройства."
        />
        <meta
          property="og:image"
          content={`${FRONT_URL}/og-image.jpg`}
        />
        <meta property="og:url" content={`${FRONT_URL}/jobs`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Вакансии | Крымский Привоз" />
        <meta
          name="twitter:description"
          content="Актуальные вакансии на рынке Крымский Привоз в Симферополе. Условия трудоустройства."
        />
        <meta
          name="twitter:image"
          content={`${FRONT_URL}/og-image.jpg`}
        />
        <link rel="canonical" href={`${FRONT_URL}/jobs`} />
      </Head>
      {banner?.data && <Article banner={banner?.data} jobs />}
    </PageStart>
  );
};
export default JobsPage;
