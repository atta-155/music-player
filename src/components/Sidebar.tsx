import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Menu, MenuItem, Button, IconButton, Stack, Chip, styled, Switch, SwitchProps, ListSubheader } from '@mui/material';
import { Home, MusicNote, PlaylistPlay, TrendingUp } from '@mui/icons-material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import QueueMusicOutlinedIcon from '@mui/icons-material/QueueMusicOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';

const Sidebar: React.FC = () => {
  // Account popover
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const accOpen = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Custom Switch
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));


  return (
    <Box
      sx={{
        width: 280,
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      {/* Account */}
      <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: 2 }}>
        <Avatar src="../assets/avator-icon.jpg" alt="Joshua" />
        <Box sx={{ marginLeft: 2 }} >
          <Stack direction="row" alignItems="center" onClick={handleClick}>
            <Typography variant="h6">Joshua</Typography>
            <KeyboardArrowDownOutlinedIcon />
          </Stack>
          <Chip label="PREMIUM" variant="outlined" size="small" />

        </Box>
      </Box>

      {/* Browse List */}
      <List>
        <ListItem>
          <Typography variant='subtitle2' color="gray">
            BROWSE
          </Typography>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LibraryMusicOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Songs" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <QueueMusicOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Playlists" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Just for you" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <TrendingUp />
          </ListItemIcon>
          <ListItemText primary="Top Charts" />
        </ListItem>
      </List>

      {/* Playlist List */}
      <List>
        <ListItem>
          <Stack justifyContent="space-between" direction="row" sx={{width: "100%"}}>
          <Typography variant='subtitle2' color="gray">
            YOUR PLAYLISTS
          </Typography>
          <AddCircleOutlineOutlinedIcon fontSize='small'/>
          </Stack>
         
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PlaylistPlay />
          </ListItemIcon>
          <ListItemText primary="Workout Mix" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PlaylistPlay />
          </ListItemIcon>
          <ListItemText primary="Chilln' at Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PlaylistPlay />
          </ListItemIcon>
          <ListItemText primary="Booping at Adobe" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PlaylistPlay />
          </ListItemIcon>
          <ListItemText primary="XD 4 life" />
        </ListItem>
        
      </List>



      {/* Account Menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={accOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ width: "400px" }}
      >

        <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ px: 2, py: 1 }}>
          <Chip label="PREMIUM" variant="outlined" color="primary" size="small" />
          <Typography variant="caption" color="text.secondary">
            Through 11/2
          </Typography>
        </Stack>
        <MenuItem onClick={handleClose}>
          <ListItemText>
            Private
          </ListItemText>
          <IOSSwitch sx={{ m: 1 }} checked={false} />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemText>
            Explict Filter
          </ListItemText>
          <IOSSwitch sx={{ m: 1 }} checked={false} />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemText>
            Friend Activity
          </ListItemText>
          <IOSSwitch sx={{ m: 1 }} checked={false} />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemText>
            Account Setting
          </ListItemText>
        </MenuItem>

        <MenuItem sx={{ mt: 2 }}>
          <Stack direction="row" spacing={1} justifyContent="flex-end" style={{ width: "100%" }}>

            <Typography variant='button' color="gray">Logout</Typography>
            <LogoutOutlinedIcon sx={{ color: "gray" }} />
          </Stack>

        </MenuItem>

      </Menu>
    </Box>
  );
};

export default Sidebar;
