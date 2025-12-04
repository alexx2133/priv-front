// components/PricesPage/Search.tsx
import { useState, useEffect, useRef } from "react";
import styles from "./styles/search.module.scss";

interface SearchSelectProps {
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const Search = ({
  options,
  placeholder = "Поиск...",
  onSelect,
}: SearchSelectProps) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFiltered([]);
    } else {
      const filteredOptions = options.filter((opt) =>
        opt.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(filteredOptions.slice(0, 5));
    }
  }, [query, options]);

  const handleSelect = (value: string) => {
    setQuery(value);
    setOpen(false);
    if (onSelect) onSelect(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSelect) {
        onSelect(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSelect]);

  return (
    <div className={styles.select__wrapper} ref={containerRef}>
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        className={styles.select__input}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {open && filtered.length > 0 && (
        <ul className={styles.select__dropdown}>
          {filtered.map((opt) => (
            <li
              key={opt}
              className={styles.select__option}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;