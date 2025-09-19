import React, { useState, useRef, type ReactNode } from "react";

import { type ModalData } from "./types";
import { ModalContext } from "./ModalContext";
import { Dropdown } from "../../components/ui/Dropdown";

type ModalItem = {
  id: string;
  data: ModalData;
  open: boolean;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<ModalItem[]>([]);
  const centerRef = useRef<HTMLDivElement>(null);

  const openModal = (data: ModalData) => {
    const id = Math.random().toString(36).slice(2);
    setModals((prev) => [...prev, { id, data, open: true }]);
    return id;
  };

  const closeModal = (id: string) => {
    setModals((prev) =>
      prev.map((m) => (m.id === id ? { ...m, open: false } : m))
    );
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}

      {/* фиктивный anchor для центрирования */}
      <div
        ref={centerRef}
        style={{ position: "fixed", top: "50%", left: "50%" }}
      />

      {modals.map((modal) => (
        <Dropdown
          key={modal.id}
          anchorRef={centerRef}
          open={modal.open}
          onClose={() => closeModal(modal.id)}
          placement="center"
          overlay
        >
          {/* Контент модалки */}
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              minWidth: 300,
              maxWidth: 600,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            {modal.data.title && <h2>{modal.data.title}</h2>}
            <div>{modal.data.content}</div>
            <button
              style={{ marginTop: 16 }}
              onClick={() => closeModal(modal.id)}
            >
              Закрыть
            </button>
          </div>
        </Dropdown>
      ))}
    </ModalContext.Provider>
  );
};
