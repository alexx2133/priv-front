"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/slider.module.scss";
import { ManagedImg } from "../preload/managedImg";
import { getBannerUrl } from "../../utils/api/config";
import Link from "next/link";
import SliderItem from "./sliderItem";

interface InfiniteSliderProps {
  slides: { url: string; id: string; sort: number }[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export const Slider: React.FC<InfiniteSliderProps> = ({
  slides,
  autoplay = true,
  autoplayDelay = 6000,
}) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  console.log(index);
  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = window.setInterval(() => {
      if (!isTransitioning) nextSlide();
    }, autoplayDelay);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!autoplay) return;
    if (slides.length) {
      startAutoplay();
      return stopAutoplay;
    }
  }, [autoplay, autoplayDelay, slides.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => (prev + 1) % slides.length);
    resetAutoplay();
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    resetAutoplay();
  };

  const goToSlide = (i: number) => {
    if (isTransitioning || i === index) return;
    setIsTransitioning(true);
    setIndex(i);
    resetAutoplay();
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsTransitioning(false), 400);
    return () => clearTimeout(timeout);
  }, [index]);

  const resetAutoplay = () => {
    if (!autoplay) return;
    stopAutoplay();
    startAutoplay();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles.slider__container}
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: isTransitioning ? "transform 0.4s ease" : "none",
        }}
      >
        {slides
          .sort((a, b) => a.sort - b.sort)
          .map((src, i) => (
            <SliderItem src={src} i={i} key={i} />
          ))}
      </div>
      <div style={{ display: slides.length == 1 ? "none" : "block" }}>
        <div className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}>
          <div>‹</div>
        </div>
        <div className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}>
          <div>›</div>
        </div>
      </div>
      <div
        className={styles.slider__dots}
        style={{ display: slides.length == 1 ? "none" : "flex" }}
      >
        {slides.map((_, i) => (
          <div
            key={i}
            className={`${styles.slider__dot} ${
              i === index ? styles.active : ""
            }`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};
