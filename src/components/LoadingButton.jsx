import { Box, CircularProgress } from '@mui/joy';

function LoadingButton() {
  return (
    <Box>
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

export default LoadingButton;
