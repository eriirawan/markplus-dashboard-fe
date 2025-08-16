import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, IconButton, Radio, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px

  const renderMain = useMemo(() => {
    return (
      <Dialog
        open={isLayoutModalOpen}
        onClose={() => setIsLayoutModalOpen((prev) => !prev)}
        fullWidth
        maxWidth={isMobile ? false : 'md'}
        minWidth={isMobile ? '655px' : '100%'}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : '656px',
            minWidth: isMobile ? '100%' : '656px',
            m: isMobile ? 0 : 'auto', // remove margin on mobile
            borderRadius: isMobile ? 0 : 2, // flat edges on mobile if you like
          },
        }}
        sx={{
          '& .MuiDialog-container': {
            alignItems: isMobile ? 'flex-start' : 'center', // stick to top on mobile
          },
        }}
      >
        <Stack
          direction="column"
          padding={isMobile ? 2 : 8}
          sx={{
            overflowX: 'hidden',
            width: '100%',
            height: isMobile ? '100vh' : 'auto', // full height only on mobile
            boxSizing: 'border-box',
            minHeight: isMobile ? '100vh' : 'auto', // full height only on mobile
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography fontWeight={700} fontSize="30px" sx={{ sm: {} }} lineHeight="39px">
              Choose Layout
            </Typography>
            <IconButton
              aria-label="close"
              onClick={() => setIsLayoutModalOpen((prev) => !prev)}
              sx={{
                border: 1.5,
                color: 'primary.main',
                height: 44,
                width: 44,
              }}
            >
              <Close />
            </IconButton>
          </Stack>

          {sizeLayoutData.map((container, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              p={2}
              mb={2}
              onClick={() => setSelectedLayout(index)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  background: (theme) => theme.palette.primary.light,
                },
              }}
            >
              <Radio
                checked={index === selectedLayout}
                value={index}
                onChange={(e) => setSelectedLayout(+e.target.value)}
              />
              <Stack direction="row" gap={1} flex={1}>
                {container.map((data, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      border: (theme) => `1px solid ${theme.palette.primary.main}`,
                      borderRadius: 2,
                      width: '100%',
                      maxWidth: getTextLayout(data),
                      minHeight: 72,
                      p: 2,
                    }}
                  >
                    <Typography>{getTextLayout(data)}</Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          ))}

          <Stack direction="row" mt={5} gap={2}>
            <Button sx={{ flex: 1 }} variant="outlined" onClick={() => setIsLayoutModalOpen((prev) => !prev)}>
              Cancel
            </Button>
            <Button sx={{ flex: 1 }} onClick={onSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    );
  }, [isLayoutModalOpen, selectedLayout, isMobile]);

  return renderMain;
};

export default ModalLayout;
