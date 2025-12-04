import { Photo } from "../../stores/galleryStore";
import { getPhotoUrl } from "../../utils/api/config";
import { ManagedImg } from "../preload/managedImg";
import gallery from "./styles/gallery.module.scss";

const GalleryBlock = ({ photo }: { photo: Photo }) => {
  return (
    <a
      data-fancybox="gallery"
      href={getPhotoUrl(photo.image)}
      className={gallery.gallery__block}
    >
      <img
        className={gallery.gallery__img}
        src={getPhotoUrl(photo.image)}
        alt={"photo" + photo.image}
      />
      <div className={gallery.gallery__date}>
        <p>{photo.date.slice(0, 10)}</p>
      </div>
    </a>
  );
};
export default GalleryBlock;
