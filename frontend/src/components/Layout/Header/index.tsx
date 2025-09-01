import { SmitLogo } from "../../../assets/logo/SmitLogo";
import { HeaderSearch } from "../../HeaderSearch";
import { ProfileAvatar } from "../../ProfileAvatar";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <SmitLogo />
      </div>
      <div className={styles.profileCont}>
        <ProfileAvatar />
        <HeaderSearch />
      </div>
    </header>
  );
};
