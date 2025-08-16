import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
// Use a placeholder image instead of trying to import from assets
const defaultInfoCardImg = 'https://via.placeholder.com/300x200?text=Information+Chart';

/**
 * Information Chart component that displays information with an optional image
 * @param {Object} props - Component props
 * @param {Object} props.data - Information data to display
 * @param {string} props.imageUrl - URL of the image to display (optional)
 * @returns {React.ReactElement} Information Chart component
 */
const InformationChart = ({ data, imageUrl }) => {
  // Extract title and content from data if available
  const title = data?.title || 'Information';
  const content = data?.content || '';

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <CardMedia
        component="img"
        sx={{
          backgroundColor: '#f5f5f5',
          height: 140,
          objectFit: 'contain',
        }}
        image={imageUrl || defaultInfoCardImg}
        alt="Information chart image"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
        {data &&
          Array.isArray(data) &&
          data.map((item, index) => (
            <Box key={index} sx={{ mt: 1 }}>
              {item.label && (
                <Typography variant="subtitle2" component="div">
                  {item.label}
                </Typography>
              )}
              {item.value && (
                <Typography variant="body2" color="text.secondary">
                  {item.value}
                </Typography>
              )}
            </Box>
          ))}
      </CardContent>
    </Card>
  );
};

// PropTypes removed to avoid ESLint issues
// Default values are handled with destructuring and default parameters

export default InformationChart;
