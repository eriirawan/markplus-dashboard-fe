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
      group: 'results',
      menus: [
        {
          icon: {
            active: 'ResultActive',
            inActive: 'ResultNormal',
          },
          name: 'Result',
          path: 'results',
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
          path: 'user-list',
        },
      ],
    },
    {
      group: 'activityLog',
      hidden: me?.role?.toLowerCase() !== 'master admin',
      menus: [
        {
          icon: {
            active: 'History',
            inActive: 'History',
          },
          name: 'Activity',
          path: 'activity-log',
        },
      ],
    },
  ];
};

export default useSidebarMenus;
