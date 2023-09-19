import { Box } from '@mui/material';
import React, { useMemo } from 'react';
import { CustomPicker } from 'react-color';
import { Alpha, Hue, Saturation } from 'react-color/lib/components/common';

const CustomColorPicker = ({ codeColor, onChange }) => {
  const inlineStyles = {
    container: {
      boxShadow: '4px 4px 4px 0px #00000040',
      display: 'flex',
      height: 'auto',
      width: '100vw',
      maxWidth: '332px',
      textAlign: 'center',
      // justifyContent: 'center',
      backgroundColor: 'white',
      padding: '20px',
      gap: '8px',
      borderRadius: '10px',
      // margin: "auto"
    },
    pointer: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: 'rgb(248, 248, 248)',
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.37)',
    },
    slider: {
      width: '38px',
      borderRadius: '4px',
      height: '8px',
      boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
      background: '#fff',
      // transform: 'translateX(-2px)',
      border: '1px solid #000000',
    },
    saturation: {
      width: '100%',
      maxWidth: '200px',
      height: '100%',
      maxHeight: '200px',
      paddingBottom: '68%',
      position: 'relative',
      overflow: 'hidden',
    },
    swatchCircle: {
      minWidth: 20,
      minHeight: 20,
      margin: '1px 2px',
      cursor: 'pointer',
      boxShadow: '0 0 2px rgba(0, 0, 0, .6)',
      borderRadius: '50%',
    },
  };
  const CustomSlider = () => {
    return <div style={{ ...inlineStyles.slider, transform: 'translateX(0px)' }} />;
  };
  const CustomSliderAlpha = () => {
    return <div style={{ ...inlineStyles.slider, transform: 'translateX(-3px)' }} />;
  };
  const renderMain = useMemo(() => {
    return (
      <div style={inlineStyles.container}>
        <Box sx={{ width: '38px', height: '200px', position: 'relative', transform: 'rotate(-180deg)' }}>
          <Alpha
            rgb={codeColor.rgb}
            // hsv={codeColor.hsv}
            pointer={CustomSliderAlpha}
            direction="vertical"
            // pointer={CustomPointer}
            onChange={onChange}
          />
        </Box>
        <div style={inlineStyles.saturation}>
          <Saturation
            hsl={codeColor.hsl}
            hsv={codeColor.hsv}
            // pointer={CustomPointer}
            onChange={onChange}
          />
        </div>
        <Box sx={{ width: '38px', height: '200px', position: 'relative', transform: 'rotate(-180deg)' }}>
          <Hue
            hsl={codeColor.hsl}
            // hsv={codeColor.hsv}
            pointer={CustomSlider}
            direction="vertical"
            // pointer={CustomPointer}
            onChange={onChange}
          />
        </Box>
      </div>
    );
  }, [codeColor, onChange]);
  return renderMain;
};

export default CustomPicker(CustomColorPicker);
