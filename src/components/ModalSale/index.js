import { useState, useEffect, useContext } from 'react';
import { OutlinedInput, Alert, CircularProgress, MenuItem, Grid, Dialog, DialogContent, Select, Button, DialogTitle, DialogContentText, Typography, Input, FormHelperText, FormControl, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import { bidNft, purchaseNft, sellNft, cleanup } from "store/actions/thunks";
import Categories from 'components/Categories';
import ConfirmationWarning from 'components/ConfirmationWarning';
import OperationResult from 'components/OperationResult';
import * as actions from 'store/actions';

const ModalSale = ({ isOpen=false, onClose, isBid, nft, t }) => {

    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState();
    
    const currentUserState = useSelector(selectors.currentUserState);
    const currentUser = currentUserState.data || {};


    const nftSellState = useSelector(selectors.nftSellState);
    const isSelling = nftSellState.loading;

    // const confirmationHash = nftSellState.data?
    const {configuration, project } = useContext(DappifyContext);
    const network = project?.getNetworkContext('marketplace');
    const priceOver = configuration?.feature?.bids?.priceOver;
    const maxBid = nft?.maxBid || 0;

    const [amount, setAmount] = useState();


    const getToken = () => `${nft?.metadata?.name} #${nft.tokenId}`;

    useEffect(() => {
        const initialAmount = isBid ? (maxBid + priceOver) : nft.price;
        setAmount(initialAmount);
    // eslint-disable-next-line no-use-before-define
    }, [isBid, nft]);

    useEffect(() => {
        dispatch(actions.sellNft.cancel());
    },[isOpen])

    const handleAction = async() => {
        await dispatch(sellNft(nft, amount, selectedCategory));
    }

    const handleAmountChange = (e) => setAmount(parseFloat(e.target.value));

    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const canConfirm = amount === 0 || !selectedCategory;

    return (

        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
        <DialogTitle>
            Add to marketplace
        </DialogTitle>
        <DialogContent className="content__modal">
            <DialogContentText>
                <Grid container direction="column" spacing={1}>
                    <Grid item xs={12}>
                        Please list my item <Typography variant="body" fontWeight={900}>{getToken()}</Typography> in the marketplace<br/>for a sale price of:
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" justifyContent="center" fullWidth sx={{ mt: 3 }}>
                            <Input
                            id="standard-adornment-weight"
                            value={amount}
                            onChange={handleAmountChange}
                            endAdornment={<InputAdornment position="end">
                                <Typography sx={{ opacity: 0.75 }}>
                                    {network.nativeCurrency.symbol}
                                </Typography>
                            </InputAdornment>}
                            aria-describedby="standard-amount-helper-text"
                            type="number"
                            sx={{
                                '& input[type=number]': {
                                    '-moz-appearance': 'textfield'
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                }
                            }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Select a category</InputLabel>
                            <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={selectedCategory}
                            onChange={handleSelectCategory}
                            input={<OutlinedInput label={t('Select a category')} />}
                            >
                            {configuration.categories.map((category) => (
                                <MenuItem
                                key={category.uri}
                                value={category}
                                >
                                {category.label}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {isSelling && (<ConfirmationWarning t={t} />)}
                    <OperationResult state={nftSellState} t={t} />
                </Grid>
            </DialogContentText>
                <Grid container spacing={1} sx={{ mt: 3 }}>
                    <Grid item xs={6}>
                        <Button variant="outlined" onClick={onClose} fullWidth>{t('Cancel')}</Button>
                    </Grid>
                    <Grid item xs={6}>
                        {!isSelling && (
                            <Button disabled={canConfirm} variant="contained" color="primary" onClick={handleAction} fullWidth>
                                {t('Confirm')}
                            </Button>
                        )}
                        {isSelling && (
                            <Button true disabled variant="contained" color="primary" onClick={handleAction} fullWidth>
                                {t('Please wait')} <CircularProgress size={24} sx={{ ml: 2 }} color="inherit" />
                            </Button> 
                        )}
                    </Grid>
                </Grid>
        </DialogContent>
    </Dialog>
    );
  };
  
  export default ModalSale;
