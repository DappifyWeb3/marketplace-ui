import { useState, useEffect, useContext } from 'react';
import { Alert, Grid, Typography, Button } from '@mui/material';
import { DappifyContext, constants } from 'react-dappify';

const OperationResult = ({state, t}) => {
    const { project, configuration } = useContext(DappifyContext);
    const [explorerUrl, setExploreUrl] = useState();

    useEffect(() => {

        const prepareExplorerUrl = () => {
            const networkDetails = constants.NETWORKS[configuration.chainId];
            const explorerBase = networkDetails.blockExplorerUrls[0];
            setExploreUrl(`${explorerBase}/tx/${state.data}`);
        }

        prepareExplorerUrl();
    }, [project, state]);

    const isTxCompleted = state.loadFailed || state.data;
    const errorState = state.loadFailed && (
        <Alert severity="error">
            <Typography variant="body">
                {t(state.error)}
            </Typography>
        </Alert>
    );

    const successState = !state.loadFailed && state.data && (
        <Alert severity="success">
            <Typography variant="body">
                <a href={explorerUrl} target="_blank" rel="noreferrer">{t('Transaction successful')}</a>
                <Button sx={{ height: 15 }} href={explorerUrl} target="_blank" rel="noreferrer">{t('View in explorer')}</Button>
            </Typography>
        </Alert>
    );

    return isTxCompleted && (
        <Grid item xs={12}>
            {errorState}
            {successState}
        </Grid>);
  };
  
  export default OperationResult;
