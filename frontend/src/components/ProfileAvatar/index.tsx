import defaultAvatar from "../../assets/defaultAvatar.jpg";
import styles from "./ProfileAvatar.module.css";

export const ProfileAvatar = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileAvatar}>
        <img src={defaultAvatar} alt="user_avatar" />
      </div>
      <div className={styles.profileName}>
        <p className="text_medium_bold">Тёма</p>
        <p className="text_small">Суперадмин</p>
      </div>
    </div>
  );
};
