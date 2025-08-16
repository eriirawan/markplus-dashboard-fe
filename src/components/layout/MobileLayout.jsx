import React, { useContext, useState, useEffect } from 'react';
import { useOutlet, useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import { AppContext } from '@/context/AppContext';

const MobileContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
}));

export const Header = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: '1.2rem',
  fontWeight: 'bold',
  padding: theme.spacing(2),
  textTransform: 'capitalize',
}));

const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: theme.spacing(2),
  overflowY: 'auto',
  // padding: theme.spacing(2),
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  '& .MuiBottomNavigationAction-label': {
    '&.Mui-selected': {
      fontSize: '0.75rem',
    },
    fontSize: '0.7rem',
  },
  '& .MuiBottomNavigationAction-root': {
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
    minWidth: 'auto',
    padding: theme.spacing(1, 0),
  },
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  width: '100%',
}));

const AddChartButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(1),
  color: theme.palette.primary.main,
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'center',
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  width: '100%',
}));

const MobileLayout = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const appContext = useContext(AppContext);

  const [value, setValue] = useState(0);
  const { me } = appContext || {};
  const isUser = me?.role?.toLowerCase() === 'user';
  const isMasterAdmin = me?.role?.toLowerCase() === 'master admin';

  useEffect(() => {
    // Set active tab based on current path
    const path = location.pathname;
    if (path.includes('/home')) {
      setValue(0);
    } else if (path.includes('/results')) {
      setValue(1);
    } else if (path.includes('/fieldwork')) {
      setValue(2);
    } else if (path.includes('/evidence')) {
      setValue(3);
    } else if (path.includes('/user-list')) {
      setValue(4);
    } else if (path.includes('/activity-log')) {
      setValue(5);
    }
  }, [location]);

  const handleNavChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/home');
        break;
      case 1:
        navigate('/results');
        break;
      case 2:
        navigate('/fieldwork');
        break;
      case 3:
        navigate('/evidence');
        break;
      case 4:
        navigate('/user-list');
        break;
      case 5:
        navigate('/activity-log');
        break;
      default:
        navigate('/home');
    }
  };

  // Filter navigation items based on user role
  const getNavigationItems = () => {
    // Default items that are always shown
    const items = [
      <BottomNavigationAction key="home" label="Home" icon={<HomeIcon />} />,
      <BottomNavigationAction key="results" label="Result" icon={<AssessmentIcon />} />,
      <BottomNavigationAction key="fieldwork" label="Fieldwork" icon={<WorkIcon />} />,
      <BottomNavigationAction key="evidence" label="Evidence" icon={<DescriptionIcon />} />,
    ];

    // Add Users menu if not a regular user
    if (!isUser) {
      items.push(<BottomNavigationAction key="users" label="Users" icon={<PeopleIcon />} />);
    }

    // Add Activity Log menu if master admin
    if (isMasterAdmin) {
      items.push(<BottomNavigationAction key="activity" label="Activity" icon={<HistoryIcon />} />);
    }

    return items;
  };

  // Calculate the maximum value for navigation based on available items
  const maxNavValue = (() => {
    let max = 3; // Default items (Home, Result, Fieldwork, Evidence) are 0-3
    if (!isUser) max++; // Users item
    if (isMasterAdmin) max++; // Activity item
    return max;
  })();

  // Ensure value stays within bounds of available navigation items
  useEffect(() => {
    if (value > maxNavValue) {
      setValue(0); // Reset to Home if current value exceeds available items
    }
  }, [value, maxNavValue]);

  return (
    <MobileContainer>
      {/* <Header>MARKPLUS DASHBOARD</Header> */}
      <Content>{outlet}</Content>
      <StyledBottomNavigation value={value} onChange={handleNavChange} showLabels>
        {getNavigationItems()}
      </StyledBottomNavigation>
    </MobileContainer>
  );
};

export default MobileLayout;
