import Head from "next/head";
import PageStart from "../../components/Common/pageStart";
import GalleryVideoPage from "../../components/GalleryPage/galleryVideoPage";
import { FRONT_URL } from "../../utils/api/config";

const GalleryVideo = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Видео | Официальный сайт оптового рынка "Крымский Привоз" - г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Видеогалерея рынка Крымский Привоз: Узнайте больше о нашем рынке в видеоформате."
        />

        {/* OG теги */}
        <meta
          property="og:title"
          content="Видеогалерея рынка Крымский Привоз"
        />
        <meta
          property="og:description"
          content="Видеогалерея рынка Крымский Привоз: обзоры территории, интервью с продавцами, репортажи с мероприятий."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.png`} />
        <meta property="og:url" content={`${FRONT_URL}/gallery/video`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Видеогалерея рынка Крымский Привоз"
        />
        <meta
          name="twitter:description"
          content="Видеогалерея рынка Крымский Привоз: обзоры территории, интервью с продавцами, репортажи с мероприятий."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.png`} />
        <link rel="canonical" href={`${FRONT_URL}/gallery/video`} />
      </Head>
      <GalleryVideoPage />
    </PageStart>
  );
};
export default GalleryVideo;
