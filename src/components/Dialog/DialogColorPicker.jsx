import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { PickerColorSmall } from '../../helpers/Icons';
import CustomColorPicker from './CustomColorPicker';
import tinycolor from 'tinycolor2';

const DialogColorPicker = ({ dataSets, onCancel, onSaveChanges, openDialog }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [codeColor, setCodeColor] = useState({
  //   hsl: {
  //     h: 0,
  //     s:0,
  //     l:0
  //   },
  //   hsv: {
  //     h: 0,
  //     s: 0,
  //     v: 0
  //   },
  //   rgb: {
  //     r: 0,
  //     g:0,
  //     b: 0
  //   }
  // })
  const renderMain = useMemo(() => {
    return (
      <Dialog
        open={openDialog}
        PaperProps={{
          style: {
            width: '100%',
            maxWidth: '444px',
          },
        }}
        onClose={onCancel}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          // paddingX={'32px'}
          // paddingTop={'32px'}
          marginBottom={'16px'}
          minWidth={'252px'}
          padding={'64px 64px 0px 64px'}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '24px', lineHeight: '31px' }}> Color Chart Settings</Typography>
          <IconButton
            aria-label="close"
            onClick={() => onCancel()}
            sx={{
              // position: 'absolute',
              // right: 8,
              // top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Stack>
        <DialogContent sx={{ padding: 0, marginBottom: '40px' }}>
          {dataSets?.map((el, i) => {
            return (
              <Stack display={'flex'} direction="column" padding={'0px 64px'}>
                <Typography fontWeight={700} fontSize={'16px'} lineHeight={'24px'}>
                  {el.label}
                </Typography>
                <Box display="flex" gap={'16px'} sx={{ padding: '9px 0px 19px 0px' }}>
                  <Box
                    sx={{
                      backgroundColor: el.backgroundColor,
                      width: '100%',
                      maxWidth: '44px',
                      maxHeight: '44px',
                      // height: '100%',
                    }}
                    onClick={() => {
                      // setOpenDialog()
                      setSelectedCategory((prev) => (prev === el ? '' : el));
                    }}
                  >
                    <Box sx={{ position: 'relative', top: '-5px', left: '32px' }}>
                      <PickerColorSmall />
                    </Box>
                  </Box>
                  <TextField
                    label="Color Code"
                    placeholder="Color Code"
                    InputProps={{ style: { height: '44px' } }}
                    InputLabelProps={{ shrink: true }}
                    onChange={() => {}}
                    fullWidth
                    // onChange={(e) => handleChangeForm('chartLabel', e.target.value)}
                    sx={{}}
                  ></TextField>
                </Box>
                {selectedCategory && selectedCategory === el && (
                  <CustomColorPicker
                    codeColor={{
                      hsl: tinycolor(selectedCategory.backgroundColor).toHsl(),
                      hsv: tinycolor(selectedCategory.backgroundColor).toHsv(),
                      rgb: tinycolor(selectedCategory.backgroundColor).toRgb(),
                    }}
                    onChange={(e) => {
                      dataSets[i].backgroundColor = e.hex;
                      dataSets[i].borderColor = e.hex;
                    }}
                  ></CustomColorPicker>
                )}
              </Stack>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Grid container gap={'16px'} padding={'0px 64px 64px 64px'} flexWrap={'nowrap'}>
            <Grid item xl={6} lg={6} sm={12} md={6}>
              <Button variant="outlined" fullWidth onClick={onCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid item xl={6} lg={6} sm={12} md={6}>
              <Button fullWidth onClick={onCancel}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
          {/* <Stack direction={'row'} gap="16px" padding={'0px 64px'}> */}
          {/* </Stack> */}
        </DialogActions>
      </Dialog>
    );
  }, [dataSets, openDialog, selectedCategory]);
  return renderMain;
};
export default DialogColorPicker;
