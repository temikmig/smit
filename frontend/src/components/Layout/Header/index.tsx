import { HeaderSearch } from "../../HeaderSearch";
import { ProfileAvatar } from "../../ProfileAvatar";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div />
      <div className={styles.profileCont}>
        <HeaderSearch />
        <ProfileAvatar />
      </div>
    </header>
  );
};
