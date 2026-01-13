import Head from "next/head";
import PageStart from "../components/Common/pageStart";
import ProductsPage from "../components/ProductsPage/productsPage";
import { FRONT_URL } from "../utils/api/config";

const Products = () => {
  return (
    <PageStart>
      <Head>
        <title>
          Товары и цены | Официальный сайт оптового рынка "Крымский Привоз" - г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Актуальные цены на рынке Крымский Привоз. Обновления каждый день."
        />

        <meta property="og:title" content="Товары и цены | Крымский Привоз" />
        <meta
          property="og:description"
          content="Актуальные цены на рынке Крымский Привоз. Обновления каждый день."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.png`} />
        <meta property="og:url" content={`${FRONT_URL}/products`} />
        <meta property="og:type" content="website" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Товары и цены | Крымский Привоз" />
        <meta
          name="twitter:description"
          content="Цены на рынке Крымский Привоз в Симферополе."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.png`} />
        <link rel="canonical" href={`${FRONT_URL}/products`} />
      </Head>
      <ProductsPage />
    </PageStart>
  );
};

export default Products;
