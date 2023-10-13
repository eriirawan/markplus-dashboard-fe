import React, { useMemo, memo } from 'react';
import {
  Dialog,
  Stack,
  Typography,
  Radio,
  IconButton,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  FormControl,
  styled,
} from '@mui/material';
import { CancelOutlined, Close } from '@mui/icons-material';

const DialogForm = ({ open, setOpen, option, children, onSave }) => {
  const renderMain = useMemo(() => {
    return (
      <Dialog
        open={open}
        sx={{ minWidth: '656px' }}
        PaperProps={{ style: { minWidth: '656px' } }}
        onClose={() => setOpen((prev) => !prev)}
      >
        <Stack direction={'column'} padding="64px" minWidth={'656px'} sx={{ overflowX: 'hidden' }}>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            // padding={'64px'}
            // paddingTop={'32px'}
            // maxWidth={'656px'}
            minWidth={'528px'}
            marginBottom={'24px'}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '30px', lineHeight: '39px' }}>Choose Client</Typography>
            <IconButton
              aria-label="close"
              onClick={() => setOpen((prev) => !prev)}
              // aria-label="delete"
              sx={{ border: 1.5, color: 'primary.main', height: '44px', width: '44px' }}
              // sx={{

              //   color: (theme) => theme.palette.grey[500],
              // }}
            >
              <Close />
            </IconButton>
          </Stack>
          {/* <DialogContent> */}
          {/* <Grid container> */}
          {/* <Grid item xl={12}> */}
          {children}
          {/* <FormControl variant="standard">
            <RadioGroup aria-labelledby="demo-error-radios" name="quiz" value={''} onChange={() => {}}>
              {option?.map((el) => (
                <FormControlLabel
                  value={el.value}
                  control={<Radio sx={{ p: 2 }} />}
                  label={<Typography sx={{}}>{el.label} </Typography>}
                />
              ))}
            </RadioGroup>
          </FormControl> */}
          {/* </Grid> */}
          {/* <Grid item xl={12}> */}
          {[].map((container, index) => {
            return (
              <Stack
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                minWidth={'528px'}
                padding={'16px'}
                // columnGap="32px"
                rowGap="32px"
                flexWrap={'nowrap'}
                flexDirection={'row'}
                onClick={(e) => setSelectedLayout(index)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: (theme) => (index === selectedLayout ? theme.palette.primary.light : '#fff'),
                  '&:hover': {
                    background: (theme) => theme.palette.primary.light,
                  },
                }}
              >
                <Radio
                  sx={{
                    '& .MuiRadio-root.': {
                      padding: '0 !important',
                    },
                  }}
                  checked={index === selectedLayout}
                  value={index}
                  onChange={(e) => {
                    setSelectedLayout(+e.target.value);
                  }}
                />

                {/* <Stack
                  display={'flex'}
                  flexDirection={'row'}
                  sx={{
                    // border: '1px #7E3399 solid',
                    // borderRadius: '10px',
                    width: '100%',
                    // minHeight: '72px',
                    // padding: '16px',
                  }}
                  gap="8px"
                >
                  {container.map((data) => {
                    return (
                      // <Grid container>
                      <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{
                          border: (theme) => `1px ${theme.palette.primary.main} solid`,
                          borderRadius: '10px',
                          width: '100%',
                          maxWidth: getTextLayout(data),
                          minHeight: '72px',
                          padding: '16px',
                        }}
                        gap="8px"
                      >
                        <Typography>{getTextLayout(data)}</Typography>
                      </Box>
                      // </Grid>
                    );
                  })}
                </Stack> */}
              </Stack>
            );
          })}
          {/* <Grid></Grid> */}
          {/* </Grid> */}
          {/* </Grid> */}
          {/* </DialogContent> */}
          <Stack display={'flex'} flexDirection={'row'} marginTop="40px" gap="16px">
            <Button sx={{ width: '50%' }} variant="outlined" onClick={() => setOpen((prev) => !prev)}>
              Cancel
            </Button>
            <Button
              sx={{ width: '50%' }}
              onClick={() => {
                onSave();
                // onSaveLayoutOption();
                // setDashboardContent((prev) => [...prev, sizeLayoutData[selectedLayout]]);
                // setIsLayoutDialogFormOpen(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    );
  }, [open, children]);
  return renderMain;
};

export default memo(DialogForm);
