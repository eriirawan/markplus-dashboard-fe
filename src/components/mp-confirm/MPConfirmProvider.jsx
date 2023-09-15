import { useState, useCallback, createContext } from 'react';
import MPConfirmDialog from './MPConfirmDialog';

export const useConfirmStore = () => {
  const [options, setOptions] = useState({});
  const [resolveReject, setResolveReject] = useState([]);

  const confirm = useCallback(
    (opts) =>
      new Promise((rsv, rjt) => {
        setOptions(opts);
        setResolveReject([rsv, rjt]);
      }),
    []
  );
  return { confirm, options, resolveReject, setResolveReject };
};

export const ConfirmContext = createContext({});

const MPConfirmProvider = ({ children, value }) => {
  const { confirm, options, resolveReject, setResolveReject } = value;
  const [resolve, reject] = resolveReject;

  const handleClose = useCallback(() => {
    setResolveReject([]);
  }, []);

  const handleCancel = useCallback(() => {
    if (reject) {
      reject();
      handleClose();
    }
  }, [reject, handleClose]);

  const handleConfirm = useCallback(() => {
    if (resolve) {
      resolve();
      handleClose();
    }
  }, [resolve, handleClose]);

  return (
    <>
      <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
      <MPConfirmDialog
        open={resolveReject.length === 2}
        options={options}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default MPConfirmProvider;
