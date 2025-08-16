import React, { useContext, useState, useEffect } from 'react';
import { useOutlet, useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import { AppContext } from '@/context/AppContext';
import { AppBarContext } from '@/context/AppBarContext';

const MobileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  backgroundColor: theme.palette.background.default,
}));

const Header = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: '1.2rem',
}));

const Content = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  '& .MuiBottomNavigationAction-root': {
    minWidth: 'auto',
    padding: theme.spacing(1, 0),
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiBottomNavigationAction-label': {
    fontSize: '0.7rem',
    '&.Mui-selected': {
      fontSize: '0.75rem',
    },
  },
}));

const AddChartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  border: `2px dashed ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ClientSelectContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ClientSelectLabel = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  fontSize: '0.9rem',
  color: theme.palette.text.secondary,
}));

const MobileLayout = () => {
  const outlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const appBarContext = useContext(AppBarContext);
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [clientName, setClientName] = useState('');
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

  useEffect(() => {
    if (appContext?.clientSelected?.company_name) {
      setClientName(appContext.clientSelected.company_name);
    }
  }, [appContext?.clientSelected]);

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

  const handleClientChange = (event) => {
    const selectedClientId = event.target.value;
    const selectedClient = appContext.clientList.find((client) => client.id === selectedClientId);
    if (selectedClient) {
      appContext.setClientSelected(selectedClient);
      setClientName(selectedClient.company_name);
    }
  };

  const handleAddChart = () => {
    navigate('/home/add-chart');
  };

  // Filter navigation items based on user role
  const getNavigationItems = () => {
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
  return (
    <MobileContainer>
      <Header>MARKPLUS DASHBOARD</Header>
      <Content>
        <ClientSelectContainer>
          <ClientSelectLabel>Set dashboard for</ClientSelectLabel>
          <FormControl fullWidth size="small">
            <Select
              value={appContext?.clientSelected?.id || ''}
              onChange={handleClientChange}
              displayEmpty
              sx={{
                borderRadius: theme.shape.borderRadius,
                '& .MuiSelect-select': {
                  padding: theme.spacing(1.25),
                },
              }}
            >
              <MenuItem value="" disabled>
                Select client
              </MenuItem>
              {appContext?.clientList?.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.company_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ClientSelectContainer>

        <AddChartButton onClick={handleAddChart}>
          <AddIcon />
          <Typography variant="button">Add Chart</Typography>
        </AddChartButton>

        {outlet}
      </Content>
      <StyledBottomNavigation value={value} onChange={handleNavChange} showLabels>
        {getNavigationItems()}
      </StyledBottomNavigation>
    </MobileContainer>
  );
};

export default MobileLayout;
