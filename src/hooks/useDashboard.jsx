/* eslint-disable no-unsafe-optional-chaining */
import { createContext, useMemo, useContext, useState, useEffect } from 'react';

const DashboardContext = createContext({});

export const DashboardProvider = ({ children }) => {
  const [dashboardContent, setDashboardContent] = useState([]);
  const value = useMemo(
    () => ({
      dashboardContent,
      setDashboardContent,
    }),
    [dashboardContent]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export const useDashboard = () => useContext(DashboardContext);
