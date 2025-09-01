import defaultAvatar from "../../assets/defaultAvatar.jpg";
import { ArrowDownIcon } from "../../assets/icons";
import styles from "./ProfileAvatar.module.css";

export const ProfileAvatar = () => {
  return (
    <div className={styles.profileAvatar}>
      <img src={defaultAvatar} alt="user_avatar" />
      <button className={styles.showProfileMenu}>
        <ArrowDownIcon fontSize="8px" viewBox="0 0 28 28 " />
      </button>
    </div>
  );
};
