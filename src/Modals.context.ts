import { createContext, type ReactElement } from 'react';

export type ModalsContextItem = {
  component: ReactElement;
  closed?: boolean;
};

export type ModalsContextModel = {
  openModal: (modal: ModalsContextItem) => void;
  closeLastOpenedModal: () => void;
  closeAllModals: () => void;
};

export const ModalsContext = createContext<ModalsContextModel>({
  openModal: () => {},
  closeLastOpenedModal: () => {},
  closeAllModals: () => {},
});
