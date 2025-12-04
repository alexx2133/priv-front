"use client";
import style from "./styles/categories.module.scss";
import { ManagedImg } from "../preload/managedImg";
import { useAppStore } from "../../stores/app";
import { getCategoriesUrl } from "../../utils/api/config";
import Link from "next/link";
interface cat {
  image: string;
  name: string;
  id: number;
}
const Categories = () => {
  const { categories } = useAppStore();

  // const categories: cat[] = [
  //   {
  //     image: "main_page/categories/vege.png",
  //     title: "Овощи",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/fruits.png",
  //     title: "Фрукты",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/green.png",
  //     title: "Зелень",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/berries.png",
  //     title: "Ягоды",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/melons.png",
  //     title: "Бахча",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/meat.png",
  //     title: "Мясо",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/fish.png",
  //     title: "Рыба",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/grocery.png",
  //     title: "Бакалея",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/dried.png",
  //     title: "Сухофрукты, орехи",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/seeds.png",
  //     title: "Семена, посадочный материал",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/fertilizer.png",
  //     title: "Средства защиты растений, удобрения",
  //     link: "/",
  //     active: true,
  //   },
  //   {
  //     image: "main_page/categories/technics.png",
  //     title: "Средства механизации и мелиоризации",
  //     link: "/",
  //     active: true,
  //   },
  // ];
  return (
    <section className={style.categories}>
      <h1 className={style.categories__title}>Ассортимент товаров на рынке</h1>
      <div className={style.categories__content}>
        {categories.data?.map((el: cat, i: number) => (
          <Link
            href={`/products?category=${el.id}`}
            className={style.categories__block}
            style={{
              pointerEvents: i > 8 || i == 5 || i == 6 ? "none" : "auto",
            }}
            key={i}
          >
            <img
              className={style.categories__image}
              src={getCategoriesUrl(el.image)}
              alt={el.name}
            />
            <div className={style.categories__text}>{el.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Categories;
