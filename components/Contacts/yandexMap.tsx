import { useState, useRef, useEffect } from "react";

const YandexMap = () => {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsActive(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    console.log("click");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsActive(false);
  };

  const handleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsActive(true);
  };

  return (
    <div
      style={{ position: "relative", marginTop: "60px", width: "100%" }}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <iframe
        src="https://yandex.com/map-widget/v1/?um=constructor%3A5fa980917fcfa969f0be0129bd7fd9a57fa31cc1adf1f0429c9ef7ba8a8295a7&amp;source=constructor"
        width="100%"
        height="500"
        style={{
          pointerEvents: isActive ? "auto" : "none",
        }}
        title="Яндекс Карта"
      />
    </div>
  );
};
export default YandexMap;
