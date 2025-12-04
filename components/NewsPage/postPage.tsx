import Title from "../Common/title";
import Banner from "../Common/banner";
import NewsRow from "./newsRow";
import PostInfo from "./postInfo";
import style from "./styles/news.module.scss";
import { useAppStore } from "../../stores/app";
import { getSettingsUrl } from "../../utils/api/config";
import Link from "next/link";
const PostPage = () => {
  const { settings } = useAppStore();
  return (
    <div className={style.news}>
      <Banner
        bg={settings.data?.headers_news_item?.data}
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
        <PostInfo />
      </div>{" "}
      <div className={style.post__back}>
        <Link href="/news">
          <button className="orange_button">ВЕРНУТЬСЯ К НОВОСТЯМ</button>
        </Link>
      </div>
    </div>
  );
};
export default PostPage;
