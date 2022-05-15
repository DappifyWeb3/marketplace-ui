import { useState, useEffect, useContext } from 'react';
import { Alert, Grid, Typography } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import constants from 'react-dappify/constants';

const OperationResult = ({state, t}) => {
    const { project } = useContext(DappifyContext);
    const [explorerUrl, setExploreUrl] = useState();

    useEffect(() => {

        const prepareExplorerUrl = () => {
            const network = project.getNetworkForTemplate('marketplace');
            const networkDetails = constants.NETWORKS[network.chainId];
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
