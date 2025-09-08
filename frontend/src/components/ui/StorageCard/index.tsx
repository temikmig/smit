import { getColorIndex } from "../../../common/functions";
import styles from "./StorageCard.module.css";
import { StorageCardOptions } from "./StorageCardOptions";

interface StorageCardProps {
  index: number;
  title: string;
  image?: string;
}

export const StorageCard = ({ index, title, image }: StorageCardProps) => {
  return (
    <div className={styles.cardCont}>
      <div
        className={styles.cardImage}
        style={{ backgroundColor: getColorIndex(index) }}
      >
        {image}
      </div>
      <div className={styles.cardData}>
        <div className={styles.cardTitle}>
          <p>Склад</p>
          <h5>{title}</h5>
        </div>
        <div className={styles.cardOptionsCont}>
          <StorageCardOptions />
        </div>
      </div>
    </div>
  );
};
