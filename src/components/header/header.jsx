import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { SetUserContext, UserContext } from '../context/userContext';

const pages = ['מסך שליח', 'מסך מסעדה', 'נתונים']
  const pageMapping = {
    'home': '/',
    'מסך שליח': '/deliveries',
    'מסך מסעדה': '/restaurant',
    'נתונים': '/statistics'
    
  }

const settings = ['Login', 'Profile', 'Signup', 'Logout']
const settingsMapping = {
  'Home': '/',
  'Logout': '/',
  'Login': '/login',
  'Signup': '/Signup',
  'Profile': '/profile'
  
}

function Header() {

    const navigate = useNavigate()

    const user = React.useContext(UserContext)
    const setUser = React.useContext(SetUserContext)
    console.log(user)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (pageName) => {
    navigate(pageMapping[pageName])
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    navigate(settingsMapping[setting])
    if (setting==='Logout'){
      localStorage.removeItem('token')
      setUser(
        {user:{}}
      )
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{background: '#191D88', direction: 'rtl'}} style={{boxShadow: 'none'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Arial',
              fontWeight: 1000,
              letterSpacing: '.3rem',
              color: '#337CCF',
              textDecoration: 'none',
            }}
          >
            שלי
          </Typography>
          <Typography
            variant="h1"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'inerhit',
              fontWeight: 100,
              letterSpacing: '.rem',
              color: '#FFC436',
              textDecoration: 'none',
            }}
          >
            א
          </Typography>
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 15,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Arial',
              fontWeight: 1000,
              letterSpacing: '.3rem',
              color: '#337CCF',
              textDecoration: 'none',
            }}
          >
            ח
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon style={{ fill: 'grey' }}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              style={{color:'#337CCF'}}
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 1,
                   display: 'block',
                   fontWeight: 200,
                   fontFamily: 'Arial', }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <PersonOutlineIcon style={{padding: "1em", fill: '#337CCF' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;