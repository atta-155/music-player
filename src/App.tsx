import React from 'react';
import { Box, Card, CssBaseline } from '@mui/material';
import MainContent from './components/MainContent';
import MusicPlayer from './components/MusicPlayer';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <Box sx={(theme) => ({display: 'flex', flexDirection: 'column',  backgroundColor: theme.palette.primary.main })}>
      <CssBaseline />
      <Card elevation={4} sx={{ display: 'flex', flex: 1, mb: 2,borderRadius: '0 0 64px 64px' }}>
        <Sidebar />
        <MainContent />
      </Card>
      <MusicPlayer />
    </Box>
  );
};

export default App;
