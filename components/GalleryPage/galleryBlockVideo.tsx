import { useEffect, useState } from "react";
import { Video } from "../../stores/galleryStore";
import gallery from "./styles/gallery.module.scss";
import DOMPurify from "dompurify";
import {getVideoUrl } from "../../utils/api/config";
const GalleryBlockVideo = ({ video }: { video: Video }) => {
  const [link, setLink] = useState("");
  function extractSrcFromIframe(iframeString: string) {
    const match = iframeString.match(/src="([^"]*)"/);
    return match ? match[1] : null;
  }

  useEffect(() => {
    if (typeof window !== "undefined" && video && video.type == "youtube") {
      const src = extractSrcFromIframe(video.iframe);
      setLink(src as string);
    }
  }, [video]);

  return (
    <div className={gallery.gallery__block}>
      {video.type === "youtube" && video.iframe && (
        <a
          href={link}
          data-fancybox="gallery"
          data-fancybox-type="iframe"
          className={gallery.gallery__block}
        >
          <iframe
            src={link}
            className={gallery.gallery__video}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <div className={gallery.gallery__date}>
            <p>{video?.date.slice(0, 10)}</p>
          </div>
        </a>
      )}
      {video.type === "download" && (
        <video
          controls
          className={gallery.video__preview}
          src={getVideoUrl(`/gallery/` + video.filename)}
        >
          Ваш браузер не поддерживает видео.
        </video>
      )}
      <div className={gallery.gallery__title}>{video?.name}</div>
    </div>
  );
};
export default GalleryBlockVideo;
