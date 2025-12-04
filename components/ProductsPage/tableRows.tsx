import { getProductsUrl } from "../../utils/api/config";
import { ManagedImg } from "../preload/managedImg";
import styles from "./styles/table.module.scss";

const TableRows = ({ products }: { products: any[] }) => {
  const getUnitText = (unit: number) =>
    unit === 2 ? "шт" : unit == 3 ? "пучок" : "кг";
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerUnitsRow}>
            <th className={styles.colName}>НАИМЕНОВАНИЕ ТОВАРА</th>
            <th className={styles.cell}>
              <span className={styles.orange}>ОПТ</span>
            </th>
            <th className={styles.cell}>мин.</th>
            <th className={styles.cell}>макс.</th>
            <th className={styles.cell}>
              <span className={styles.orange}>РОЗН.</span>
            </th>
            <th className={styles.cell}>мин.</th>
            <th className={styles.cell}>макс.</th>
          </tr>
        </thead>

        <tbody>
          {/* {products.map((p, idx) => (
            <tr
              key={p.title + idx}
              className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}
            >
              <td className={styles.nameCell}>
                <span className={styles.productName}>{p.title}</span>
              </td>

              <td className={styles.unit}>{p.type}</td>
              <td className={styles.number}>{p.wholesale.min}</td>
              <td className={styles.number}>{p.wholesale.max}</td>

              <td className={styles.unit}>{p.type}</td>
              <td className={styles.number}>{p.retail.min}</td>
              <td className={styles.number}>{p.retail.max}</td>
            </tr>
          ))} */}
          {products.map((p, i) => (
            <tr
              key={p.title + i}
              className={i % 2 === 0 ? styles.rowEven : styles.rowOdd}
            >
              <td className={styles.nameCell}>
                <span className={styles.productName}>{p.name}</span>
              </td>
              <td className={styles.unit}>{getUnitText(p.opt_unit)}</td>
              <td className={styles.number}>{p.opt_price_min.slice(0, -3) || "-"}</td>
              <td className={styles.number}>{p.opt_price_max.slice(0, -3) || "-"}</td>

              <td className={styles.unit}>{getUnitText(p.rozn_unit)}</td>
              <td className={styles.number}>{p.rozn_price_min.slice(0, -3) || "-"}</td>
              <td className={styles.number}>{p.rozn_price_max.slice(0, -3) || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TableRows;
