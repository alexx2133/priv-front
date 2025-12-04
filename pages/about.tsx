import Head from "next/head";
import AboutPage from "../components/AboutPage/aboutPage";
import PageStart from "../components/Common/pageStart";
import { FRONT_URL } from "../utils/api/config";

const About = () => {
  return (
    <PageStart>
      <Head>
        <title>
          История симферопольского рынка "Крымский Привоз" | Официальный сайт
          оптового рынка "Крымский Привоз" - г. Симферополь
        </title>
        <meta
          name="description"
          content="История создания и развития рынка Крымский Привоз в Симферополе. Схема и панрама рынка."
        />

        {/* OG теги */}
        <meta
          property="og:title"
          content="История рынка Крымский Привоз | О рынке"
        />
        <meta
          property="og:description"
          content="История создания и развития рынка Крымский Привоз в Симферополе. Схема и панрама рынка."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.jpg`} />
        <meta property="og:url" content={FRONT_URL} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="История рынка Крымский Привоз | О рынке"
        />
        <meta
          name="twitter:description"
          content="История создания и развития рынка Крымский Привоз в Симферополе. Схема и панрама рынка."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.jpg`} />
        <link rel="canonical" href={`${FRONT_URL}/about`} />
      </Head>

      <AboutPage />
    </PageStart>
  );
};
export default About;
