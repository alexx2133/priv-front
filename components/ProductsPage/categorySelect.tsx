import { useState, useRef, useEffect, useMemo } from "react";
import styles from "./styles/select.module.scss";
import { useParams, useSearchParams } from "next/navigation";

interface Category {
  id: number | null | string;
  name: string;
}

interface CategorySelectProps {
  options: Category[];
  placeholder?: string;
  onSelect?: (id: number | null | string) => void;
  width?: string;
}

const CategorySelect = ({
  options,
  placeholder = "Выберите...",
  onSelect,
  width,
}: CategorySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [querySelect, setQuerySelect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  useEffect(() => {
    if (categoryId && options?.length > 1 && !querySelect) {
      const cat = options.find(
        (category) => category.id === Number(categoryId)
      );
      setQuerySelect(true);
      if (onSelect && cat) {
        setSelectedCategory(cat);
        onSelect(Number(categoryId));
      }
    }
  }, [categoryId, options.length]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (category: Category) => {
    console.log(category);
    setSelectedCategory(category);
    setIsOpen(false);
    if (onSelect) onSelect(category.id);
  };

  const displayValue = selectedCategory ? selectedCategory.name : placeholder;
  // console.log(width)
  return (
    <div
      className={styles.select__wrapper}
      style={width ? { width: width } : {}}
      ref={containerRef}
    >
      <div
        className={`${styles.select__box} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        style={width ? { width: width } : {}}
      >
        <span>{displayValue}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.up : ""}`}>▼</span>
      </div>

      {isOpen && (
        <ul className={styles.select__dropdown}>
          {options.map((category) => (
            <li
              key={category.id || "all"}
              className={`${styles.select__option} ${
                selectedCategory?.id === category.id ? styles.selected : ""
              }`}
              onClick={() => handleSelect(category)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelect;
