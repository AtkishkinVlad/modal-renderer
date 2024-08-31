import { useContext } from 'react';
import { ModalsContext } from './Modals.context';

export const useModals = () => {
  return useContext(ModalsContext);
};
