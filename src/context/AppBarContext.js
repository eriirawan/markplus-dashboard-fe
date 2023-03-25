import { useState, createContext } from 'react';

export const useStore = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [unseenUpdateNumber, setUnseenUpdateNumber] = useState(0);
  const [unseenTaskListNumber, setUnseenTaskListNumber] = useState(0);

  return {
    hasNotification,
    setHasNotification,
    setUnseenTaskListNumber,
    setUnseenUpdateNumber,
    unseenTaskListNumber,
    unseenUpdateNumber,
  };
};
export const AppBarContext = createContext({});
