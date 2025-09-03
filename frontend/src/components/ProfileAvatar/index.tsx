import defaultAvatar from "../../assets/defaultAvatar.jpg";
import styles from "./ProfileAvatar.module.css";

export const ProfileAvatar = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileName}>
        <h2>Тёма</h2>
        <p className="text_small">Администратор</p>
      </div>
      <div className={styles.profileAvatar}>
        <img src={defaultAvatar} alt="user_avatar" />
      </div>
    </div>
  );
};
