import { CrossSmallIcon } from "../../../assets/icons";
import type { SnackbarData } from "../../../common/contexts/Snackbar/types";

import styles from "./Snackbar.module.css";
import clsx from "clsx";

interface SnackbarProps extends SnackbarData {
  onClose: () => void;
}

export const Snackbar = ({ title, message, mode, onClose }: SnackbarProps) => {
  return (
    <div className={clsx(styles.snackbarCont, styles[mode])}>
      <p className="text_medium_bold">{title}</p>
      <p className="text_small">{message}</p>
      <button className={styles.closeSnackbar} onClick={onClose}>
        <CrossSmallIcon />
      </button>
    </div>
  );
};
