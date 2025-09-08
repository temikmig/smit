import { NotificationsIcon } from "../../assets/icons";
import styles from "./Notifications.module.css";

export const Notifications = () => {
  return (
    <div className={styles.notificationsCont}>
      <NotificationsIcon />
      <div className={styles.noticeFlag} />
    </div>
  );
};
