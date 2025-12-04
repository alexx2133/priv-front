import { ManagedImg } from "../preload/managedImg";
import style from "./styles/greenImage.module.scss";
const GreenImage = ({ image }: { image: string }) => {
  return (
    <div className={style.green_image}>
      <img src={image} alt={image} />
    </div>
  );
};
export default GreenImage;
