import { ManagedImg } from "../preload/managedImg";
import style from "./styles/common.module.scss";
const Title = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className={style.about__title}>
      <img src={image} alt={title} />
      {title}
    </div>
  );
};
export default Title;
