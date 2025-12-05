import { useState, useRef, useCallback } from "react";
import styles from "./styles/map.module.scss";
import { useAppStore } from "../../stores/app";
import { getSettingsUrl } from "../../utils/api/config";

interface TouchPoint {
  x: number;
  y: number;
}

export default function InteractiveMap() {
  const { settings } = useAppStore();
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasBeenDraggedRef = useRef(false);

  const touchStartRef = useRef<TouchPoint[]>([]);
  const isPinchingRef = useRef(false);

  const minScale = 1;
  const maxScale = 3;
  const zoom = useCallback(
    (direction: "in" | "out") => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const newScale =
        direction === "in"
          ? Math.min(scale + 0.2, maxScale)
          : Math.max(scale - 0.2, minScale);

      if (newScale === scale) return;
      if (newScale <= 1) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        hasBeenDraggedRef.current = false;
        return;
      }

      let zoomCenterX, zoomCenterY;

      if (hasBeenDraggedRef.current) {
        zoomCenterX = rect.width / 2;
        zoomCenterY = rect.height / 2;
      } else {
        zoomCenterX = rect.width / 2;
        zoomCenterY = rect.height / 2;
      }

      const relativeX = (zoomCenterX - position.x) / scale;
      const relativeY = (zoomCenterY - position.y) / scale;
      const newX = zoomCenterX - relativeX * newScale;
      const newY = zoomCenterY - relativeY * newScale;

      setScale(newScale);
      setPosition({ x: newX, y: newY });
    },
    [scale, minScale, maxScale, position]
  );

  const zoomIn = useCallback(() => zoom("in"), [zoom]);
  const zoomOut = useCallback(() => zoom("out"), [zoom]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);

      dragStartRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;

      updatePosition(newX, newY);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();

      const touches = Array.from(e.touches);
      touchStartRef.current = touches.map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      }));

      if (touches.length === 1) {
        setIsDragging(true);
        const touch = touches[0];
        dragStartRef.current = {
          x: touch.clientX - position.x,
          y: touch.clientY - position.y,
        };
        isPinchingRef.current = false;
      } else if (touches.length === 2) {
        isPinchingRef.current = true;
        setIsDragging(false);
      }
    },
    [position]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();

      const touches = Array.from(e.touches);
      const currentTouches = touches.map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      }));

      if (touches.length === 1 && isDragging && !isPinchingRef.current) {
        const touch = touches[0];
        const newX = touch.clientX - dragStartRef.current.x;
        const newY = touch.clientY - dragStartRef.current.y;

        updatePosition(newX, newY);
      } else if (touches.length === 2 && isPinchingRef.current) {
        const startTouches = touchStartRef.current;
        if (startTouches.length === 2) {
          const startDistance = Math.sqrt(
            Math.pow(startTouches[1].x - startTouches[0].x, 2) +
              Math.pow(startTouches[1].y - startTouches[0].y, 2)
          );

          const currentDistance = Math.sqrt(
            Math.pow(currentTouches[1].x - currentTouches[0].x, 2) +
              Math.pow(currentTouches[1].y - currentTouches[0].y, 2)
          );

          if (Math.abs(currentDistance - startDistance) > 5) {
            const scaleChange = currentDistance / startDistance;
            const newScale = Math.max(
              minScale,
              Math.min(scale * scaleChange, maxScale)
            );

            if (newScale !== scale) {
              const centerX = (currentTouches[0].x + currentTouches[1].x) / 2;
              const centerY = (currentTouches[0].y + currentTouches[1].y) / 2;
              const relativeX = (centerX - position.x) / scale;
              const relativeY = (centerY - position.y) / scale;
              const newX = centerX - relativeX * newScale;
              const newY = centerY - relativeY * newScale;

              setScale(newScale);
              setPosition({ x: newX, y: newY });
              hasBeenDraggedRef.current = true;
            }
          }
          touchStartRef.current = currentTouches;
        }
      }
    },
    [isDragging, scale, minScale, maxScale, position]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touches = Array.from(e.touches);

      if (touches.length === 0) {
        setIsDragging(false);
        isPinchingRef.current = false;
      } else if (touches.length === 1) {
        isPinchingRef.current = false;
        setIsDragging(true);
        const touch = touches[0];
        dragStartRef.current = {
          x: touch.clientX - position.x,
          y: touch.clientY - position.y,
        };
      }

      touchStartRef.current = touches.map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
      }));
    },
    [position]
  );
  const updatePosition = useCallback(
    (newX: number, newY: number) => {
      if (scale > 1) {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const maxMoveX = rect.width * (scale - 1);
        const maxMoveY = rect.height * (scale - 1);

        const constrainedX = Math.max(-maxMoveX, Math.min(newX, 0));
        const constrainedY = Math.max(-maxMoveY, Math.min(newY, 0));

        setPosition({ x: constrainedX, y: constrainedY });
        if (constrainedX !== 0 || constrainedY !== 0) {
          hasBeenDraggedRef.current = true;
        }
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [scale]
  );

  const handleDoubleClick = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    hasBeenDraggedRef.current = false;
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${getSettingsUrl(
      settings?.data?.schema_image?.data
    )})`,
    backgroundSize: `${scale * 100}%`,
    backgroundPosition: `${position.x}px ${position.y}px`,
    backgroundRepeat: "no-repeat",
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none", 
  };

  return (
    <div className={styles.about__mapWrapper}>
      <div className={styles.about__mapControls}>
        <button onClick={zoomIn}>+</button>
        <button onClick={zoomOut}>–</button>
      </div>

      <div
        ref={containerRef}
        className={styles.about__mapContainer}
        style={backgroundStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />
    </div>
  );
}
