import { StorageCard } from "../../components/ui/StorageCard";
import styles from "./Storage.module.css";

export const Storage = () => {
  return (
    <div className={styles.cardGrid}>
      <StorageCard title="Общий склад" index={1} />
      <StorageCard title="Тонирование" index={2} />
      <StorageCard title="Оклейка" index={3} />
    </div>
  );
};
