"use client";

import { useRouter } from "next/router";
import ContactsPage from "../components/Contacts/contactsPage";
import { useEffect } from "react";
import PageStart from "../components/Common/pageStart";
import Head from "next/head";
import { FRONT_URL } from "../utils/api/config";

const Contacts = () => {
  // const router = useRouter();
  // const { pathname, query, asPath } = router;

  // useEffect(() => {
  //   console.log("СРАБОТАЛО - URL:", pathname, query, asPath);
  // }, [pathname, query, asPath]);
  return (
    <PageStart>
      <Head>
        <title>
          Контакты | Официальный сайт оптового рынка "Крымский Привоз" г.
          Симферополь
        </title>
        <meta
          name="description"
          content="Контактная информация рынка Крымский Привоз в Симферополе. Адрес, телефоны, график работы. Схема проезда и форма обратной связи."
        />

        {/* OG теги */}
        <meta property="og:title" content="Контакты | Крымский Привоз" />
        <meta
          property="og:description"
          content="Контактная информация рынка Крымский Привоз в Симферополе. Адрес, телефоны, график работы. Схема проезда и форма обратной связи."
        />
        <meta property="og:image" content={`${FRONT_URL}/og-image.jpg`} />
        <meta property="og:url" content={`${FRONT_URL}/contacts`} />
        <meta property="og:type" content="website" />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Контакты | Крымский Привоз" />
        <meta
          name="twitter:description"
          content="Контактная информация рынка Крымский Привоз в Симферополе. Адрес, телефоны, график работы. Схема проезда и форма обратной связи."
        />
        <meta name="twitter:image" content={`${FRONT_URL}/og-image.jpg`} />
        <link rel="canonical" href={`${FRONT_URL}/contacts`} />
      </Head>
      <ContactsPage />
    </PageStart>
  );
};
export default Contacts;
