import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserAvatar from "components/UserAvatar";
import { Grid, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from '@reach/router';
import { utils } from 'react-dappify';

const { formatAddress } = utils.format;

const UserProfileMini = ({ profile = {} }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Grid container direction="row" justify="left" spacing={1}>
            <Grid item>
                <UserAvatar user={profile} />
            </Grid>
            <Grid item>  
                <Grid container direction="column" justify="left" spacing={1}>
                    <Grid item sx={{ 
                        fontSize: "16px", 
                        fontWeight: '600',
                        "&:hover": {
                            color: theme.palette.primary.main,
                            cursor: 'pointer'
                        }
                    }} 
                    onClick={() => navigate(`/profile/${profile.wallet}`)}>
                        <Typography fontWeight="900">
                            {profile.username}
                        </Typography>
                        <Typography fontWeight="400" sx={{ opacity: 0.75 }}>
                            {formatAddress(profile.wallet)}
                        </Typography>
                    </Grid>
                </Grid>                             
            </Grid>
        </Grid>
    );
  };

export default UserProfileMini;