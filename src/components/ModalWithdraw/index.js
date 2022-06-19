import { useEffect, useContext } from 'react';
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import * as actions from 'store/actions';
import { withdrawNft, modalReset } from "store/actions/thunks";
import OperationResult from 'components/OperationResult';
import ConfirmationWarning from 'components/ConfirmationWarning';
import ModalActions from 'components/ModalActions';
import { fetchNftDetail, fetchHotAuctions, fetchNftsBreakdown } from 'store/actions/thunks/nfts';
import { fetchCurrentUser } from 'store/actions/thunks/users';
import { DappifyContext } from 'react-dappify';

const ModalWithdraw = ({ isOpen=false, onClose, isBid, nft, t }) => {

    const dispatch = useDispatch();
    const { loadBalances } = useContext(DappifyContext);
    const withdrawState = useSelector(selectors.nftWithdrawState);
    const isWithdrawing = withdrawState.loading;

    useEffect(() => {
      dispatch(actions.editPriceNft.cancel());
      return async () => {
        await dispatch(modalReset());
      };
    },[dispatch, isOpen])

    const handleAction = async() => {
        await dispatch(withdrawNft(nft));
    }

    const handleClose = async() => {
      dispatch(fetchNftDetail(nft.collection.address, nft.tokenId));
      dispatch(fetchHotAuctions());
      dispatch(fetchNftsBreakdown());
      dispatch(fetchCurrentUser());
      loadBalances();
      onClose();
    }

    return (
        <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('Withdraw from marketplace')}
        </DialogTitle>
        <DialogContent className="content__modal">
          <DialogContentText id="alert-dialog-description">
            {t('Withdraw confirmation')}
            <Grid container spacing={2} sx={{ pt: 2 }}>
              {isWithdrawing && (<ConfirmationWarning t={t} />)}
              <OperationResult state={withdrawState} t={t} />
            </Grid>
          </DialogContentText>
          <ModalActions   state={withdrawState} 
                          onClose={handleClose} 
                          handleAction={handleAction} 
                          t={t} 
                          confirmLabel="Confirm" 
                          loading={isWithdrawing} 
          />
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ModalWithdraw;
