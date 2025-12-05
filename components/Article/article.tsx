import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../stores/app";
import Banner from "../Common/banner";
import HtmlViewer from "../Common/htmlViewer";
import style from "./styles/article.module.scss";

const Article = ({ banner, jobs }: { banner: any; jobs?: boolean }) => {
  const { settings } = useAppStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current || !banner?.text) return;

    const updateHeight = () => {
      const height = contentRef.current?.scrollHeight || 0;
      console.log("Real content height:", height);
      setContentHeight(height);
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(contentRef.current);
    updateHeight();

    const intervalId = setInterval(updateHeight, 300);
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 1000); 

    return () => {
      resizeObserver.disconnect();
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [banner?.text]);
  return (
    <div className={style.article}>
      <Banner
        bg={settings.data?.headers_barticle?.data}
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
      <div className={`${style.article__wrapper} ${jobs ? style.jobs : ""}`}>
        <div
          className={style.article__html}
          ref={contentRef}
          style={{ paddingBottom: ((contentHeight * 1.52) / 100) * 25 }}
        >
          <HtmlViewer html={banner?.text} />
        </div>
      </div>
    </div>
  );
};

export default Article;
