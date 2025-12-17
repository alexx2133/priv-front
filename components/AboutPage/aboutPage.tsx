"use client";
import Banner from "../Common/banner";
import History from "./history";
import InteractiveMap from "./interactiveMap";
import Pano from "./pano";
import style from "./styles/about.module.scss";
import Title from "../Common/title";
import { useAppStore } from "../../stores/app";

const AboutPage = () => {
  const { settings } = useAppStore();
  return (
    <div className={style.about}>
      <Banner
        bg={settings.data?.headers_about?.data}
        margin
        nav={[
          {
            text: "История рынка",
            path: "#history",
            image: "navigation/icon-history.png",
          },
          {
            text: "Схема рынка",
            path: "#schema",
            image: "navigation/icon-schema.png",
          },
        ]}
      />
      <div id="history" />
      <Title image={"about/history.png"} title={"История рынка"} />
      <History />
      <div id="schema" />
      <Title image={"about/schema.png"} title={"Cхема рынка"} />
      <InteractiveMap />
      <Pano />
    </div>
  );
};
export default AboutPage;
