
import { useState, Fragment } from 'react';
import { Chip } from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Logout from '@mui/icons-material/Logout';
import { useContext, useEffect } from 'react';
import { useTheme } from "@mui/material/styles";
import { Avatar, IconButton } from '@mui/material';
import { DappifyContext, utils } from 'react-dappify';
import { fetchCurrentUser } from 'store/actions/thunks';
import * as selectors from 'store/selectors';
import { useDispatch, useSelector } from "react-redux";
import Identicon from 'react-identicons';
import { navigate } from "@reach/router";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CopyAddress from 'components/CopyAddress';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import { constants } from 'react-dappify';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const { cropText } = utils.format;

export default function Profile({ t }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { nativeBalance, logout, isAuthenticated, switchToChain, configuration, getProviderInstance, isRightNetwork } = useContext(DappifyContext);
    const network = constants.NETWORKS[configuration.chainId];
    const currentUserState = useSelector(selectors.currentUserState);
    const currentUser = currentUserState.data || {};
  
    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const imgSize = { width: 40, height: 40 };
    const image = isAuthenticated && currentUser.wallet ? currentUser?.image ? 
        (<Avatar className="fade__in" sx={imgSize} alt={currentUser?.username} src={currentUser?.image} />) :
        (<Identicon string={currentUser.wallet} size={40} bg={theme.palette.primary.main} />) : 
        (<Avatar sx={imgSize} ><AccountCircleTwoToneIcon sx={imgSize}/></Avatar>)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      isAuthenticated ? 
        setAnchorEl(event.currentTarget) :
        navigate('/wallet');
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    }

    const goToNetwork = async () => {
      const currentProvider = await getProviderInstance();
      await switchToChain(configuration, currentProvider);
    }

    const renderNetwork = () => {
      const name = network?.chainName;
      const color = isRightNetwork ? 'success' : 'warning';
      const icon = isRightNetwork ? (<CheckCircleOutlineIcon />) : (<ErrorOutlineIcon />);
      const prefix = isRightNetwork ? t('Connected to:') : t('Switch to:');
      return (
        <Grid container direction="row" justifyContent="center" spacing={2}>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Chip onClick={goToNetwork}
                  onDelete={goToNetwork} 
                  variant="contained" 
                  color={color} 
                  label={`${prefix} ${name}`} 
                  deleteIcon={icon} 
            />
          </Grid>
        </Grid>
      );
    }

    const renderBalance = () => (
      <Grid container direction="row">
        <Grid item>
            <img className="img_symbol" src={constants.LOGO[network.nativeCurrency.symbol]} alt={network.nativeCurrency.symbol} />
        </Grid>
        <Grid item>
            <Grid container direction="column">
                <Typography color="text.secondary" fontSize="0.9em">{t('Balance')}</Typography>
                <Typography fontSize="1.5em" fontWeight="500">{nativeBalance} {network.nativeCurrency.symbol}</Typography>
            </Grid>
        </Grid>
      </Grid>
    );

    return (
      <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2, p: 0}}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  {image}
                </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  p: 1,
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ p: 2 }}>
                  <Grid container direction="column" sx={{ pb: 2}}>
                      <Grid item xs={12}>
                          <Typography fontSize="1.2em" fontWeight="500">{cropText(currentUser.username, 21)}</Typography>
                      </Grid>
                      <Grid>
                          <CopyAddress user={currentUser} />
                      </Grid>
                  </Grid>
                  {renderBalance()}
                  {renderNetwork()}
              </Box>
              <Divider sx={{ my: 1, opacity: 0.15 }}/>
              <MenuItem onClick={() => navigate(`/profile/${currentUser.wallet}`)} sx={{ fontSize:'1em', color: theme.palette.text.secondary }}>
                <ListItemIcon>
                  <Avatar sx={{ height: 28, width: 28 }}>
                    <PersonOutlineIcon/>
                  </Avatar>
                </ListItemIcon>
                {t('My profile')}
              </MenuItem>
              <MenuItem onClick={() => handleLogout()} sx={{ fontSize:'1em', color: theme.palette.text.secondary }}>
                <ListItemIcon>
                  <Avatar sx={{ height: 28, width: 28 }}>
                    <Logout fontSize="small" />
                  </Avatar>
                </ListItemIcon>
                {t('Logout')}
              </MenuItem>
            </Menu>
          </Fragment>
          );
}
