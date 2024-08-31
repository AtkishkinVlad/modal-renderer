import React, {
  type FC,
  type PropsWithChildren,
  useMemo,
  useState,
} from 'react';
import { ModalsContext, type ModalsContextItem } from './Modals.context';

export const ModalsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<ModalsContextItem[]>([]);

  const openModal = (modal: ModalsContextItem) => {
    setModals((prevModals) => [...prevModals, { ...modal, closed: false }]);
  };

  const closeLastOpenedModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  const closeAllModals = () => {
    setModals([]);
  };

  const openedModals = useMemo(
    () => (
      <>
        {modals.map((modal, i) => (
          <React.Fragment key={i}>
            {!modal.closed && modal.component}
          </React.Fragment>
        ))}
      </>
    ),
    [modals],
  );

  const publicApi = {
    openModal,
    closeLastOpenedModal,
    closeAllModals,
  };

  return (
    <ModalsContext.Provider value={publicApi}>
      <div>
        {children}
        {openedModals}
      </div>
    </ModalsContext.Provider>
  );
};
