// pages/_app.tsx
import "../styles/style.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
// import {
//   PreloadProvider,
//   usePreload,
// } from "../components/preload/PreloadContext";
import GlobalLogo from "../components/preload/globalLogo";
import Layout from "../components/Header/header";
import Footer from "../components/Footer/footer";
import ScrollToTop from "../components/Common/scrollTop";
import StructuredData from "../components/SEO/StructuredData";
import Head from "next/head";

function RouteTransitionHandler({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout />
      <GlobalLogo />

      <main>
        <Component {...pageProps} />
        <Footer />
      </main>

      <ScrollToTop />
    </>
  );
}

function MyApp(props: AppProps) {
  return (
    // <PreloadProvider>
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content={
            "крымский привоз, симферополь, оптовый рынок, " +
            "рынок симферополь, цены на продукты, актуальные цены, " +
            "оптовые цены, фрукты оптом, овощи оптом, ягоды оптом, " +
            "доска объявлений, продавцам, покупателям, " +
            "контакты рынка, график работы, адрес рынка, " +
            "крым, продукты крыма, фермерские продукты, " +
            "сельхозпродукция, продовольственный рынок"
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Крымский Привоз" />
        <meta property="og:locale" content="ru_RU" />
        {/* <meta name="google-site-verification" content="ваш-google-код" /> */}
        {/* <meta name="yandex-verification" content="ваш-yandex-код" /> */}
      </Head>
      <RouteTransitionHandler {...props} />
      <StructuredData />
    </>
    // </PreloadProvider>
  );
}

export default MyApp;
