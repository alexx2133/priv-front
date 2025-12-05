import useFancybox from "../../hooks/useFancybox";
import Title from "../Common/title";
import Banner from "../Common/banner";
import style from "../NewsPage/styles/news.module.scss";
import GalleryBlock from "./galleryBlock";
import gallery from "./styles/gallery.module.scss";
import { useAppStore } from "../../stores/app";
import { useCallback, useEffect } from "react";
import { useGallery } from "../../hooks/useGallery";

const GalleryPage = () => {
  const [fancyboxRef] = useFancybox();
  const { settings } = useAppStore();
  const { visibleAlbums, hasMoreAlbums, loadMore } = useGallery();
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasMoreAlbums
    ) {
      return;
    }
    loadMore();
  }, [hasMoreAlbums, loadMore]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreAlbums) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.getElementById("albums-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [hasMoreAlbums, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  return (
    <div className={style.news}>
      <Banner
        bg={settings.data.headers_gallery_photo?.data}
        nav={[
          {
            text: "Смотреть фото",
            path: "/gallery",
            image: "gallery/icon-photo.png",
          },
          {
            text: "Смотреть видео",
            path: "/gallery/video",
            image: "gallery/icon-video-gray.png",
          },
        ]}
      />
      <div className={style.news__info} ref={fancyboxRef}>
        {visibleAlbums
          .sort((a, b) => a.sort - b.sort)
          .map((album) => (
            <div key={album.id} className="album-section">
              <Title image={"gallery/calendar.png"} title={album.name} />
              <div className={gallery.gallery}>
                {album.photos.map((photo, i) => (
                  <GalleryBlock photo={photo} key={i} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default GalleryPage;
