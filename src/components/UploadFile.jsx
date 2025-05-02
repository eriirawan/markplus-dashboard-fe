import { useCallback } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { enqueueSnackbar } from 'notistack';

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

const UploadDropZone = ({
  handleSave,
  isHaveFile,
  acceptedType,
  maxSize,
  noDisplay,
  children,
  disabled,
  maxFiles,
  isMultiple,
}) => {
  const onDropAccepted = useCallback((acceptedFiles) => {
    handleSave(acceptedFiles);
  }, []);

  const onDropRejected = useCallback((rejectedFiles) => {
    if (rejectedFiles?.length > 0) {
      enqueueSnackbar(rejectedFiles?.[0]?.errors?.[0]?.message, {
        variant: 'errorSnackbar',
      });
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: acceptedType,
    disabled,
    maxFiles,
    maxSize,
    multiple: isMultiple,
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
              alignItems: 'center',
              borderColor: 'primary.main',
              borderRadius: 1,
              borderStyle: 'solid',
              borderWidth: 1.5,
              display: 'flex',
              justifyContent: 'center',
              px: 1.3,
              py: 1,
            }}
          >
            <MPlusIcon name="Upload" sx={{ color: 'primary.main', fontSize: 28 }} />
          </Box>
          <Stack>
            <Typography variant="h4">
              Click this area to Upload{' '}
              <Typography component="span" color="#000000">
                or drag and drop
              </Typography>
            </Typography>
            <Typography color="#808080">Upload on Image on PNG, JPG, Video MP4, and Audio MP3 Format</Typography>
            {maxFiles && (
              <Typography
                color="#808080"
                sx={{ fontStyle: 'italic' }}
              >{`${maxFiles} files are the maximum number of files you can drop here`}</Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

UploadDropZone.defaultProps = {
  acceptedType: {
    'audio/mp3': [],
    'image/jpeg': [],
    'image/jpg': [],
    'image/png': [],
    'video/mp4': [],
  },
  maxSize: 2000000,
  noDisplay: false,
};

export default UploadDropZone;
