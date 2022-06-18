import { useState, useEffect, useContext } from 'react';
import { Grid, Dialog, DialogContent, DialogTitle, DialogContentText, Input, FormControl, InputAdornment } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import { editPriceNft } from "store/actions/thunks";
import OperationResult from 'components/OperationResult';
import ConfirmationWarning from 'components/ConfirmationWarning';
import ModalActions from 'components/ModalActions';
import { constants } from 'react-dappify';
import { modalReset } from 'store/actions/thunks';

const ModalEdit = ({ isOpen=false, onClose, isBid, nft, t }) => {
    const dispatch = useDispatch();
    const nftEditState = useSelector(selectors.nftEditState);
    const isEditing = nftEditState.loading;
    const { configuration } = useContext(DappifyContext);
    const network = constants.NETWORKS[configuration.chainId];
    const priceOver = configuration?.feature?.bids?.priceOver;
    const maxBid = nft?.maxBid || 0;
    const [amount, setAmount] = useState();

    const getToken = () => `${nft?.metadata?.name} #${nft.tokenId}`;

    useEffect(() => {
        return async () => {
            await dispatch(modalReset());
        };
    },[dispatch, isOpen])

    useEffect(() => {
        const initialAmount = isBid ? (maxBid + priceOver) : nft.price;
        setAmount(initialAmount);
    // eslint-disable-next-line no-use-before-define
    }, [isBid, maxBid, nft, priceOver]);


    const handleAction = async() => {
        await dispatch(editPriceNft(nft, amount));
    }

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
                    <ModalActions   state={nftEditState} 
                                    onClose={onClose} 
                                    handleAction={handleAction} 
                                    t={t} 
                                    confirmLabel="Confirm" 
                                    loading={isEditing} 
                    />
                </FormControl>
            </DialogContent>
        </Dialog>
    );
  };
  
  export default ModalEdit;
