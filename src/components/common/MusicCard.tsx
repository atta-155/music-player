import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { styled } from '@mui/system';

const GradientCard = styled(Box)(({ theme }) => ({
  width: '500px',
  height: '300px',
  borderRadius: '20px',
  padding: theme.spacing(3),
  color: '#fff',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const GradientContainer = styled(Box)({
  display: 'flex',
  gap: '20px',
  padding: '20px',
  overflowX: 'auto',
  scrollbarWidth: 'none', // For Firefox
  '&::-webkit-scrollbar': {
    display: 'none', // For Chrome, Safari, and Edge
  },
});

const CardContent = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
});

const CardSubContent = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'lighter',
  opacity: 0.8,
});

const PlayButton = styled(IconButton)({
  color: '#fff',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

const MusicCards: React.FC = () => {
  return (
    <GradientContainer>
      <GradientCard
        sx={{
          background: 'linear-gradient(135deg, #FF3CAC 0%, #784BA0 100%)',
        }}
      >
        <Box>
          <Typography variant='h2' sx={{fontWeight: "bold"}}>GET LOST</Typography>
          <Typography variant='h5'>in your music.</Typography>
        </Box>
        <Box>
        <PlayButton>
          <PlayArrowIcon />
        </PlayButton>
        </Box>
      </GradientCard>

      <GradientCard
        sx={{
          background: 'linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)',
        }}
      >
        <Box>
          <Typography variant='h2' sx={{fontWeight: "bold"}}>MELLOW</Typography>
          <CardSubContent>beats.</CardSubContent>
        </Box>
        <Box>

        <PlayButton>
          <PlayArrowIcon />
        </PlayButton>
        </Box>

      </GradientCard>
    </GradientContainer>
  );
};

export default MusicCards;
