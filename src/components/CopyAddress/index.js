import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Typography, Grid, IconButton } from '@mui/material';

const CopyAddress = function({ user }) {

    const addressToClipboard = (e) => {
        e.preventDefault();
        const copied = user.wallet;
        navigator.clipboard.writeText(copied).then(function() {
        // // console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
        console.error('Async: Could not copy text: ', err);
        });
    };

    const formatAddress = (text) =>  `${text?.substr(0, 14)}...${text?.substr(-4)}`;

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item>
                <Typography sx={{ mt: 0.5 }} fontSize="1em" fontWeight="400" color="text.secondary">{formatAddress(user?.wallet)}</Typography>
            </Grid>
            <Grid item>
                <IconButton onClick={addressToClipboard}>
                    <ContentCopyIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
export default CopyAddress;
