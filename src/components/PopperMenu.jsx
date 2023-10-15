import { Popper, Grow, ClickAwayListener, MenuItem, MenuList, Paper } from '@mui/material';

const PopperMenu = ({ anchorEl, open, list = [], handleChange, handleClose, children, sxMenu, value }) => (
  <Popper open={open} anchorEl={anchorEl} role={undefined} transition sx={{ zIndex: 1300 }}>
    {({ TransitionProps, placement }) => (
      <Grow
        {...TransitionProps}
        style={{
          transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
        }}
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            {children || (
              <MenuList autoFocusItem sx={{ boxShadow: '1px 1px 100px rgba(0, 0, 0, 0.15)', ...sxMenu }}>
                {list.map((option, i) => (
                  <MenuItem
                    disabled={option.disabled}
                    key={i}
                    selected={value === option.value}
                    onClick={() => handleChange(option.value)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            )}
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
  </Popper>
);

export default PopperMenu;
