import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  lighten,
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Typography,
} from '@mui/material';
import { useState, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { alpha } from '@mui/material/styles';
import MPlusIcon from '@/components/Icon';
// import CustomTooltip from '@/components/CustomTooltip';

const Sidebar = ({ menus, openSidebar, handleOpenSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const paths = location.pathname.split('/');
  const [hoveredPath, setHoveredPath] = useState('');
  const [open, setOpen] = useState(
    menus.reduce(
      (currObject, menu) => ({
        ...currObject,
        [menu.path]: menu.path === paths[1],
      }),
      {}
    )
  );
  const [openSub, setOpenSub] = useState(
    menus.reduce((currArray, menu) => {
      if (menu.items) {
        menu.items.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          currArray[item.path] = item.path === `${paths[1]}/${paths[2]}`;
        });
      }

      return currArray;
    }, {})
  );

  const handleClick = (path) => {
    setOpen((last) => ({ ...last, [path]: !open[path] }));
    setOpenSub(
      Object.keys(openSub).reduce(
        (currArray, key) => ({
          ...currArray,
          [key]: key === `${paths[1]}/${paths[2]}`,
        }),
        {}
      )
    );
  };

  const handleClickSub = (path) => {
    setOpenSub((last) => ({ ...last, [path]: !openSub[path] }));
  };

  const handleRouter = (path) => {
    // cheap way to check if path is external
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  return (
    <Slide direction="right" in={openSidebar} unmountOnExit mountOnEnter>
      <Box
        sx={(theme) => ({
          backgroundColor: 'white',
          borderRight: `1px solid ${theme.palette.neutral.lightGrey}`,
          height: '100%',
          overflow: 'auto',
          // pb: 20,
          position: 'absolute',
          width: 250,
          zIndex: 1000,
        })}
      >
        <List disablePadding>
          {/* Expandable */}
          <Box>
            <ListItem disablePadding>
              {/* <CustomTooltip title="Close Sidebar" placement="right"> */}
              <ListItemButton
                onClick={() => {
                  handleOpenSidebar(false);
                }}
                sx={(theme) => ({
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.neutral.lightGrey, 0.5),
                  },
                  alignItems: 'center',
                  backgroundColor: lighten(theme.palette.neutral.lighterGrey, 0.5),
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
                    },
                  }}
                >
                  <MPlusIcon sx={{ color: 'neutral.greyScale02' }} name="KeyboardDoubleArrowLeft" />
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
                  // eslint-disable-next-line react/jsx-fragments
                  <Fragment key={mainMenu.path}>
                    {mainMenu.subItems ? (
                      <ListItem
                        disablePadding
                        sx={{ display: mainMenu.hidden ? 'none' : 'block' }}
                        onMouseEnter={() => setHoveredPath(mainMenu.path)}
                        onMouseLeave={() => setHoveredPath('')}
                      >
                        <ListItemButton
                          disabled={mainMenu.disabled}
                          onClick={() => handleClick(mainMenu.path)}
                          sx={(theme) => ({
                            backgroundColor: open[mainMenu.path] ? theme.palette.neutral.lightGrey : 'inherit',
                          })}
                        >
                          <Box width={40} height={25}>
                            {hoveredPath === mainMenu.path ||
                            mainMenu.path === paths[1] ||
                            mainMenu.path === `${paths[1]}/${paths[2]}` ? (
                              <MPlusIcon name={mainMenu.icon.active} sx={{ mr: 1 }} />
                            ) : (
                              <MPlusIcon name={mainMenu.icon.inActive} sx={{ mr: 1 }} />
                            )}
                          </Box>
                          <ListItemText
                            primary={
                              <Typography
                                fontSize={14}
                                sx={{
                                  fontWeight: open[mainMenu.path] ? 'bold' : 'normal',
                                }}
                              >
                                {mainMenu.name}
                              </Typography>
                            }
                          />
                          {open[mainMenu.path] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>

                        <Collapse in={open[mainMenu.path]} timeout="auto" unmountOnExit>
                          {mainMenu.subItems
                            .filter((item) => !item.hidden)
                            .map((item) => (
                              <List component="div" disablePadding key={item.path}>
                                <Link to={`/${item.path}`} style={{ textDecoration: 'none' }}>
                                  <ListItemButton
                                    onClick={() => handleRouter(item.path)}
                                    sx={(theme) => ({
                                      '& svg.MuiSvgIcon-root': {
                                        '&:hover': {
                                          color: theme.palette.primary.main,
                                          display: 'flex',
                                        },
                                        color:
                                          item.path === `${paths[1]}/${paths[2]}`
                                            ? theme.palette.primary.main
                                            : 'inherit',
                                        display: item.path === `${paths[1]}/${paths[2]}` ? 'flex' : 'none',
                                      },
                                      '&:active': {
                                        '& svg.MuiSvgIcon-root': {
                                          color: theme.palette.primary.main,
                                          display: 'flex',
                                        },
                                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                      },
                                      '&:hover': {
                                        '& svg.MuiSvgIcon-root': {
                                          display: 'flex',
                                        },
                                      },
                                      backgroundColor:
                                        item.path === `${paths[1]}/${paths[2]}`
                                          ? alpha(theme.palette.primary['500'], 0.08)
                                          : alpha(theme.palette.neutral.lighterGrey, 0.5),
                                      p: 1,
                                      pl: 6,
                                    })}
                                  >
                                    <ListItemText
                                      primary={
                                        <Typography
                                          fontSize={14}
                                          sx={{
                                            color: item.path === `${paths[1]}/${paths[2]}` ? 'primary.500' : 'black',
                                            fontWeight: item.path === `${paths[1]}/${paths[2]}` ? 'bold' : 'normal',
                                            ml: 1,
                                          }}
                                        >
                                          {item.name}
                                        </Typography>
                                      }
                                    />
                                    {item.addActionPath ? (
                                      // <CustomTooltip title={item.addActionLabel} placement="top">
                                      <ListItemIcon
                                        sx={(theme) => ({
                                          cursor: 'pointer',
                                          minWidth: 'unset',
                                          pr: 1,
                                        })}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          navigate(item.addActionPath);
                                          handleOpenSidebar(false);
                                        }}
                                      >
                                        <MPlusIcon
                                          id="iconAdd"
                                          name="AddBox"
                                          fontSize="small"
                                          sx={(theme) => ({
                                            '&:hover': {
                                              color: theme.palette.primary.main,
                                            },
                                            display: 'none',
                                          })}
                                        />
                                      </ListItemIcon>
                                    ) : // </CustomTooltip>
                                    null}
                                  </ListItemButton>
                                </Link>
                              </List>
                            ))}
                        </Collapse>
                      </ListItem>
                    ) : (
                      <ListItem
                        key={mainMenu.path}
                        disablePadding
                        sx={{
                          '&:hover': {
                            '#iconAdd': {
                              display: 'flex',
                            },
                          },
                          display: mainMenu.hidden ? 'none' : 'block',
                        }}
                        onMouseEnter={() => setHoveredPath(mainMenu.path)}
                        onMouseLeave={() => setHoveredPath('')}
                      >
                        <ListItemButton
                          disabled={mainMenu.disabled}
                          onClick={() => handleRouter(mainMenu.path)}
                          sx={(theme) => ({
                            backgroundColor:
                              mainMenu.path === paths[1] ? alpha(theme.palette.primary['500'], 0.08) : 'none',
                            display: 'flex',
                            // borderRadius: 2,
                            // mb: 1,
                            // mt: 0.25,
                            // mx: 1,
                            // p: 0.5,
                            // pt: 1,
                          })}
                        >
                          <Box width={40} height={25}>
                            <MPlusIcon
                              name={
                                hoveredPath === mainMenu.path || mainMenu.path === paths[1]
                                  ? mainMenu.icon.active
                                  : mainMenu.icon.inActive
                              }
                              sx={{ mr: 1 }}
                            />
                          </Box>
                          <ListItemText
                            primary={
                              <Typography
                                fontSize={14}
                                sx={{
                                  color: mainMenu.path === paths[1] ? 'primary.500' : 'black',
                                  fontWeight: mainMenu.path === paths[1] ? 'bold' : 'normal',
                                }}
                              >
                                {mainMenu.name}
                              </Typography>
                            }
                            sx={{ color: 'primary.500' }}
                          />
                          {mainMenu.addActionPath ? (
                            // <CustomTooltip title={mainMenu.addActionLabel} placement="top">
                            <ListItemIcon
                              sx={(theme) => ({
                                cursor: 'pointer',
                                minWidth: 'unset',
                                pr: 0.3,
                              })}
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                navigate(mainMenu.addActionPath);
                                handleOpenSidebar(false);
                              }}
                            >
                              <MPlusIcon
                                id="iconAdd"
                                name="AddBox"
                                fontSize="small"
                                sx={(theme) => ({
                                  '&:hover': {
                                    color: theme.palette.primary.main,
                                  },
                                  display: 'none',
                                })}
                              />
                            </ListItemIcon>
                          ) : // </CustomTooltip>
                          null}
                        </ListItemButton>
                      </ListItem>
                    )}
                  </Fragment>
                ))}
              </Box>
            ))}
        </List>
      </Box>
    </Slide>
  );
};

export default Sidebar;
