import { useContext } from 'react';
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, Typography } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import { purchaseNft } from "store/actions/thunks";
import Verification from 'components/Verification';

import OperationResult from 'components/OperationResult';
import ConfirmationWarning from 'components/ConfirmationWarning';
import ModalActions from 'components/ModalActions';
import constants from 'react-dappify/constants';

const ModalPurchase = ({ isOpen=false, onClose, isBid, nft, t }) => {
    const dispatch = useDispatch();
    const currentUserState = useSelector(selectors.currentUserState);
    const currentUser = currentUserState.data || {};
    const nftPurchaseState = useSelector(selectors.nftPurchaseState);
    const isPurchasing = nftPurchaseState.loading;
    const { configuration } = useContext(DappifyContext);
    const network = constants.NETWORKS[configuration.chainId];

    const getToken = () => `${nft?.metadata?.name} #${nft.tokenId}`;

    const handleAction = async() => {
        await dispatch(purchaseNft(currentUser, nft, nft.price));
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
