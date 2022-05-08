import { useState, useEffect, useContext } from 'react';
import { CircularProgress, Grid, Dialog, DialogContent, Button, DialogTitle, DialogContentText, Typography, Input, FormControl, InputAdornment } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import { editPriceNft } from "store/actions/thunks";
import OperationResult from 'components/OperationResult';
import ConfirmationWarning from 'components/ConfirmationWarning';
import * as actions from 'store/actions';

const ModalEdit = ({ isOpen=false, onClose, isBid, nft, t }) => {
    const dispatch = useDispatch();
    const nftEditState = useSelector(selectors.nftEditState);
    const isEditing = nftEditState.loading;
    const {configuration, project } = useContext(DappifyContext);
    const network = project?.getNetworkContext('marketplace');
    const priceOver = configuration?.feature?.bids?.priceOver;
    const maxBid = nft?.maxBid || 0;
    const [amount, setAmount] = useState();

    const getToken = () => `${nft?.metadata?.name} #${nft.tokenId}`;

    useEffect(() => {
        dispatch(actions.editPriceNft.cancel());
    },[isOpen])

    useEffect(() => {
        const initialAmount = isBid ? (maxBid + priceOver) : nft.price;
        setAmount(initialAmount);
    // eslint-disable-next-line no-use-before-define
    }, [isBid, nft]);


    const handleAction = async() => {
        await dispatch(editPriceNft(nft, amount));
    }
    const getOperationTitle = () => isBid ?  (<Typography variant="h5">Your bid</Typography>) : null;

    const handleAmountChange = (e) => setAmount(parseFloat(e.target.value));

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
        <DialogTitle>
            {t('Edit pricing')}
        </DialogTitle>
            <DialogContent className="content__modal">
                <DialogContentText>
                    {t('Edit confirmation', {
                        name: getToken()
                    })}
                </DialogContentText>
                <FormControl variant="standard" fullWidth>
                    <Input
                    id="standard-adornment-weight"
                    value={amount}
                    onChange={handleAmountChange}
                    endAdornment={<InputAdornment position="end">{network.nativeCurrency.symbol}</InputAdornment>}
                    aria-describedby="standard-amount-helper-text"
                    type="number"
                    inputProps={{
                        'aria-label': 'amount'
                    }}
                    />
                    <Grid container spacing={2} sx={{ pt: 2 }}>
                        {isEditing && (<ConfirmationWarning t={t} />)}
                        <OperationResult state={nftEditState} t={t} />
                    </Grid>
                    <Grid container spacing={1} sx={{ mt: 3 }}>
                        <Grid item xs={6}>
                            <Button variant="outlined" onClick={onClose} fullWidth>{t('Cancel')}</Button>
                        </Grid>
                        <Grid item xs={6}>
                            {!isEditing && (
                                <Button variant="contained" color="primary" onClick={handleAction} fullWidth>
                                    {t('Confirm')}
                                </Button>
                            )}
                            {isEditing && (
                                <Button true disabled variant="contained" color="primary" onClick={handleAction} fullWidth>
                                    {t('Please wait')} <CircularProgress size={24} sx={{ ml: 2 }} color="inherit" />
                                </Button> 
                            )}
                        </Grid>
                    </Grid>
                </FormControl>
            </DialogContent>
        </Dialog>
    );
  };
  
  export default ModalEdit;
