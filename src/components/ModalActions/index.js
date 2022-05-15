import { CircularProgress, Grid, Button } from '@mui/material';


const ModalActions = ({ state, onClose, handleAction, t, confirmLabel, loading }) => {
    return (
        <div>
            { !state.data && (<Grid container spacing={1} sx={{ mt: 3 }}>
                <Grid item xs={6}>
                    <Button variant="outlined" onClick={onClose} fullWidth>{t('Cancel')}</Button>
                </Grid>
                <Grid item xs={6}>
                    {!loading &&(
                        <Button variant="contained" color="primary" onClick={handleAction} fullWidth>
                            {t(confirmLabel)}
                        </Button>
                    )}
                    {loading && (
                        <Button true disabled variant="contained" color="primary" onClick={handleAction} fullWidth>
                            {t('Please wait')} <CircularProgress size={24} sx={{ ml: 2 }} color="inherit" />
                        </Button> 
                    )}
                </Grid>
            </Grid>)}
            { state.data && (<Grid container spacing={1} sx={{ mt: 3 }}>
                <Grid item xs={12}>
                    <Button variant="outlined" onClick={onClose} fullWidth>{t('Close')}</Button>
                </Grid>
            </Grid>)}
        </div>
    );
  };
  
  export default ModalActions;
