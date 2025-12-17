"use client";
// import { INews } from "../../pages/news/news-archive";
import Title from "../Common/title";
import Banner from "../Common/banner";
import NewsRow from "./newsRow";
import style from "./styles/news.module.scss";
import { useAppStore } from "../../stores/app";
import { useState } from "react";
const NewsPage = ({ isArchive }: { isArchive: boolean }) => {
  const { settings } = useAppStore();
  return (
    <div className={style.news}>
      <Banner
        bg={settings.data?.headers_news?.data}
        notactive={isArchive ? 2 : 1}
        margin
        nav={[
          {
            text: "Архив новостей",
            path: "/news/news-archive",
            image: "../../contacts/icon-archive-news.png",
          },
          {
            text: "Последные новости",
            path: "/news",
            image: "../../contacts/icon-last-news.png",
          },
        ]}
      />
      <div className={style.news__info}>
        <Title image={"../../contacts/contacts.png"} title={"Новости"} />
        <NewsRow archive={isArchive} />
      </div>
    </div>
  );
};
export default NewsPage;
