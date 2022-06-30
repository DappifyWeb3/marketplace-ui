import React, { memo, useContext } from 'react';
import { DappifyContext, constants, utils } from 'react-dappify';
import { Grid, Typography } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from '@reach/router';
import UserAvatar from 'components/UserAvatar';

const { cropText, formatAddress } = utils.format;

//react functional component
const UserSales = ({ user, index }) => {
    const { configuration } = useContext(DappifyContext);
    const network = constants.NETWORKS[configuration.chainId];
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <>
            <Grid container direction="row" justify="left" spacing={1}>
                <Grid item className="avatar__index">
                    {index + 1}.
                </Grid>
                <Grid item>
                    <UserAvatar user={user} />
                </Grid>
                <Grid item>  
                    <Grid container direction="column" justify="left" spacing={1}>
                        <Grid item>
                            <Typography fontWeight="900"   
                                        sx={{ 
                                            fontSize: "16px", 
                                            fontWeight: '600',
                                            "&:hover": {
                                                color: theme.palette.primary.main,
                                                cursor: 'pointer'
                                            }
                                        }} 
                                        onClick={() => navigate(`/${process.env.REACT_APP_TEMPLATE_NAME}/profile/${user.wallet}`)}>
                                {user.username && cropText(user.username, 12)}
                                {!user.username && formatAddress(user.wallet)}
                            </Typography>
                            <Typography sx={{ 
                                fontSize: "14px", 
                                opacity: 0.7, 
                                fontWeight: '400' 
                            }}>
                                {user.totalSales.toFixed(3)} {network?.nativeCurrency?.symbol}
                            </Typography>
                        </Grid>
                    </Grid>                             
                </Grid>
            </Grid>
        </>     
    );
};

export default memo(UserSales);
