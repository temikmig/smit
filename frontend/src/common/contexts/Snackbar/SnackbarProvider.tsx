import { useState, useRef, type ReactNode } from "react";
import { SnackbarContext } from "./SnackbarContext";
import { Dropdown } from "../../../components/ui/Dropdown";
import type { SnackbarData } from "./types";
import { Snackbar } from "../../../components/ui/Snackbar";

interface QueueItem extends SnackbarData {
  id: number;
  open: boolean;
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const anchorRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const hideSnackbar = (id: number) => {
    setQueue((prev) =>
      prev.map((snackbar) =>
        snackbar.id === id ? { ...snackbar, open: false } : snackbar
      )
    );

    setTimeout(() => {
      setQueue((prev) => prev.filter((snackbar) => snackbar.id !== id));
    }, 250);
  };

  const showSnackbar = (options: SnackbarData) => {
    const id = ++idRef.current;
    const newItem: QueueItem = { ...options, id, open: true };
    setQueue((prev) => [newItem, ...prev]);

    const duration = options.duration ?? 30000;

    setTimeout(() => {
      hideSnackbar(id);
    }, duration + 250);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {queue.length > 0 && (
        <div className="snackbar-container">
          {queue.map((item, index) => (
            <Dropdown
              key={item.id}
              anchorRef={anchorRef}
              open={item.open}
              onClose={() => {}}
              placement="left center"
              offsetY={index * 60}
              mode="relative"
              withShadow
            >
              <Snackbar
                onClose={() => hideSnackbar(item.id)}
                mode={item.mode}
                title={item.title}
                message={item.message}
              />
            </Dropdown>
          ))}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
