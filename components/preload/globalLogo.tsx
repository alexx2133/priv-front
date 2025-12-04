// components/GlobalLogo/GlobalLogo.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import style from "./styles/globalLogo.module.scss";
import Link from "next/link";
import ProgressiveImage from "../img/progressiveImage";
import { FRONT_URL } from "../../utils/api/config";

export default function GlobalLogo() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <div />;

  return (
    <div className={style.banner__logo}>
      <Link href={"/"}>
        {/* <img src={"../logo.png"} /> */}

        <ProgressiveImage
          width={500}
          objectFit="contain"
          height={250}
          className={style.logo}
          src={FRONT_URL + "/logo__full.png"}
          alt="logo"
        />
      </Link>
    </div>
  );
}
