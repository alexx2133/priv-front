import Head from "next/head";
import PageStart from "../components/Common/pageStart";
import MainPage from "../components/MainPage/mainPage";
import { BACKEND_URL, FRONT_URL } from "../utils/api/config";

const Main = () => {
  console.log(BACKEND_URL)
  return (
    <PageStart>
      <Head>
        <title>
          Официальный сайт оптового рынка "Крымский Привоз" - г. Симферополь
        </title>
        <meta
          name="description"
          content="Официальный сайт рынка 'Крымский Привоз' (г. Симферополь). Актуальные цены на рынке. Информация об услугах и работе рынка."
        />

        {/* OG теги */}
        <meta
          property="og:title"
          content="Официальный сайт оптового рынка 'Крымский Привоз' - г. Симферополь"
        />
        <meta
          property="og:description"
          content="Официальный сайт рынка 'Крымский Привоз' (г. Симферополь). Актуальные цены на рынке. Информация об услугах и работе рынка."
        />
        <meta
          property="og:image"
          content={`${FRONT_URL}/og-image.png`}
        />
        <meta property="og:url" content={FRONT_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Крымский Привоз" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Крымский Привоз - оптовый рынок в Симферополе"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Официальный сайт оптового рынка 'Крымский Привоз' - г. Симферополь"
        />
        <meta
          name="twitter:description"
          content="Официальный сайт рынка 'Крымский Привоз' (г. Симферополь). Актуальные цены на рынке. Информация об услугах и работе рынка."
        />
        <meta
          name="twitter:image"
          content={`${FRONT_URL}/og-image.png`}
        />
        <link rel="canonical" href={FRONT_URL}/>
      </Head>
      <MainPage />
    </PageStart>
  );
};
export default Main;
