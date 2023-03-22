// @ts-nocheck
import { Box, List, ListItem, ListItemButton, alpha, lighten } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import CustomTooltip from '@/components/CustomTooltip';
import MPlusIcon from '../../Icon';

const SidebarSmall = ({ menus, height, handleOpenSidebar }) => {
  const location = useLocation();
  const paths = location.pathname.split('/');
  const navigate = useNavigate();
  const [hoveredPath, setHoveredPath] = useState('');

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.neutral.lighterGrey, 0.5),
        borderRight: `1px solid ${theme.palette.neutral.lightGrey}`,
        height,
        overflow: 'hidden',
        width: 50,
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
                  mx: 'auto',
                  px: 1.5,
                })}
              >
                <Box
                  lineHeight={0}
                  sx={{
                    '& svg': {
                      opacity: 1,
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
            <Box key={menu.group} sx={{ mb: 2 }}>
              {menu.menus.map((mainMenu) => (
                <ListItem
                  key={mainMenu.path}
                  disablePadding
                  sx={{ display: mainMenu.hidden ? 'none' : 'block', height: 44 }}
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
                        backgroundColor:
                          mainMenu.path === paths[1] ? alpha(theme.palette.primary.main, 0.08) : 'inherit',
                        display: 'flex',
                        mx: 'auto',
                        px: 1.5,
                      })}
                    >
                      <Box
                        lineHeight={0}
                        sx={{
                          '& svg': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Box width={40} height={25}>
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
