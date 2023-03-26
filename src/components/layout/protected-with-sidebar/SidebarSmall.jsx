// @ts-nocheck
import { Box, List, ListItem, ListItemButton, Stack, alpha } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import CustomTooltip from '@/components/CustomTooltip';
import { MPlusIcon } from '../../Icon';

const SidebarSmall = ({ menus, height, handleOpenSidebar }) => {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const navigate = useNavigate();
  const [hoveredPath, setHoveredPath] = useState('');

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: 'white',
        borderRadius: '10px',
        borderRight: `1px solid ${theme.palette.neutral.lightGrey}`,
        height,
        overflow: 'hidden',
        width: 60,
      })}
    >
      <List disablePadding>
        {/* Expandable */}
        <Box>
          <ListItem disablePadding>
            {/* <CustomTooltip title="Open Sidebar" placement="right"> */}
            <ListItemButton
              onClick={() => {
                handleOpenSidebar(true);
              }}
              sx={(theme) => ({
                '&:hover': {
                  backgroundColor: alpha(theme.palette.neutral.lightGrey, 0.5),
                },
                backgroundColor: 'inherit',
                display: 'flex',
                justifyContent: 'center',
                mx: 'auto',
                px: 1.5,
              })}
            >
              <Box
                lineHeight={0}
                sx={{
                  '& svg': {
                    opacity: 1,
                    width: 'inherit',
                  },
                }}
              >
                <MPlusIcon sx={{ color: 'neutral.greyScale02' }} name="KeyboardDoubleArrowRight" />
              </Box>
            </ListItemButton>
            {/* </CustomTooltip> */}
          </ListItem>
        </Box>
        {menus
          .filter((menu) => !menu.hidden)
          .map((menu) => (
            <Box key={menu.group} sx={{ mb: 1.25 }}>
              {menu.menus.map((mainMenu) => (
                <ListItem
                  key={mainMenu.path}
                  disablePadding
                  sx={{ display: mainMenu.hidden ? 'none' : 'block' }}
                  onMouseEnter={() => setHoveredPath(mainMenu.path)}
                  onMouseLeave={() => setHoveredPath('')}
                >
                  {/* <CustomTooltip title={mainMenu.name} placement="right"> */}
                  <ListItemButton
                    onClick={() => {
                      if (!mainMenu.subItems) {
                        if (!mainMenu.path.startsWith('http')) {
                          navigate(mainMenu.path);
                          return;
                        }

                        window.open(mainMenu.path, '_blank');
                      }

                      handleOpenSidebar(true);
                    }}
                    disabled={mainMenu.disabled}
                    sx={(theme) => ({
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.neutral.lightGrey, 0.5),
                      },
                      backgroundColor: 'inherit',
                      display: 'flex',
                      justifyContent: 'center',
                      mx: 'auto',
                      px: 1.5,
                    })}
                  >
                    {mainMenu.path === paths[1] && (
                      <Box
                        width="2px"
                        position="absolute"
                        left={0}
                        borderRadius={1.25}
                        height={22}
                        bgcolor="primary.main"
                      />
                    )}
                    <Box
                      lineHeight={0}
                      sx={{
                        '& svg': {
                          opacity: 1,
                          width: 'inherit',
                        },
                      }}
                    >
                      <Box width={40}>
                        {hoveredPath === mainMenu.path || mainMenu.path === paths[1] ? (
                          <MPlusIcon name={mainMenu.icon.active} />
                        ) : (
                          <MPlusIcon name={mainMenu.icon.inActive} />
                        )}
                      </Box>
                      {/* <MPlusIcon>{mainMenu.icon as BoxProps['children']}</Icon> */}
                    </Box>
                  </ListItemButton>
                  {/* </CustomTooltip> */}
                </ListItem>
              ))}
            </Box>
          ))}
      </List>
    </Box>
  );
};

export default SidebarSmall;
