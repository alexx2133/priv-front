import { useState } from "react";
import Image from "next/image";

interface ProgressiveImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  absolute?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = true,
  fill = false,
  absolute = false,
  objectFit = "cover",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Если нет src - не рендерим ничего
  if (!src) return null;

  return (
    <div
      className={`${className}`}
      style={{
        position: absolute ? "absolute" : "relative",
        width: "100%",
        height: absolute ? height + "px" : "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {!src.includes("undefined") && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          unoptimized={true}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          className="image-content"
          style={{
            opacity: isLoaded ? 1 : 0,
            width: width,
            height: height,
            transition: "opacity 0.1s ease-in-out",
            objectFit: objectFit,
          }}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
