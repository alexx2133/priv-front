import Link from "next/link";
import styles from "./styles/slider.module.scss";
import { getBannerUrl } from "../../utils/api/config";
import { useState } from "react";

const SliderItem = ({ src, i }: { src: any; i: number }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Link href={"/article/" + src.id} className={styles.slider__slide}>
      <img
        src={getBannerUrl(src.url)}
        alt={`Slide ${i}`}
        className={styles.slider__images}
        loading="lazy"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
        onLoad={() => setIsLoaded(true)}
        draggable={false}
        // priority={i == 0 ? true : false}
      />
    </Link>
  );
};
export default SliderItem;
