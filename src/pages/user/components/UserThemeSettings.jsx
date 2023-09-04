import React, { useState, useRef } from 'react';
import { FavoriteBorderOutlined, Close } from '@mui/icons-material';
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { SketchPicker } from 'react-color';
import { useSnackbar } from 'notistack';

const UserThemeSettings = (props) => {
  const { openPopup, setOpenPopup, username } = props;
  const dialogRef = useRef(null);
  const colorRef = useRef([]);
  const { enqueueSnackbar } = useSnackbar();
  const [userTheme, setUserTheme] = useState('light');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [currentColorId, setCurrentColorId] = useState(0);
  const [colorSelected, setColorSelected] = useState('');
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });
  const [color1, setColor1] = useState('#EEF0F5');
  const [color2, setColor2] = useState('#2e459a');
  const [color3, setColor3] = useState('#2e459a');
  const [color4, setColor4] = useState('#ffffff');
  const [color5, setColor5] = useState('#000000');

  const colorPreviews = [
    {
      id: 1,
      color: color1,
      setColor: setColor1,
    },
    {
      id: 2,
      color: color2,
      setColor: setColor2,
    },
    {
      id: 3,
      color: color3,
      setColor: setColor3,
    },
    {
      id: 4,
      color: color4,
      setColor: setColor4,
    },
    {
      id: 5,
      color: color5,
      setColor: setColor5,
    },
  ];

  const previewTextList = [
    {
      id: 1,
      backgroundColor: color2,
      fontColor: color4,
    },
    {
      id: 2,
      backgroundColor: color4,
      fontColor: color3,
    },
    {
      id: 3,
      backgroundColor: color4,
      fontColor: color5,
    },
  ];

  const previewCardGrid = () => {
    const shownCard = [];
    for (let i = 0; i < 4; i++) {
      shownCard.push(
        <Grid key={i} item xs={6}>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ backgroundColor: color4, borderRadius: '6px', height: '60px' }}
          >
            <Typography sx={{ font: color5 }}>Card</Typography>
          </Stack>
        </Grid>
      );
    }
    return shownCard;
  };

  const previewDataList = (type) => {
    const shownData = [];
    let componentData;
    switch (type) {
      case 'column':
        componentData = (id) => (
          <Stack
            key={id}
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: color2, borderRadius: '6px', padding: '15px 16px', width: '32%' }}
          >
            <Typography sx={{ color: color4 }}>Column</Typography>
          </Stack>
        );
        break;
      default:
        componentData = (id) => (
          <Stack
            key={id}
            alignItems="center"
            justifyContent="center"
            sx={{ backgroundColor: color1, borderRadius: '6px', padding: '15px 16px', width: '32%' }}
          >
            <Typography sx={{ color: color5 }}>Data</Typography>
          </Stack>
        );
        break;
    }
    for (let i = 0; i < 3; i++) {
      shownData.push(componentData(i));
    }
    return shownData;
  };

  const handleChangeTheme = (event) => {
    setUserTheme(event.target.value);
  };

  const onClickColor = (id) => {
    const { offsetLeft, offsetTop, offsetHeight } = colorRef.current[id - 1];
    const { scrollTop } = dialogRef.current;
    setColorSelected(colorPreviews[id - 1].color);
    setCurrentColorId(id);
    setDisplayColorPicker(true);
    setPickerPosition({ x: offsetLeft, y: offsetTop - scrollTop + offsetHeight });
  };

  const onCompleteColor = (color) => {
    colorPreviews[currentColorId - 1].setColor(color);
  };

  const handleClickCover = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  const handleSave = () => {
    const values = {
      username,
      theme: userTheme,
      color1,
      color2,
      color3,
      color4,
      color5,
    };
    enqueueSnackbar('User theme changed successfully.', {
      anchorOrigin: { horizontal: 'center', vertical: 'top' },
      variant: 'successSnackbar',
    });
    setOpenPopup(false);
  };

  return (
    <Dialog maxWidth="xl" open={openPopup} PaperProps={{ sx: { p: 3, width: '55%' } }} transitionDuration={500}>
      <DialogTitle sx={{ padding: '20px 24px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h1" color="primary.main">
            User Theme Settings
          </Typography>
          <IconButton
            aria-label="delete"
            sx={{ border: 1.5, color: 'primary.main', height: '44px', width: '44px' }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent ref={dialogRef}>
        <Stack direction="row" sx={{ padding: '15px 0px 22px' }}>
          <Typography>
            This setting affect the theme of this account: <strong>{username}</strong>.
          </Typography>
        </Stack>
        <Stack>
          <TextField
            value={userTheme}
            onChange={handleChangeTheme}
            select
            label="Dashboard Theme"
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem key={1} value="light">
              Light Mode
            </MenuItem>
            <MenuItem key={2} value="dark">
              Dark Mode
            </MenuItem>
            <MenuItem key={3} value="custom">
              Custom
            </MenuItem>
          </TextField>
        </Stack>
        {userTheme === 'custom' && (
          <Stack>
            <Typography
              fontSize="18px"
              fontWeight={700}
              lineHeight="27px"
              color="primary"
              sx={{ margin: '24px 0px 16px' }}
            >
              Color Setting
            </Typography>
            <Stack direction="row" spacing={3}>
              {colorPreviews.map((item, idx) => (
                <Box
                  key={item.id}
                  ref={(el) => (colorRef.current[idx] = el)}
                  sx={{
                    backgroundColor: item.color,
                    border: '1px solid #3131311a',
                    borderRadius: '50%',
                    boxShadow: '2px 2px 4px 1px #31313136',
                    cursor: 'pointer',
                    height: '50px',
                    width: '50px',
                  }}
                  onClick={() => onClickColor(item.id)}
                />
              ))}
              {displayColorPicker && (
                <Stack
                  sx={{
                    position: 'absolute',
                    zIndex: '2',
                    top: pickerPosition.y,
                    left: pickerPosition.x,
                  }}
                >
                  <Stack
                    sx={{
                      bottom: '0px',
                      left: '0px',
                      position: 'fixed',
                      right: '0px',
                      top: '0px',
                    }}
                    onClick={handleClickCover}
                  />
                  <SketchPicker
                    color={colorSelected}
                    disableAlpha
                    onChangeComplete={(color) => {
                      onCompleteColor(color.hex);
                    }}
                    onChange={(color) => {
                      setColorSelected(color);
                    }}
                  />
                </Stack>
              )}
            </Stack>
            <Stack>
              <Typography
                fontSize="18px"
                fontWeight={700}
                lineHeight="27px"
                color="primary"
                sx={{ margin: '24px 0px 16px' }}
              >
                Preview
              </Typography>
              <Stack direction="row" sx={{ justifyContent: 'space-between', marginBottom: '16px' }}>
                <Stack sx={{ width: '48%' }}>
                  <Grid
                    container
                    sx={{
                      backgroundColor: color1,
                      borderRadius: '6px',
                      boxShadow: '1px 1px 4px 1px #31313136',
                      padding: '16px',
                    }}
                    direction="row"
                    wrap="nowrap"
                  >
                    <Grid item xs={2} sx={{ backgroundColor: color4, borderRadius: '6px', marginRight: '16px' }}>
                      <Stack sx={{ alignItems: 'center', padding: '6px' }} spacing={1}>
                        <Box
                          sx={{ backgroundColor: color2, width: '1.5vw', height: '1.5vw', borderRadius: '0.75vw' }}
                        />
                        <Box
                          sx={{ backgroundColor: color5, width: '1.5vw', height: '1.5vw', borderRadius: '0.75vw' }}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={10}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ backgroundColor: color2, borderRadius: '6px', padding: '8px' }}
                      >
                        <Typography sx={{ color: color4 }}>Navbar</Typography>
                        <Box
                          sx={{ backgroundColor: color4, width: '1.5vw', height: '1.5vw', borderRadius: '0.75vw' }}
                        />
                      </Stack>
                      <Grid container spacing={2} sx={{ paddingTop: '10px' }}>
                        {previewCardGrid()}
                      </Grid>
                    </Grid>
                  </Grid>
                </Stack>
                <Stack sx={{ width: '48%' }}>
                  <Stack
                    spacing={2}
                    sx={{
                      backgroundColor: color1,
                      borderRadius: '6px',
                      boxShadow: '1px 1px 4px 1px #31313136',
                      padding: '16px',
                    }}
                  >
                    {previewTextList.map((setting) => (
                      <Stack
                        key={setting.id}
                        justifyContent="center"
                        sx={{ backgroundColor: setting.backgroundColor, borderRadius: '6px', padding: '15px 16px' }}
                      >
                        <Typography sx={{ color: setting.fontColor }}>Text</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Stack sx={{ width: '48%' }}>
                  <Stack
                    spacing={3}
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '6px',
                      boxShadow: '1px 1px 4px 1px #31313136',
                      padding: '16px',
                    }}
                  >
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      direction="row"
                      sx={{ backgroundColor: color2, borderRadius: '6px', padding: '8px 22px', width: '95%' }}
                    >
                      <FavoriteBorderOutlined sx={{ color: color4, marginRight: '8px' }} />
                      <Typography sx={{ color: color4 }}>Button Enabled</Typography>
                    </Stack>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      direction="row"
                      sx={{
                        backgroundColor: color2,
                        borderRadius: '6px',
                        padding: '8px 22px',
                        width: '90%',
                        opacity: 0.75,
                      }}
                    >
                      <FavoriteBorderOutlined sx={{ color: color4, marginRight: '8px' }} />
                      <Typography sx={{ color: color4 }}>Button Hover</Typography>
                    </Stack>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      direction="row"
                      sx={{
                        backgroundColor: color2,
                        borderRadius: '6px',
                        padding: '8px 22px',
                        width: '90%',
                        opacity: 0.5,
                      }}
                    >
                      <FavoriteBorderOutlined sx={{ color: color4, marginRight: '8px' }} />
                      <Typography sx={{ color: color4 }}>Button Focus</Typography>
                    </Stack>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      direction="row"
                      sx={{
                        backgroundColor: color2,
                        borderRadius: '6px',
                        padding: '8px 22px',
                        width: '95%',
                        opacity: 0.2,
                      }}
                    >
                      <FavoriteBorderOutlined sx={{ color: color5, marginRight: '8px' }} />
                      <Typography sx={{ color: color5 }}>Button Disabled</Typography>
                    </Stack>
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      direction="row"
                      sx={{ border: `1px solid ${color2}`, borderRadius: '6px', padding: '8px 22px', width: '95%' }}
                    >
                      <FavoriteBorderOutlined sx={{ color: color3, marginRight: '8px' }} />
                      <Typography sx={{ color: color3 }}>Button Outline</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack sx={{ width: '48%' }}>
                  <Stack
                    spacing={1}
                    sx={{
                      backgroundColor: color4,
                      borderRadius: '6px',
                      boxShadow: '1px 1px 4px 1px #31313136',
                      padding: '16px',
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      {previewDataList('column')}
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      {previewDataList()}
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      {previewDataList()}
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      {previewDataList()}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
        <Stack direction="row" spacing={2} sx={{ mt: 6 }}>
          <Button fullWidth onClick={handleSave}>
            Save Changes
          </Button>
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default UserThemeSettings;
