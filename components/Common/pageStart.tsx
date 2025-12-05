import { useEffect, useState } from "react";

const PageStart = ({ children }: any) => {
  const [opacity, setOpacity] = useState(false);
  useEffect(() => {
    let tt = setTimeout(() => setOpacity(true), 100);
    return () => {
      clearTimeout(tt);
      setOpacity(false);
    };
  }, []);
  return (
    <div
      style={{ opacity: opacity ? 1 : 0, transition: "opacity 100ms ease-in-out" }}
    >
      {children}
    </div>
  );
};
export default PageStart;
