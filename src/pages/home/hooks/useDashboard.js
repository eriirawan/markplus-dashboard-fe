import { useState } from 'react';

export const useDashboard = () => {
  const [dashboardContent, setDashboardContent] = useState([]);

  return {
    dashboardContent,
    setDashboardContent,
  };
};

export default useDashboard;
