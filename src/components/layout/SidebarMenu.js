/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable arrow-body-style */
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { useAuth } from '@/hooks/useAuth';

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
        },
      ],
    },
    {
      group: 'users',
      menus: [
        {
          icon: {
            active: 'UserActive',
            inActive: 'UserNormal',
          },
          name: 'Users',
          path: 'users',
        },
      ],
    },
    {
      group: 'management',
      menus: [
        {
          icon: {
            active: 'SettingActive',
            inActive: 'SettingNormal',
          },
          name: 'User Management',
          path: 'user-management',
        },
      ],
    },
  ];
};

export default useSidebarMenus;
