import { useContext } from 'react';
// import { useTheme } from "@mui/material/styles";
import {  Drawer, Box, List, ListItemIcon, ListItemText, Divider, ListItem } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import SearchIcon from '@mui/icons-material/Search';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { navigate } from '@reach/router';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function DrawerMenu({ open=false, onClose }) {
    // const theme = useTheme();
    const { isAuthenticated, logout } = useContext(DappifyContext);

    const handleClose = async () => {
        await logout();
        navigate('/');
        onClose();
    }

    const handleGoTo = (path) => {
        navigate(path);
        onClose();
    }

    return (
        <Drawer
        anchor={'top'}
        open={open}
        sx={{ marginTop: 20 }}
        onClose={onClose}
        >
        <Box
        sx={{ width: 'auto' }}
        role="presentation"
        onClick={() => {}}
        onKeyDown={() => {}}
      >
        <List>
            <ListItem button onClick={() => handleGoTo('/explore')}>
                <ListItemIcon>
                    <SearchIcon />
                </ListItemIcon>
                <ListItemText primary="Explore" />
            </ListItem>
            <ListItem button onClick={() => handleGoTo('/activity')}>
                <ListItemIcon>
                    <AutoGraphIcon />
                </ListItemIcon>
                <ListItemText primary="Stats" />
            </ListItem>
            {/*<ListItem button onClick={() => handleGoTo('/options')}>
                <ListItemIcon>
                    <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Create" />
    </ListItem>*/}
        </List>
        <Divider />
        {isAuthenticated && (
            <List>
                <ListItem button onClick={() => handleGoTo('/profile')}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={'My profile'} />
                </ListItem>
                <ListItem button onClick={() => handleClose()}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>
            </List>
        )}
        {!isAuthenticated && (
            <List>
                <ListItem button onClick={() => handleGoTo('/wallet')}>
                    <ListItemIcon>
                        <AccountBalanceWalletIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Connect Wallet'} />
                </ListItem>
            </List>
        )}
      </Box>
        </Drawer>
    );
}



