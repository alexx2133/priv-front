import React from "react";
import style from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footer__text}>
        © Группа компаний "Крымский привоз" {new Date().getFullYear()}г.
      </div>
    </footer>
  );
};

export default Footer;
