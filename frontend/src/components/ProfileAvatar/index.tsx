import defaultAvatar from "../../assets/defaultAvatar.jpg";
import styles from "./ProfileAvatar.module.css";

export const ProfileAvatar = () => {
  return (
    <div className={styles.profileAvatar}>
      <img src={defaultAvatar} alt="user_avatar" />
    </div>
  );
};
