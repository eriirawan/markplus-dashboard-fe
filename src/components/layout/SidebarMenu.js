/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable arrow-body-style */
import { useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Permissions from '@/permissions';
import { AppContext } from '@/context/AppContext';

const iconSize = 20;

const useSidebarMenus = () => {
  const { hasPermission } = useAuth();
  const { me } = useContext(AppContext);

  return [
    {
      group: 'dashboard',
      menus: [
        {
          icon: {
            active: 'ChartActive',
            inActive: 'ChartNormal',
          },
          name: 'Dashboard',
          path: 'home',
        }
      ],
    },
    {
      group: 'user',
      menus: [
        {
          icon: {
            active: 'UserActive',
            inActive: 'UserNormal',
          },
          name: 'User',
          path: 'user',
        }
      ],
    },
  ];
};

export default useSidebarMenus;
