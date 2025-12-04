import Link from "next/link";
import { getNewsUrl } from "../../utils/api/config";
import HtmlViewer from "../Common/htmlViewer";
import { ManagedImg } from "../preload/managedImg";
import style from "./styles/news.module.scss";
const NewsBlock = ({
  image,
  date,
  title,
  text,
  id,
}: {
  image: string;
  date: string;
  title: string;
  text: string;
  id: number;
}) => {
  return (
    <Link href={`/news/${id}`}>
      <div className={style.news__block}>
        <img src={getNewsUrl(image)} alt={title} />
        <div className={style.news__block__date}>{date.slice(0, 10)}</div>
        <div className={style.news__block__title}>
          {title.slice(0, 60)}
          {title.length > 60 && "..."}
        </div>
        <div className={style.news__block__text}>
          {text
            .slice(0, 100)
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&laquo;/g, "")
            .replace(/&raquo;/g, "")
            .replace(/&hellip;/g, "")
            .replace(/&mdash;/g, "")
            .replace(/&ndash;/g, "")}
          {text.length > 100 && "..."}
        </div>
      </div>
    </Link>
  );
};
export default NewsBlock;
