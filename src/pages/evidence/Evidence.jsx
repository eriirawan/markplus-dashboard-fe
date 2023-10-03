import { Box, Paper, Stack, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { getWindowDimensions } from '@/helpers/Utils';
import { appBarHeight } from '@/helpers/Constants';
import MPlusIcon from '@/components/Icon';

const Evidence = () => {
  const location = useLocation();
  const windowDimensions = getWindowDimensions();

  return (
    <>
      <Paper sx={{ display: 'flex', height: windowDimensions.height - (appBarHeight + 10), p: 4 }}>
        <Stack width="100%" height="100%">
          <Typography variant="h2" color="primary.main" textTransform="capitalize">
            {location.pathname.replace(/[^a-z0-9]/g, ' ').trim()} Page
          </Typography>
          <Stack sx={{ overflowY: 'scroll', pt: 2, flex: 1 }}>
            <Stack
              spacing={1}
              direction="row"
              sx={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: 'primary.main',
                p: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  borderWidth: 1.5,
                  borderStyle: 'solid',
                  borderColor: 'primary.main',
                  borderRadius: 1,
                  py: 1,
                  px: 1.3,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MPlusIcon name="Upload" sx={{ fontSize: 28, color: 'primary.main' }} />
              </Box>
              <Stack>
                <Typography variant="h4">
                  Click this area to Upload{' '}
                  <Typography component="span" color="#000000">
                    or drag and drop
                  </Typography>
                </Typography>
                <Typography color="#808080">Upload on Image on PNG, JPG, Video MP4, and Audio MP3 Format</Typography>
              </Stack>
            </Stack>
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Typography color="#000000" variant="h2">
                No evidence attachment created yet
              </Typography>
              <Typography color="#808080" variant="body1" sx={{ mt: 1 }}>
                Click button below to start Upload
              </Typography>
              <Button sx={{ width: 256, mt: 2 }}>Upload File</Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default Evidence;
