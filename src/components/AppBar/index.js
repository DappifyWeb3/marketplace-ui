import { useState, cloneElement, Fragment, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";
import { IconButton } from '@mui/material';
import Logo from 'components/Logo';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchBar from 'components/SearchBar';
import NavButton from 'components/AppBar/NavButton';
import Profile from 'components/AppBar/Profile';
import Drawer from 'components/AppBar/Drawer';
import LoadingBar from './LoadingBar';
import { fetchTokenPrice } from "store/actions/thunks/project";
import { useDispatch } from "react-redux";
import { DappifyContext } from 'react-dappify';
import { Chip } from '@mui/material';
import Toast from 'components/Toast';
import { initReactI18next, useTranslation } from "react-i18next";

function ElevationScroll(props) {
  const theme = useTheme();
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: { background: trigger ? theme.palette.background.paper : 'transparent' }
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const ElevateAppBar = (props) => {
  const theme = useTheme();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { verifyNetwork, project } = useContext(DappifyContext);
  const dispatch = useDispatch();
  const { t } = props;

  useEffect(() => {
    verifyNetwork();
  },[verifyNetwork]);

  useEffect(() => {
    dispatch(fetchTokenPrice());
  },[dispatch]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Logo />
              { project?.isTestEnvironment && (<Chip label="testnet" color="info" sx={{ m: 0.5 }}/>)}
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }} />
            <Box sx={{ flexGrow: 3 }}>
              <SearchBar t={t} />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NavButton link="explore" label={t('Explore')} />
              <NavButton link="activity" label={t('Stats')} />
              {/* <Notifications /> */}
              {/* <NavButton link="options" label="Create" /> */}
              <Profile t={t} />
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                sx={{ ml: 1 }}
                size="large"
                aria-label="show more"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon sx={{ color: theme.palette.text.secondary }}/>
              </IconButton>
              <Drawer open={isMobileMenuOpen} onClose={handleMobileMenuClose} />
              <Toast />
            </Box>
          </Toolbar>
          <LoadingBar/>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Fragment>
  );
}

export default ElevateAppBar;
