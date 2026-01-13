import { usePathname } from "next/navigation";
import Article from "../../components/Article/article";
import { useEffect } from "react";
import { useAppStore } from "../../stores/app";
import PageStart from "../../components/Common/pageStart";
import Head from "next/head";

const ArticlePage = () => {
  const { loadBanner, banner } = useAppStore();
  console.log(banner);
  const path = usePathname();
  useEffect(() => {
    if (path) {
      loadBanner(parseInt(path.split("/").pop() as string));
    }
  }, [path]);
  if (!banner?.data) return <div />;
  return (
    <PageStart>
      <Header banner={banner?.data} />
      {banner?.data && (
        <Article
          banner={banner?.data}
          jobs={path == "/article/25" ? true : false}
        />
      )}
    </PageStart>
  );
};
export default ArticlePage;
const Header = ({ banner }: { banner: any }) => {
  return (
    <Head>
      <title>Статьи | Крымский Привоз</title>
      <meta name="description" content={banner?.data?.text} />

      {/* OG теги */}
      <meta property="og:title" content="Статьи | Крымский Привоз" />
      <meta property="og:description" content={banner?.data?.text} />
      <meta
        property="og:image"
        content={`https://privoz-crimea.ru/og-image.png`}
      />
      <meta
        property="og:url"
        content={`https://privoz-crimea.ru/article/${banner?.data?.id}`}
      />
      <meta property="og:type" content="article" />

      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  );
};
