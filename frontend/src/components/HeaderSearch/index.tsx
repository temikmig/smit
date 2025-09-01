import { SearchIcon } from "../../assets/icons/SearchIcon";
import styles from "./HeaderSearch.module.css";

export const HeaderSearch = () => {
  return (
    <div className={styles.headerSearch}>
      <input type="text" placeholder="Поиск в Смите" />
      <SearchIcon color="#8fb0c8" fontSize="20px" viewBox="0 0 32 32" />
    </div>
  );
};
