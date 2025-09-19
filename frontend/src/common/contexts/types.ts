import { type ReactNode } from "react";

export type ModalData = {
  title?: string;
  content: ReactNode;
};

export type ModalContextType = {
  openModal: (data: ModalData) => void;
};
