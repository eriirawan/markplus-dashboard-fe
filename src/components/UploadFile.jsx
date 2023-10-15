import { useCallback } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';

import MPlusIcon from '@/components/Icon';

const styles = {
  container: {
    // backgroundColor: 'primary.100',
    borderColor: 'primary.main',
    borderRadius: 2,
    borderStyle: 'dashed',
    borderWidth: 1,
    // height: '100%',
  },
  dropDescription: { color: 'neutral.greyScale02', pt: '13px', whiteSpace: 'pre' },
  dropTitle: { color: 'text.primary', fontSize: 22, fontWeight: 700 },
  wrapperDrop: { py: 4 },
  wrapperText: { pt: 1 },
};

const UploadDropZone = ({ handleSave, isHaveFile, acceptedType, maxSize, noDisplay, children, disabled }) => {
  const onDropAccepted = useCallback((acceptedFiles) => {
    handleSave(acceptedFiles);
  }, []);

  const onDropRejected = useCallback((rejectedFiles) => {
    handleSave(rejectedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedType,
    disabled,
    maxSize,
    multiple: false,
    noDrag: noDisplay,
    onDropAccepted,
    onDropRejected,
  });

  if (noDisplay) {
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {children}
      </div>
    );
  }

  return (
    <Box sx={{ ...styles.container, width: isHaveFile ? 'auto' : '100%' }}>
      <Box component="div" {...getRootProps()} sx={isHaveFile ? { px: 8, py: 10 } : styles.wrapperDrop}>
        <input {...getInputProps()} />
        <Stack direction="row" justifyContent="center" spacing={2}>
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
      </Box>
    </Box>
  );
};

UploadDropZone.defaultProps = {
  acceptedType: {
    'image/png': [],
    'image/jpg': [],
    'image/jpeg': [],
    'video/mp4': [],
    'audio/mp3': [],
  },
  maxSize: 2000000,
  noDisplay: false,
};

export default UploadDropZone;
