import { useEffect, useState } from "react";
import { useAppStore } from "../../stores/app";
import NewsBlock from "./newsBlock";
import style from "./styles/news.module.scss";

const NewsRow = ({ archive }: { archive: boolean }) => {
  const { news, loadNews } = useAppStore();
  const [visibleNews, setVisibleNews] = useState<any[]>([]);
  useEffect(() => {
    loadNews();
  }, []);
  useEffect(() => {
    if (archive && news?.data && news.data.length > 0) {
      setVisibleNews(news.data);
    } else {
      setVisibleNews(news.data.slice(0, 4));
    }
  }, [news]);
  return (
    <div className={style.news__row}>
      {visibleNews.map((el, i) => {
        return (
          <NewsBlock
            image={el.image}
            date={el.date}
            title={el.title}
            text={el.text}
            id={el.id}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default NewsRow;
