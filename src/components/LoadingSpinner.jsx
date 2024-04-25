import { Box, CircularProgress } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress
        size={80}
        sx={{
          translateX: '-10px',
          translateY: '-10px',
        }}
      />
    </Box>
  );
}

export default LoadingSpinner;
