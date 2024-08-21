import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, InputAdornment, Stack, TextField, Badge, Avatar, List, ListItem, ListItemAvatar, ListItemText, Popover, Card, CardContent, CardMedia } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Container, styled } from '@mui/system';
import MusicCards from './common/MusicCard';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Track, Album } from '../models/ViewModel';
import ApiService from '../service/ApiService';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AnimatedBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  transition: 'width 0.3s ease',
}));


const MainContent: React.FC = () => {
  const apiService = new ApiService();

  const [recently, setRecently] = useState<Track[]>([]);
  const [recommend, setRecommend] = useState<Album[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  //Search box
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchClick = () => {
    setShowInput(true);
  };

  const handleBlur = () => {
    if (searchValue === '') {
      setShowInput(false);
    }
  };

  //Notification popover
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotiClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  // Toggle favorite status
  const handleFavoriteClick = (trackId: string) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [trackId]: !prevFavorites[trackId],
    }));
  };

  //Get Recently
  const getRecentlyPlaySongs = async () => {
    try {
      const res = await apiService.getRecentlyPlaySongs();
      if (res) {
        setRecently(res);
      }
    } catch (error) {
      console.log("Fail to fetch recently play songs!");
    }

  };

  //Get Recommend
  const getRecommendSongs = async () => {
    try {
      const res = await apiService.getRecommendedSongs();
      if (res) {
        setRecommend(res);
      }
    } catch (error) {
      console.log("Fail to fetch recommend songs!");
    }

  };

  useEffect(() => {
    getRecentlyPlaySongs();
    getRecommendSongs();
  }, []);

  return (
    <Box sx={{ flex: 1, padding: 3 }}>
      {/* Search and notification */}
      <Stack direction="row" justifyContent="space-between">

        <AnimatedBox sx={{ width: showInput ? '400px' : '40px' }}>
          {!showInput ? (
            <IconButton onClick={handleSearchClick}>
              <SearchOutlinedIcon />
            </IconButton>
          ) : (
            <TextField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={handleBlur}
              autoFocus
              placeholder="Search for songs, artists, albums"
              variant="outlined"
              size="small"
              sx={{
                flexGrow: 1,
              }}

            />
          )}

        </AnimatedBox>

        <Badge badgeContent={3} color="primary" onClick={handleNotiClick}>
          <NotificationsNoneOutlinedIcon color="action" />
        </Badge>

      </Stack>

      {/* Music card */}
      <MusicCards />

      {/* Content Section */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>

        {/* Recently Play */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom>
            Recently Played
          </Typography>

          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {recently.map((track) => (
              <ListItem
                key={track.id}
                sx={{
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Grid container alignItems="center">
                  <Grid item>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          backgroundColor: '#e0e0e0',
                          transition: 'background-color 0.3s ease',
                          '&:hover': { backgroundColor: '#d0d0d0' },
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                            '&:hover': { opacity: 1 },
                          }}
                        >
                          <PlayArrowIcon sx={{ fontSize: 40, color: '#fff' }} />
                        </Box>
                      </Avatar>
                    </Box>
                  </Grid>

                  <Grid item xs>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000', marginLeft: '16px' }}>
                      {track.title}
                    </Typography>
                  </Grid>

                  <Grid item xs>
                    <Typography variant="body2" sx={{ color: '#888' }}>
                      {track.artist}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="body2" sx={{ color: '#888', marginRight: '16px' }}>
                      {track.duration}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {
                      favorites[track.id] ?
                        <IconButton
                          onClick={() => handleFavoriteClick(track.id)}
                        >
                          <FavoriteIcon style={{color: "#E22A7F"}} />
                        </IconButton>
                        :
                        <IconButton
                          onClick={() => handleFavoriteClick(track.id)}
                        >
                          <FavoriteBorderIcon />
                        </IconButton>
                    }
                  </Grid>

                  <Grid item>
                    <IconButton>
                      <MoreHorizIcon sx={{ color: '#888' }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Recommend for you */}
        <Grid item xs={6}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Recommended For You
          </Typography>

          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              // padding: 2,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none', /* IE and Edge */
              'scrollbar-width': 'none', /* Firefox */
            }}
          >
            {recommend.map((album, index) => (
              <Box
                key={index}
                sx={{
                  width: 180,
                  height: 250,
                  position: 'relative',
                  marginRight: 2,
                  '&:hover .overlay': {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="div"
                  image={album.thumbImg}
                  sx={{
                    backgroundColor: '#e0e0e0',
                    height: 170,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '8px',
                    position: 'relative',
                  }}
                >
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <PlayArrowIcon sx={{ fontSize: 40, color: '#fff' }} />
                  </Box>
                </CardMedia>

                <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#000', mt: 2 }}>
                  {album.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#888' }}>
                  {album.artist}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>


      {/* Notification Popover */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ width: '300px' }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Maria"
                src="https://via.placeholder.com/40"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  Maria likes your playlist{' '}
                  <Typography component="span" fontWeight="bold">
                    XD 4 Life.
                  </Typography>
                </>
              }
              secondary="2m"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Jasmine"
                src="https://via.placeholder.com/40"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  Jasmine is currently listening to{' '}
                  <Typography component="span" fontWeight="bold">
                    Best of Blues.
                  </Typography>
                </>
              }
              secondary="1hr"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                alt="Marc"
                src="https://via.placeholder.com/40"
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  Marc liked your playlist{' '}
                  <Typography component="span" fontWeight="bold">
                    Booping at Adobe.
                  </Typography>
                </>
              }
              secondary="5hr"
            />
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};

export default MainContent;
