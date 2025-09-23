import { type ReactNode } from "react";

export type ModalData = {
  title?: string;
  description?: string;
  content?: ReactNode;
  closeButton?: boolean;
  overlayClose?: boolean;
  primaryButton?: { text: string; onClick: () => void };
  secondaryButton?: { text: string; onClick: () => void };
};

export type ModalItem = {
  id: string;
  data: ModalData;
  open: boolean;
};

export type ModalContextType = {
  openModal: (data: ModalData) => string;
  closeModal: (id: string) => void;
};
