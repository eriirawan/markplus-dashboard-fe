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
      group: 'home',
      menus: [
        {
          icon: {
            active: 'HomeActive',
            inActive: 'HomeNormal',
          },
          name: 'Home',
          path: 'home',
        },
      ],
    },
    {
      group: 'result',
      menus: [
        {
          icon: {
            active: 'ResultActive',
            inActive: 'ResultNormal',
          },
          name: 'Result',
          path: 'result',
        },
      ],
    },
    {
      group: 'fieldwork',
      menus: [
        {
          icon: {
            active: 'FieldWorkActive',
            inActive: 'FieldWorkNormal',
          },
          name: 'Fieldwork',
          path: 'fieldwork',
        },
      ],
    },
    {
      group: 'evidence',
      menus: [
        {
          icon: {
            active: 'EvidenceActive',
            inActive: 'EvidenceNormal',
          },
          name: 'Evidence',
          path: 'evidence',
        },
      ],
    },
    {
      group: 'users',
      hidden: me?.role?.toLowerCase() === 'user',
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
    // {
    //   group: 'management',
    //   menus: [
    //     {
    //       icon: {
    //         active: 'SettingActive',
    //         inActive: 'SettingNormal',
    //       },
    //       name: 'User Management',
    //       path: 'user-management',
    //     },
    //   ],
    // },
  ];
};

export default useSidebarMenus;
