import { type ReactNode } from "react";

export type ModalData = {
  title?: string;
  content: ReactNode;
  closeButton?: boolean;
  overlayClose?: boolean;
};

export type ModalItem = {
  id: string;
  data: ModalData;
  open: boolean;
};

export type ModalContextType = {
  openModal: (data: ModalData) => void;
};
