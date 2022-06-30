import { useContext } from 'react';
import { Chip, CircularProgress, Grid, Button } from '@mui/material';
import { DappifyContext, constants } from 'react-dappify';
import { useNavigate } from '@reach/router';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ModalActions = ({ state, onClose, handleAction, t, confirmLabel, loading }) => {
    const { isAuthenticated, isRightNetwork, configuration, switchToChain, getProviderInstance } = useContext(DappifyContext);
    const navigate = useNavigate();
    const network = constants.NETWORKS[configuration.chainId];

    const authOptionsRightNetwork = isAuthenticated && isRightNetwork && (
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
    )

    const renderNetwork = () => {
        const name = network?.chainName;
        const color = isRightNetwork ? 'success' : 'warning';
        const icon = isRightNetwork ? (<CheckCircleOutlineIcon />) : (<ErrorOutlineIcon />);
        const prefix = isRightNetwork ? t('Connected to:') : t('Switch to:');
        return (
            <Grid container sx={{ mt: 3 }}>
                <Button onClick={goToNetwork}
                        variant="contained" 
                        fullWidth
                        color={color}
                        deleteIcon={icon} 
                >
                    {`${prefix} ${name}`} 
                </Button>
            </Grid>
        );
    }

    const goToNetwork = async () => {
        const currentProvider = await getProviderInstance();
        await switchToChain(configuration, currentProvider);
    }

    const noAuth = !isAuthenticated && (
        <Grid container sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={() => {
                navigate(`/${process.env.REACT_APP_TEMPLATE_NAME}/wallet`);
            }} fullWidth>
                {t('Connect your wallet')}
            </Button>
        </Grid>
    )

    return (
        <div>
            {authOptionsRightNetwork}
            {noAuth}
            {isAuthenticated && !isRightNetwork && renderNetwork()}
        </div>
    );
  };
  
  export default ModalActions;
