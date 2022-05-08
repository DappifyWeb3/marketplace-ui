import { useEffect } from 'react';
import { CircularProgress, Grid, Dialog, DialogContent, Button, DialogTitle, DialogContentText } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import * as actions from 'store/actions';
import { withdrawNft } from "store/actions/thunks";
import OperationResult from 'components/OperationResult';
import ConfirmationWarning from 'components/ConfirmationWarning';

const ModalWithdraw = ({ isOpen=false, onClose, isBid, nft, t }) => {

    const dispatch = useDispatch();

    const withdrawState = useSelector(selectors.nftWithdrawState);
    const isWithdrawing = withdrawState.loading;

    useEffect(() => {
      dispatch(actions.editPriceNft.cancel());
    },[isOpen])

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
          <Grid container spacing={1} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Button variant="outlined" color="error" onClick={onClose} fullWidth>{t('Cancel')}</Button>
            </Grid>
            <Grid item xs={6}>
              {!isWithdrawing && (
                <Button variant="contained" color="error" onClick={handleAction} fullWidth>
                    {t('Confirm')}
                </Button>
              )}
              {isWithdrawing && (
                  <Button disabled variant="contained" color="error" onClick={handleAction} fullWidth>
                    {t('Please wait')} <CircularProgress size={24} sx={{ ml: 2 }} color="inherit" />
                  </Button> 
              )}
            </Grid>
        </Grid>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ModalWithdraw;
