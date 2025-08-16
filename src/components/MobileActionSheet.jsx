import React from 'react';
import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    bottom: 0,
    left: 0,
    margin: 0,
    maxHeight: '80vh',
    maxWidth: '100%',
    position: 'fixed',
    right: 0,
    width: '100%',
  },
}));

const StyledListItem = styled(ListItem)(({ theme, color }) => ({
  color: color || 'inherit',
  padding: theme.spacing(2),
}));

const TitleBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

/**
 * MobileActionSheet component for displaying a customizable menu in a bottom sheet
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the action sheet is open
 * @param {Function} props.onClose - Function to call when the action sheet is closed
 * @param {string} props.title - Title to display at the top of the action sheet
 * @param {Array} props.menuItems - Array of menu items to display
 * @param {string} props.menuItems[].label - Text to display for the menu item
 * @param {Function} props.menuItems[].onClick - Function to call when the menu item is clicked
 * @param {string} props.menuItems[].color - Optional color for the menu item text
 */
const MobileActionSheet = ({ open, onClose, title = 'Action', menuItems = [] }) => {
  const handleItemClick = (onClick) => {
    if (onClick) {
      onClick();
    }
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={() => onClose()} fullWidth aria-labelledby="mobile-action-sheet-title">
      <TitleBox>
        <Typography variant="h6" id="mobile-action-sheet-title">
          {title}
        </Typography>
        <IconButton edge="end" color="inherit" onClick={() => onClose()} aria-label="close">
          <Close />
        </IconButton>
      </TitleBox>
      <Divider />
      <DialogContent sx={{ p: 0 }}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={`menu-item-${index}`}>
              <StyledListItem component="button" onClick={() => handleItemClick(item.onClick)} color={item.color}>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    style: {
                      color: item.color === 'error' ? '#E56363' : undefined,
                      fontWeight: item.color === 'error' ? 'bold' : 'normal',
                    },
                    variant: 'body1',
                  }}
                />
              </StyledListItem>
              {index < menuItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </StyledDialog>
  );
};

export default MobileActionSheet;
