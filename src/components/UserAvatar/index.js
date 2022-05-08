import React, { memo } from 'react';
import { Avatar, Grid, Badge, Box } from '@mui/material';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from '@reach/router';
import Identicon from 'react-identicons';

const UserAvatar = ({ user, size=50 }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const badgeStyle = { "& .MuiBadge-badge": { fontSize: size/6, minHeight: size/4, minWidth: size/4, borderRadius: 50, color: 'white', cursor: 'pointer' } };
    const avatar = (
        <Avatar className="author_list_pp onStep fadeIn" 
            alt={user.username} 
            src={user.image}
            onClick={() => navigate(`/profile/${user.id}`)}
            sx={{ 
                width: size, 
                height: size,
                "& img": {
                    minHeight: size
                },
                "&:hover img": {
                    border: `5px solid ${theme.palette.primary.main}`,
            }}}
        />
    );

    const avatarVerified = (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            color="info"
            badgeContent="✓"
            sx={badgeStyle}
        >
            {avatar}
        </Badge>
    );

    const identicon = (
        <Box onClick={() => navigate(`/profile/${user.id}`)}
            sx={{ 
                cursor: 'pointer',
                "&:hover canvas": {
                    border: `5px solid ${theme.palette.primary.main}`
                }
            }
        }>
            <Identicon string={user.wallet} size={size} bg={theme.palette.primary.main} />
        </Box>
    );

    const verifiedIdenticon = (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            color="info"
            badgeContent="✓"
            sx={badgeStyle}
        >
            {identicon}
        </Badge>
    );

    return (
        <Grid item className="onStep fadeIn" sx={{ height: `${size}px`, width: `${size}px`, p:0 }}>
            {!user.image && !user.verified && identicon}
            {!user.image && user.verified && verifiedIdenticon}
            {user.image && !user.verified && avatar}
            {user.image && user.verified && avatarVerified}
        </Grid>
    );
};

export default memo(UserAvatar);
