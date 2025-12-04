import React, { useEffect, useState } from "react";
import style from "./header.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Banner from "../Common/banner";
import BannerMain from "../MainPage/bannerMain";
import { ManagedImg } from "../preload/managedImg";
import { useAppStore } from "../../stores/app";

const links = [
  {
    header: "Товары и цены",
    link: "/products",
  },
  {
    header: "Покупателям",
    link: "/customers",
  },
  {
    header: "Продавцам",
    link: "/sellers",
  },
  {
    header: "Галерея",
    link: "/gallery",
  },
  {
    header: "О рынке",
    link: "/about",
  },
  {
    header: "Новости",
    link: "/news",
  },
  {
    header: "Контакты",
    link: "/contacts",
  },
  {
    header: "Вакансии",
    link: "/jobs",
  },
];
const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { settings, loadSettings } = useAppStore();
  useEffect(() => {
    console.log("URL изменился:", pathname, searchParams.toString());
    const cur = links.find((l) => l.link === pathname);
    setCurrent(
      (pathname as string) !== "/" ? (cur?.header as string) : "Главная"
    );
  }, [pathname, searchParams]);
  useEffect(() => {
    loadSettings();
  }, []);
  return (
    <div>
      <header className={style.header}>
        <div className={style.header__info}>
          <div className={style.header__info__content}>
            <div className={style.header__info__block}>
              <img src="../../icons/clock.png" alt="clock" />
              Работаем круглосуточно
            </div>
            <div className={style.header__phones}>
              <div className={style.header__info__block}>
                <img src="../../icons/phone.png" alt="phone" />
                {settings?.data?.contacts_top_phone?.data}
              </div>
              <div className={style.header__info__block}>
                <img src="../../icons/phone-mobile.png" alt="phone-mobile" />
                {settings?.data?.contacts_top_mobile?.data}
              </div>
            </div>
          </div>
        </div>
        <div className={style.header__navbar}>
          <div className={style.header__navbar__content}>
            <Link href={"/"}>
              <img
                className={style.header__home}
                src={"../../icons/home.png"}
                alt="home"
              />
            </Link>

            {links.map((l, i) => {
              return (
                <Link href={l.link} key={i} className={style.header__el}>
                  |<div className={style.header__link}>{l.header}</div>
                </Link>
              );
            })}
          </div>
        </div>
        <div
          className={
            style.header__navbar__mobile +
            " " +
            (open ? style.header__navbar__mobile__open : "")
          }
        >
          <div
            className={style.header__navbar__top}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <div className={style.hamburger__button}>
              <div className={open ? style.hamburger__button__active : ""}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            {current}
          </div>
          <div className={style.header__navbar__mobile__content}>
            <Link
              href={"/"}
              onClick={() => {
                setOpen(!open);
              }}
            >
              <img
                className={style.header__mobile__home}
                src={"../../icons/home.png"}
                alt="home"
              />
            </Link>

            {links.map((l, i) => {
              return (
                <Link
                  onClick={() => {
                    setOpen(!open);
                  }}
                  href={l.link}
                  key={i}
                  className={style.header__mobile__el}
                >
                  <div className={style.header__mobile__link}>{l.header}</div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* {current == "Главная" ? <BannerMain /> : <Banner
          bg="../../background/gallery_video.jpg"
          nav={[
            {
              text: "Смотреть фото",
              path: "/gallery",
              image: "../../gallery/icon-photo-gray.png",
            },
            {
              text: "Смотреть видео",
              path: "/gallery/video",
              image: "../../gallery/icon-video.png",
            },
          ]}
        />} */}
      </header>
    </div>
  );
};

export default Layout;
