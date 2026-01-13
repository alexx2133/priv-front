import Head from "next/head";
import PageStart from "../../components/Common/pageStart";
import GalleryPage from "../../components/GalleryPage/galleryPage";
import { FRONT_URL } from "../../utils/api/config";

const Gallery = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Фото | Официальный сайт оптового рынка "Крымский Привоз" - г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Фотогалерея рынка Крымский Привоз: павильоны, торговые ряды, инфраструктура. Увидите как выглядит наш рынок, территории и условия для покупателей и продавцов."
        />

        {/* OG теги */}
        <meta property="og:title" content="Фотогалерея рынка Крымский Привоз" />
        <meta
          property="og:description"
          content="Фотогалерея рынка Крымский Привоз: павильоны, торговые ряды, инфраструктура. Увидите как выглядит наш рынок."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.png`} />
        <meta property="og:url" content={`${FRONT_URL}/gallery`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Фотогалерея рынка Крымский Привоз"
        />
        <meta
          name="twitter:description"
          content="Фотогалерея рынка Крымский Привоз: павильоны, торговые ряды, инфраструктура. Увидите как выглядит наш рынок."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.png`} />
        <link rel="canonical" href={`${FRONT_URL}/gallery`} />
      </Head>
      <GalleryPage />
    </PageStart>
  );
};
export default Gallery;
