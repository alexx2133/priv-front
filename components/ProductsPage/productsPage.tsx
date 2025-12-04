// components/PricesPage/PricesPage.tsx
import Banner from "../Common/banner";
import style from "./styles/prices.module.scss";
import PricesDate from "./pricesDate";
import PricesFilter from "./pricesFilter";
import PricesBlock from "./pricesBlock";
import TableRows from "./tableRows";
import { useState, useEffect, useCallback, useRef } from "react";
import { useAppStore } from "../../stores/app";
import { useProductsStore } from "../../stores/productsStore";

const ProductsPage = () => {
  const [format, setFormat] = useState("grid");
  const { settings, categories, loadCategories } = useAppStore();
  const {
    loaded: productsLoaded,
    loadProducts,
    loadMore,
    hasMore,
    setCategory,
    setSearchQuery,
    getVisibleProducts,
    downloadPriceList,
    updateTime,
    date,
  } = useProductsStore();

  const visibleProducts = getVisibleProducts();
  const loadingRef = useRef(false);

  useEffect(() => {
    loadProducts();
    updateTime();

    if (!categories.loaded) {
      loadCategories();
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (loadingRef.current || !hasMore()) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 200) {
      loadingRef.current = true;
      loadMore();
      setTimeout(() => {
        loadingRef.current = false;
      }, 100);
    }
  }, [hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!hasMore()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore() && !loadingRef.current) {
          loadingRef.current = true;
          loadMore();

          setTimeout(() => {
            loadingRef.current = false;
          }, 100);
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById("products-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [hasMore, loadMore]);

  return (
    <div className={style.prices}>
      <Banner
        bg={settings.data?.headers_products?.data}
        nav={[
          {
            text: "Скачать",
            path: "#",
            image: "prices/icon-pdf.png",
            func: downloadPriceList,
          },
          {
            text: "Смотреть аналитику",
            path: "/analytics",
            image: "prices/icon-statistics.png",
          },
        ]}
      />
      <div className={style.prices__info}>
        <PricesDate date={date.date} time={date.time} />
        <PricesFilter
          format={format}
          setFormat={setFormat}
          setSelected={setCategory}
          setSearch={setSearchQuery}
        />
        {format == "rows" && (
          <div className={style.prices__rows}>
            <TableRows products={visibleProducts} />
          </div>
        )}
      </div>
      {format == "grid" && (
        <div className={style.prices__list}>
          {visibleProducts.map((product) => (
            <PricesBlock product={product} key={product.id} />
          ))}
        </div>
      )}

      {hasMore() && (
        <div
          id="products-sentinel"
          style={{
            height: "1px",
            marginTop: "20px",
            background: "transparent",
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;
