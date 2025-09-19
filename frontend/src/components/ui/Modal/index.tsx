import styles from "./Modal.module.css";
import { CrossSmallIcon } from "../../../assets/icons";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  closeButton?: boolean;
  title?: string;
  children: React.ReactNode;
};

export const Modal = ({
  isOpen,
  onClose,
  closeButton = true,
  title,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalCont}>
      <h4>{title}</h4>
      {closeButton && (
        <button className={styles.closeModal} onClick={onClose}>
          <CrossSmallIcon />
        </button>
      )}
      <div className={styles.modalContent}>{children}</div>
    </div>
  );
};
