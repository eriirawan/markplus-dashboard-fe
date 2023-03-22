import { useEffect, useRef } from 'react';
import { Backdrop, Stack } from '@mui/material';
import Lottie from 'lottie-react';
import loadingSample from '@/assets/lottie/loading-sample.json';

const Loading = ({ open }) => {
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current && open) {
      // @ts-ignore
      lottieRef.current.goToAndPlay(0, true);
    }
  }, [open]);

  return (
    <Backdrop
      sx={{ backgroundColor: 'rgba(255,255,255,0.7)', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Stack alignItems="center" justifyContent="center">
        <Lottie lottieRef={lottieRef} animationData={loadingSample} loop />
      </Stack>
    </Backdrop>
  );
};

export default Loading;
