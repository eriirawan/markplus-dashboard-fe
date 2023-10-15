import { useState, forwardRef, useImperativeHandle } from 'react';
import { MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledMenu from './MPDropdown.styles';

const MPDropdown = forwardRef(({ menus, renderTrigger, menuProps }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useImperativeHandle(ref, () => ({
    openPopover: (target) => {
      setAnchorEl(target);
    },
  }));

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isAllMenuDisabled = menus?.every((menu) => menu.disabled);

  return (
    <>
      {renderTrigger ? renderTrigger({ isAllMenuDisabled, setAnchorEl: handleButtonClick }) : null}
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose} {...menuProps}>
        {menus
          .filter((el) => !el.hidden)
          .map((menu, i, arr) =>
            menu?.path && !menu?.disabled ? (
              <Link
                to={`${menu?.path}`}
                key={typeof menu?.label === 'string' ? menu.label : i}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <MenuItem
                  data-testid={menu['data-testid']}
                  key={String(menu.label)}
                  disableRipple
                  disabled={menu.disabled}
                  onClick={() => {
                    handleClose();
                    if (menu.onClick) {
                      menu.onClick();
                    }
                  }}
                  sx={{
                    borderBottom: i !== arr.length - 1 ? 1 : 0,
                    borderColor: '#E3EAF1',
                    py: 1,
                  }}
                >
                  {menu.label}
                </MenuItem>
              </Link>
            ) : (
              <MenuItem
                data-testid={menu['data-testid']}
                key={String(menu?.label)}
                disableRipple
                disabled={menu?.disabled}
                onClick={() => {
                  handleClose();
                  if (menu.onClick) {
                    menu.onClick();
                  }
                }}
                sx={{
                  borderBottom: i !== arr.length - 1 ? 1 : 0,
                  borderColor: '#E3EAF1',
                  py: 1,
                }}
              >
                {menu.label}
              </MenuItem>
            )
          )}
      </StyledMenu>
    </>
  );
});

MPDropdown.displayName = 'MPDropdown';

export default MPDropdown;
