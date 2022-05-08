
import { Alert, Grid,  Typography } from '@mui/material';

const Verification = ({ nft, t }) => {

    const verifiedWarning = nft && nft.owner && (
        <Grid item xs={12} sx={{ mt: 2 }}>
            {!nft.owner.verified && (
                <Alert severity="warning">
                    <Typography variant="body">{t('Owner not verified')}</Typography>
                </Alert>
            )}
            {nft.owner.verified && (
                <Alert severity="success">
                    <Typography variant="body">{t('Owner verified')}</Typography>
                </Alert>
            )}
        </Grid>
    );

    return <Grid item xs={12}>{verifiedWarning}</Grid>;
  };
  
  export default Verification;
