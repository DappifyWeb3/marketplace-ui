import { useEffect } from 'react';
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import * as actions from 'store/actions';
import { withdrawNft } from "store/actions/thunks";
import OperationResult from 'components/OperationResult';
import ConfirmationWarning from 'components/ConfirmationWarning';
import ModalActions from 'components/ModalActions';

const ModalWithdraw = ({ isOpen=false, onClose, isBid, nft, t }) => {

    const dispatch = useDispatch();

    const withdrawState = useSelector(selectors.nftWithdrawState);
    const isWithdrawing = withdrawState.loading;

    useEffect(() => {
      dispatch(actions.editPriceNft.cancel());
    },[dispatch, isOpen])

    const handleAction = async() => {
        await dispatch(withdrawNft(nft));
    }

    return (
        <Dialog
        open={isOpen}
        onClose={onClose}
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
                          onClose={onClose} 
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
