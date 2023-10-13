import { CancelOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, IconButton, Radio, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
const ModalLayout = ({
  isLayoutModalOpen,
  setIsLayoutModalOpen,
  sizeLayoutData,
  selectedLayout,
  setSelectedLayout,
  getTextLayout,
  onSave,
}) => {
  const renderMain = useMemo(() => {
    return (
      <Dialog
        open={isLayoutModalOpen}
        sx={{ minWidth: '656px' }}
        PaperProps={{ style: { minWidth: '656px' } }}
        onClose={() => setIsLayoutModalOpen((prev) => !prev)}
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
            <Typography sx={{ fontWeight: 700, fontSize: '30px', lineHeight: '39px' }}>Choose Layout</Typography>
            <IconButton
              aria-label="close"
              onClick={() => setIsLayoutModalOpen((prev) => !prev)}
              sx={{
                // position: 'absolute',
                // right: 8,
                // top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CancelOutlined />
            </IconButton>
          </Stack>
          {/* <DialogContent> */}
          {/* <Grid container> */}
          {/* <Grid item xl={2}>
                <RadioGroup aria-labelledby="demo-error-radios" name="quiz" value={''} onChange={() => {}}>
                  <FormControlLabel value="best" control={<Radio />} />
                  <FormControlLabel value="worst" control={<Radio />} />
                  <FormControlLabel value="worst" control={<Radio />} />
                  <FormControlLabel value="worst" control={<Radio />} />
                  <FormControlLabel value="worst" control={<Radio />} />
                </RadioGroup>
              </Grid> */}
          {/* <Grid item xl={12}> */}
          {sizeLayoutData.map((container, index) => {
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
                <Stack
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
                </Stack>
              </Stack>
            );
          })}
          <Stack display={'flex'} flexDirection={'row'} marginTop="40px" gap="16px">
            <Button sx={{ width: '50%' }} variant="outlined" onClick={() => setIsLayoutModalOpen((prev) => !prev)}>
              Cancel
            </Button>
            <Button
              sx={{ width: '50%' }}
              onClick={() => {
                onSave();
                // setDashboardContent((prev) => [...prev, sizeLayoutData[selectedLayout]]);
                // setIsLayoutModalOpen(false);
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    );
  }, [isLayoutModalOpen, selectedLayout]);
  return renderMain;
};
export default ModalLayout;
