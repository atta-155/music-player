import React, { useEffect, useState } from 'react';
import { Box, IconButton, Slider, Typography, Avatar, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ApiService from '../service/ApiService';
import { Track } from '../models/ViewModel';

const MusicPlayer: React.FC = () => {
    const apiService = new ApiService();
    const trackIDList = ["32793500", "32793501", "32793502", "32793503", "32793504", "32793505", "32793506"];

    const [current, setCurrent] = useState<Track>();
    let [trackIdCount, setTrackIdCount] = useState<number>(0);

  //Get Current
  const getCurrentPlay = async (trackId: string) => {
    try {
      const res = await apiService.getCurrentPlay(trackId);
      if (res) {
        setCurrent(res);
      }
    } catch (error) {
      console.log("Fail to fetch current play song!");
    }

  };

  const handleNext = ()=>{
    if(trackIdCount == trackIDList.length){
        setTrackIdCount(0);
        getCurrentPlay(trackIDList[0]);
    }else{
        setTrackIdCount(trackIdCount+1);
        getCurrentPlay(trackIDList[trackIdCount+1]);

    }
  }
  
  const handlePrev = ()=>{
    if(trackIdCount == 0){
        setTrackIdCount(6);
        getCurrentPlay(trackIDList[6]);
    }else{
        setTrackIdCount(trackIdCount-1);
        getCurrentPlay(trackIDList[trackIdCount-1]);

    }
  }
  
  useEffect(() => {
    getCurrentPlay(trackIDList[trackIdCount]);
  }, []);

    return (

        <Stack justifyContent="space-between" alignItems="center" direction="row"
            sx={{
                padding: '20px 20px',
                borderRadius: '10px',
            }}
        >
            {/* Left Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 56, height: 56, backgroundColor: '#ab003c' }}>
                    {/* Replace with Album Art */}
                </Avatar>
                <Box sx={{ marginLeft: '16px' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#fff' }}>
                        {current?.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#ffebee' }}>
                        {current?.artist}
                    </Typography>
                </Box>
                <IconButton sx={{ color: '#fff', marginLeft: '16px' }}>
                    <AddCircleOutlineOutlinedIcon />
                </IconButton>
            </Box>

            {/* Center Section */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ color: '#fff' }}>
                    <ShuffleIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }}  onClick={handlePrev}>
                    <SkipPreviousIcon />
                </IconButton>
                <IconButton
                    sx={{
                        backgroundColor: '#fff',
                        color: '#e91e63',
                        margin: '0 12px',
                        '&:hover': {
                            backgroundColor: '#ffebee',
                        },
                    }}
                >
                    <PlayArrowIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }} onClick={handleNext}>
                    <SkipNextIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }}>
                    <RepeatIcon />
                </IconButton>
            </Box>

            {/* Right Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                <Typography sx={{ color: '#fff', marginRight: '8px' }}>1:39</Typography>
                <Slider
                    defaultValue={30}
                    aria-label="time-indicator"
                    sx={{
                        color: '#fff',
                        flexGrow: 1,
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#fff',
                        },
                    }}
                />
                <Typography sx={{ color: '#fff', marginLeft: '8px' }}>{current?.duration}</Typography>
                <IconButton sx={{ color: '#fff', marginLeft: '16px' }}>
                    <QueueMusicIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }}>
                    <ScreenShareIcon />
                </IconButton>
                <IconButton sx={{ color: '#fff' }}>
                    <VolumeUpIcon />
                </IconButton>
            
                <Slider
                    defaultValue={50}
                    aria-label="Volume"
                    sx={{
                        color: '#fff',
                        width: '200px',
                        '& .MuiSlider-thumb': {
                            backgroundColor: '#fff',
                        },
                    }}
                />
            </Box>
        </Stack>
    );
};

export default MusicPlayer;

