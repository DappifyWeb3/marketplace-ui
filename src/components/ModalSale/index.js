import { useState, useEffect, useContext } from 'react';
import { OutlinedInput, MenuItem, Grid, Dialog, DialogContent, Select, DialogTitle, DialogContentText, Typography, Input, FormControl, InputLabel, InputAdornment } from '@mui/material';
import { DappifyContext } from 'react-dappify';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from 'store/selectors';
import { sellNft } from "store/actions/thunks";
import ConfirmationWarning from 'components/ConfirmationWarning';
import OperationResult from 'components/OperationResult';
import * as actions from 'store/actions';
import ModalActions from 'components/ModalActions';
import constants from 'react-dappify/constants';
import Property from 'react-dappify/model/Property';
import isEmpty from 'lodash/isEmpty';

const ModalSale = ({ isOpen=false, onClose, isBid, nft, t }) => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState();
    const nftSellState = useSelector(selectors.nftSellState);
    const isSelling = nftSellState.loading;
    const { configuration } = useContext(DappifyContext);
    const network = constants.NETWORKS[configuration.chainId];
    const priceOver = configuration?.feature?.bids?.priceOver;
    const maxBid = nft?.maxBid || 0;
    const [categories] = useState(Property.findAllWithType({type:'category'}));

    const [amount, setAmount] = useState();

    const getToken = () => `${nft?.metadata?.name} #${nft.tokenId}`;

    useEffect(() => {
        const initialAmount = isBid ? (maxBid + priceOver) : nft.price;
        setAmount(initialAmount);
    // eslint-disable-next-line no-use-before-define
    }, [isBid, maxBid, nft, priceOver]);

    useEffect(() => {
        dispatch(actions.sellNft.cancel());
    },[dispatch, isOpen])

    const handleAction = async() => {
        await dispatch(sellNft(nft, amount, selectedCategory));
    }

    const handleAmountChange = (e) => setAmount(parseFloat(e.target.value));

    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

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
                    {!isEmpty(categories) && (<Grid item xs={12} sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">Select a category</InputLabel>
                            <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={selectedCategory}
                            onChange={handleSelectCategory}
                            input={<OutlinedInput label={t('Select a category')} />}
                            >
                            {categories.map((category) => (
                                <MenuItem
                                key={category.key}
                                value={category.key}
                                >
                                {category.key}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid> )}
                    {isSelling && (<ConfirmationWarning t={t} />)}
                    <OperationResult state={nftSellState} t={t} />
                </Grid>
            </DialogContentText>
                 <ModalActions  state={nftSellState} 
                                onClose={onClose} 
                                handleAction={handleAction} 
                                t={t} 
                                confirmLabel="Confirm" 
                                loading={isSelling} 
                 />
        </DialogContent>
    </Dialog>
    );
  };
  
  export default ModalSale;
