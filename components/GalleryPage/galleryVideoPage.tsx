import useFancybox from "../../hooks/useFancybox";
import Title from "../Common/title";
import Banner from "../Common/banner";
import style from "../NewsPage/styles/news.module.scss";
import GalleryBlock from "./galleryBlock";
import GalleryBlockVideo from "./galleryBlockVideo";
import gallery from "./styles/gallery.module.scss";
import { useAppStore } from "../../stores/app";

import { useGalleryStore } from "../../stores/galleryStore";
import { useEffect } from "react";
const GalleryVideoPage = () => {
  const [fancyboxRef] = useFancybox();
  const { settings } = useAppStore();
  const { loadAllVideoAlbums, allVideoAlbums } = useGalleryStore();
  console.log(allVideoAlbums);
  useEffect(() => {
    loadAllVideoAlbums();
  }, []);
  return (
    <div className={style.news}>
      <Banner
        bg={settings.data?.headers_gallery_video?.data}
        notactive={1}
        nav={[
          {
            text: "Смотреть фото",
            path: "/gallery",
            image: "../../gallery/icon-photo.png",
          },
          {
            text: "Смотреть видео",
            path: "/gallery/video",
            image: "../../gallery/icon-video.png",
          },
        ]}
      />
      <div className={style.news__info} ref={fancyboxRef}>
        {allVideoAlbums.map((album) => (
          <div key={album.id} className="album-section">
            <Title image={"../../gallery/calendar.png"} title={album.name} />

            <div className={gallery.gallery}>
              {album.videos.map((video, i) => (
                <GalleryBlockVideo video={video} key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GalleryVideoPage;
