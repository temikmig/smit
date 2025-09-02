import { SearchIcon } from "../../assets/icons/SearchIcon";
import styles from "./HeaderSearch.module.css";

export const HeaderSearch = () => {
  return (
    <div className={styles.headerSearch}>
      <SearchIcon color="#8fb0c8" />
      <input type="text" placeholder="Поиск в Смите" />
    </div>
  );
};
