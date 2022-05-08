import { Alert, Grid, Typography } from '@mui/material';

const ConfirmationWarning = ({t}) => {

    return (
        <Grid item xs={12}>
            <Alert severity="info">
                <Typography variant="body">{t('Please do not close this window')}</Typography>
            </Alert>
        </Grid>);
  };
  
  export default ConfirmationWarning;
