import { useContext, useState } from 'react';
import { TextField, Grid, Dialog, DialogContent, DialogTitle, DialogContentText, Typography } from '@mui/material';
import { DappifyContext, constants } from 'react-dappify';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import { purchaseNft } from "store/actions/thunks";
import Verification from 'components/Verification';

import OperationResult from 'components/OperationResult';
import ConfirmationWarning from 'components/ConfirmationWarning';
import ModalActions from 'components/ModalActions';

const ModalPurchase = ({ isOpen=false, onClose, isBid, nft, t }) => {
    const dispatch = useDispatch();
    const currentUserState = useSelector(selectors.currentUserState);
    const currentUser = currentUserState.data || {};
    const nftPurchaseState = useSelector(selectors.nftPurchaseState);
    const isPurchasing = nftPurchaseState.loading;
    const { configuration } = useContext(DappifyContext);
    const [qty, setQty] = useState(1);
    const network = constants.NETWORKS[configuration.chainId];

    const getToken = () => `${nft?.metadata?.name} #${nft.tokenId}`;

    const handleAction = async() => {
        await dispatch(purchaseNft(currentUser, nft, nft.price, qty));
    }

    const getOperationTitle = () => isBid ?  (<Typography variant="h5">Your bid</Typography>) : null;

    return (

        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
        <DialogTitle>
            <Typography variant="title">Confirm your purchase</Typography>
        </DialogTitle>
        <DialogContent className="content__modal">
            <DialogContentText>
                {t('Purchase confirmation',{
                    name:getToken(),
                    price:nft.price,
                    unit:network.nativeCurrency.symbol
                })}
            </DialogContentText>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                    <TextField label={t('Numer of copies', { max: nft.quantity })} defaultValue={qty} fullWidth onChange={(e) => {
                        let newVal = parseInt(e.target.value);
                        if (newVal < 1) newVal = 1;
                        if (newVal > nft.quantity) newVal = nft.quantity;
                        setQty(newVal);
                    }}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField disabled label={t('Total amount', { currency: network.nativeCurrency.symbol })} value={`${nft.price * (qty || 1)} ${network.nativeCurrency.symbol}` } fullWidth/>
                </Grid>
            </Grid>
            {getOperationTitle()}
                <Grid container spacing={2}>
                    <Verification nft={nft} t={t} />
                    {isPurchasing && (<ConfirmationWarning t={t} />)}
                    <OperationResult state={nftPurchaseState} t={t} />
                </Grid>
                <ModalActions  state={nftPurchaseState} 
                                onClose={onClose} 
                                handleAction={handleAction} 
                                t={t} 
                                confirmLabel="Purchase" 
                                loading={isPurchasing} 
                />
        </DialogContent>
    </Dialog>
    );
  };
  
  export default ModalPurchase;
