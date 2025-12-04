import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/scrollTop.module.scss";

type Props = {
  threshold?: number; 
  right?: number; 
  bottom?: number; 
  size?: number; 
  className?: string;
};

export default function ScrollToTop({
  threshold = 300,
  right = 44,
  bottom = 44,
  size = 86,
  className,
}: Props) {
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        if (!mounted.current) return;
        setVisible(window.scrollY > threshold);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    setVisible(
      typeof window !== "undefined" ? window.scrollY > threshold : false
    );

    return () => {
      mounted.current = false;
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  const handleClick = () => {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const rootStyle: React.CSSProperties = {
    right: `${right}px`,
    bottom: `${bottom}px`,
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Вверх"
      onClick={handleClick}
      className={`${styles.scrollToTop} ${visible ? styles.visible : ""}`}
      style={rootStyle}
    >
      <svg
        viewBox="0 0 24 24"
        width="60%"
        height="60%"
        aria-hidden
        focusable="false"
      >
        <path
          d="M12 19V6"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 12.5L12 6l6.5 6.5"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
