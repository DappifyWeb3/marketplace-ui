// import { useContext } from 'react';
import { useTheme } from "@mui/material/styles";
import { IconButton, Badge} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsNoneTwoTone';
// import { DappifyContext } from 'react-dappify';

export default function ElevateAppBar(props) {
    const theme = useTheme();
    // const { configuration } = useContext(DappifyContext);

return (
    <><IconButton
        size="large"
        aria-label="show 17 new notifications"
    >
        <Badge badgeContent={17} color="primary">
            <NotificationsIcon sx={{ color: theme.palette.text.secondary, opacity: 0.75 }} />
        </Badge>
    </IconButton><IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls={''}
        aria-haspopup="true"
        onClick={() => {}}
        color="inherit"
    >

        </IconButton></>
  );
}