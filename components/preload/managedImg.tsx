// components/Image/ManagedImg.tsx
import React, { useState, useRef, useEffect } from "react";

interface ManagedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  priority?: boolean;
}

export const ManagedImg: React.FC<ManagedImageProps> = ({
  src,
  priority = false,
  onLoad,
  onError,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    onError?.(e);
  };

  // Preload для приоритетных изображений (простая версия)
  useEffect(() => {
    if (priority && src && typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);

      setTimeout(() => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      }, 3000);
    }
  }, [src, priority]);

  const imageStyle: React.CSSProperties = {
    opacity: isLoaded ? 1 : 0,
    transition: "opacity 0.3s ease-in-out",
    ...style,
  };

  return (
    <img
      ref={imgRef}
      src={src}
      style={imageStyle}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
      {...rest}
    />
  );
};
