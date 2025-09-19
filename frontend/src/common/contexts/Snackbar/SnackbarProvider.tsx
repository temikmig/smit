import { useState, useRef, type ReactNode } from "react";
import { SnackbarContext } from "./SnackbarContext";
import { Dropdown } from "../../../components/ui/Dropdown";
import type { SnackbarData } from "./types";
import { Snackbar } from "../../../components/ui/Snackbar";

interface QueueItem extends SnackbarData {
  id: number;
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const anchorRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const showSnackbar = (options: SnackbarData) => {
    const id = ++idRef.current;
    const newItem: QueueItem = { ...options, id };
    setQueue((prev) => [newItem, ...prev]);

    const duration = options.duration ?? 30000;

    setTimeout(() => {
      setQueue((prev) => prev.filter((item) => item.id !== id));
    }, duration + 250);
  };

  const removeSnackbar = (id: number) => {
    setQueue((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <div className="snackbar-container">
        {queue.map((item, index) => (
          <Dropdown
            key={item.id}
            anchorRef={anchorRef}
            open
            onClose={() => {}}
            placement="left center"
            offsetY={index * 60}
            mode="relative"
            withShadow
          >
            <Snackbar
              onClose={() => removeSnackbar(item.id)}
              mode={item.mode}
              title={item.title}
              message={item.message}
            />
          </Dropdown>
        ))}
      </div>
    </SnackbarContext.Provider>
  );
};
