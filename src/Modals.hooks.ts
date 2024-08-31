import { useContext } from 'react';
import { ModalsContext } from './Modals.context.js';

export const useModals = () => {
  return useContext(ModalsContext);
};
