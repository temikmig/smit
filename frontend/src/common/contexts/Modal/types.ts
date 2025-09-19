import { type ReactNode } from "react";

export type ModalData = {
  title?: string;
  content: ReactNode;
  closeButton?: boolean;
  overlayClose?: boolean;
};

export type ModalContextType = {
  openModal: (data: ModalData) => void;
};
