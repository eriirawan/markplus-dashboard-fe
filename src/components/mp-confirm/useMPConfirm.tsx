import { useContext } from 'react';
import { ConfirmContext } from './MPConfirmProvider';

const useConfirm = () => {
  const confirm = useContext(ConfirmContext);
  return confirm;
};

export default useConfirm;
